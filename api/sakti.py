import string
import io
import json
import random
import os
from dotenv import load_dotenv
load_dotenv()



CREATOR = os.getenv("CREATOR")
PRODUCT_ID = os.getenv("PRODUCT_ID")
PRODUCT = os.getenv("PRODUCT")
# file_name = "conn_server" # ganti untuk menentukan file

dicE =   {32: 72, 33: 60, 34: 124, 35: 86, 36: 87, 37: 76, 38: 116, 39: 52, 40: 101, 41: 84, 42: 56, 43: 44, 44: 73, 45: 40, 46: 112, 47: 65, 48: 68, 49: 79, 50: 88, 51: 74, 52: 32, 53: 67, 54: 104, 55: 55, 56: 85, 57: 35, 58: 62, 59: 51, 60: 43, 61: 96, 62: 47, 63: 92, 64: 33, 65: 99, 66: 80, 67: 102, 68: 34, 69: 94, 70: 54, 71: 75, 72: 90, 73: 69, 74: 71, 75: 122, 76: 48, 77: 111, 78: 58, 79: 81, 80: 126, 81: 38, 82: 117, 83: 83, 84: 108, 85: 95, 86: 63, 87: 100, 88: 61, 89: 59, 90: 82, 91: 66, 92: 113, 93: 50, 94: 57, 95: 70, 96: 42, 97: 77, 98: 107, 99: 39, 100: 106, 101: 97, 102: 53, 103: 119, 104: 45, 105: 118, 106: 103, 107: 120, 108: 105, 109: 115, 110: 49, 111: 36, 112: 109, 113: 64, 114: 37, 115: 110, 116: 89, 117: 41, 118: 78, 119: 93, 120: 98, 121: 125, 122: 46, 123: 114, 124: 121, 125: 91, 126: 123}
dicAE =  [9, 88, 20, 63, 35, 53, 21, 107, 55, 53, 91, 68, 36, 73, 30, 30, 12, 12, 14, 9, 118, 2, 12, 95, 60, 87, 71, 82, 116, 50, 78, 63, 73, 14, 49, 8, 125, 22, 117, 29, 25, 19, 6, 30, 88, 6, 78, 40, 31, 121, 39, 50, 15, 55, 82, 5, 83, 100, 26, 1, 39, 113, 111, 7, 78, 37, 2, 83, 19, 0, 106, 37, 76, 21, 15, 21, 8, 29, 110, 108, 46, 22, 102, 56, 24, 77, 38, 52, 22, 4, 79, 45, 43, 58, 24]

def _encKey(arr):
    s = CREATOR + PRODUCT_ID + PRODUCT
    lenS = len(s)
    k = []
    l = len(arr)
    for i in range(l):
        k.append(ord(s[i % lenS]) ^ arr[i])
    return k

def _getDicE(arr):
    t = {}
    l = len(arr)
    for i in range(l):
        t[i+32]=arr[i]
    return t

def _getDicD(arr):
    s = CREATOR + PRODUCT_ID + PRODUCT
    lenS = len(s)
    k = 0
    key = {}
    l = len(arr)
    for i in range(l):
        k = ord(s[i % lenS]) ^ arr[i]
        key[k]=i+32
    return key

def _enc(s, key):
    return s.translate(key)

def _dec(s, arrKey):
    key = _getDicD(arrKey)
    return s.translate(key)

def _saveSaktiStr(SaktiStr):
    global file_name
    with open(file_name, "w") as f:
        f.write(SaktiStr)

def _loadSaktiStr(SaktiFile):
    encSaktiStr = ""
    try:
        with open(SaktiFile, "r") as f:
            encSaktiStr = f.read()
    except Exception as e:
        print("Engga bisa dibuka filenya" + SaktiFile + "file")
    return encSaktiStr

def _genNewKey():
    m1 = ""
    for i in range(32,127): # generate random array antara 32 sampe 127
        m1 += chr(i)
    #print(m1)

    t = m1
    m2 = ""
    l = len(m1)
    for i in range(l):
        c = random.choice(t)
        m2 += c
        t = t.replace(c,"")
    print("Kunci baru anda: " + m2)
    d1 = {}
    d2 = {}
    o1 = 0
    o2 = 0
    a = []
    for i in range(l):
        o1 = ord(m1[i])
        o2 = ord(m2[i])
        a.append(o2)
        d1[o1] = o2
        d2[o2] = o1
    a = _encKey(a)
    print("Encrypt baru untuk object: ", d1)
    #print(d2)
    print("Decrypt baru untuk array:  ", a)
    return (d1, a)

from datetime import datetime
from prettytable import PrettyTable
from arh import r_txt



print("="*30+"SAKTI"+"="*30)
print("1 untuk config ( SECRET , DLL ) | 2 untuk koneksi")
input_user = input("Atur file ( 1 / 2 ):") 


if int(input_user) == 1:
    file_name = "config_arh"
elif int(input_user)==2:
    print("L untuk local | S untuk server")
    input_user = input("Atur file ( L / S ):")
    if input_user in ["L","l"]:
        file_name = "conn_local"
    elif input_user in ["S","s"]:
        file_name = "conn_server"
d = _loadSaktiStr(file_name)

try:
    if d != "":
        print("Hasil decrypsi sekarang adalah : ")
        t = PrettyTable(list(json.loads(_dec(d, dicAE)).keys()))
        t.add_row(list(json.loads(_dec(d, dicAE)).values()))
        print(t)
        print(_dec(d, dicAE))
    isNewKey = s = input("Ingin generate encrypsi baru ? (y/n): ")
    # os.system("clear")
    if isNewKey in ["y","Y"]:
        (dicE, dicAE) = _genNewKey()
    s = input("Ketik apa yang mau di encrypt bro: ")
    os.system("clear")
    e = _enc(s, dicE)
    _saveSaktiStr(e)
    d = _dec(_loadSaktiStr(file_name), dicAE)
    print(e)
    # print(d)
    print(datetime.now())
except Exception:
    os.remove(file_name)
