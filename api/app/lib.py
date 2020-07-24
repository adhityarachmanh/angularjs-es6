import datetime
import arh
import string
import json
import netifaces as nif
from datetime import datetime
from pytz import timezone
from app.settings import TIME_ZONE,ROOT_API,VERSION,PRODUCTION,CREATOR,PRODUCT,PRODUCT_ID,SECRET
from hashlib import sha1
from django.urls import path
from random import randint, choice

def date_now():
    return datetime.now(timezone(TIME_ZONE))


def pathAPI(route_name,view):
    sl = "/"
    bs = VERSION + sl + ROOT_API
    path_cos = bs  + sl + route_name
    if not PRODUCTION:
        p = path_cos + sl
        return path(p,view)
    p = arh.BNE(6, arh.genKey(1)).Enc(path_cos) + sl
    return path(p,view)


class Crypto():
    def encrypt(noEnc, public, private):
        try:
            list_dict = list(noEnc.items())
            enc = json.dumps(noEnc)
        except:
            enc = noEnc
        return arh.BNE(public, arh.genKey(private)).Enc(enc)

    def decrypt(enc,public,private):
        result = arh.BNE(public, arh.genKey(private)).Dec(enc)
        try:
            list_dict = list(json.loads(result).items())
            dec = json.loads(result)
        except :
            dec = result
        return dec

class Network():
    def mac_address(ip):
        'Returns a list of MACs for interfaces that have given IP, returns None if not found'
        for i in nif.interfaces():
            addrs = nif.ifaddresses(i)
            try:
                if_mac = addrs[nif.AF_LINK][0]['addr']
                if_ip = addrs[nif.AF_INET][0]['addr']
            except: #ignore ifaces that dont have MAC or IP
                if_mac = if_ip = ""
            if if_ip == ip:
                return if_mac
        return "00:00:00:00:00:00"

    def ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class Data():
    def phone628(phone):
        if(phone[0:2] == '08'):
            phone = '628'+phone[2:]
            return phone
        return phone

    def make(data, type):
        try:
            newData = []
            for d in data:
                d['_id'] = str(d['_id'])
                newData.append(d)
            if type == 'object':
                return newData[0]
            else:
                return newData
        except:
            return None


class Password():
    def hash(PASSWORD):
        # hash pwd dengan combinasi var yang ada di config

        key_hash = CREATOR+SECRET + \
            PASSWORD+PRODUCT_ID+PRODUCT
        return sha1(bytes(key_hash, 'utf7')).hexdigest()

    def verify(HASH, NO_HASH):
        return Password.hash(NO_HASH) == HASH

class Token():
    def create(data):
        token = arh.BNE(6, arh.genKey(2)).Enc(make_response(data))
        return token

    def read(data):
        return json.loads(arh.BNE(6, arh.genKey(2)).Dec(data))


class Generate():
    def params(x):
        # ANGGOTA  atau ANGGOTA LUAR BIASA
        regn = str(x)
        test = arh.BNE(5, arh.genKey(7))
        # hitung length type
        tracknumber = test.Enc(regn)
        return tracknumber

    def confirmationCode(size):
        num = list(string.digits)
        str_list = []
        base_char = num
        for i in range(size):
            char = choice(base_char)
            str_list.append(char)

        rand_str = ''

        for item in str_list:
            rand_str += str(item)

        return rand_str

    def randString(size):
        num = list(string.digits)
        alpha_low = list(string.ascii_lowercase)
        alpha_up = list(string.ascii_uppercase)
        symbol = list("!#")
        str_list = []
        base_char = alpha_up + num + alpha_low+symbol
        for i in range(size):
            char = choice(base_char)
            str_list.append(char)

        rand_str = ''

        for item in str_list:
            rand_str += str(item)

        return rand_str

    def captcha(size):
        num = list(string.digits)
        alpha_low = list(string.ascii_lowercase)
        alpha_up = list(string.ascii_uppercase)
        str_list = []
        base_char = alpha_up + num + alpha_low
        for i in range(size):
            char = choice(base_char)
            str_list.append(char)

        rand_str = ''

        for item in str_list:
            rand_str += str(item)

        return rand_str

def stringToArray(string,sperator):
    return  [x.strip(' ') for x in string.split(sperator)] 
    
def arrayToString(arr,sperator):
    string=""
    if len(arr)>0:
        for s in arr:
            string+=s
            if arr.index(s) != len(arr)-1: 
                string+=sperator
    return string

def getDefaultID():
    productID = str(date_now())
    return Crypto.encrypt(productID, 5, 7)

