import json
import os
import string
from random import choice,randint
from dotenv import load_dotenv
import base64
import hashlib
load_dotenv()

C = os.getenv("CREATOR")
P_I = os.getenv("PRODUCT_ID")
P = os.getenv("PRODUCT")

def getEncConf(key, connFile="config_arh"):
    return r_txt(connFile)[key]

def trk(a, p):
    h = len(p)
    k = 0
    d = {}
    l = len(a)
    for i in range(l):
        k = ord(p[i % h]) ^ a[i]
        d[k] = i + 32
    return d


def r_txt(connFile):
    arr = [9, 88, 20, 63, 35, 53, 21, 107, 55, 53, 91, 68, 36, 73, 30, 30, 12, 12, 14, 9, 118, 2, 12, 95, 60, 87, 71, 82, 116, 50, 78, 63, 73, 14, 49, 8, 125, 22, 117, 29, 25, 19, 6, 30, 88, 6, 78, 40, 31, 121, 39, 50, 15, 55, 82, 5, 83, 100, 26, 1, 39, 113, 111, 7, 78, 37, 2, 83, 19, 0, 106, 37, 76, 21, 15, 21, 8, 29, 110, 108, 46, 22, 102, 56, 24, 77, 38, 52, 22, 4, 79, 45, 43, 58, 24]
    with open(connFile, "r") as f:
        s = f.read()
        _cStr = s.translate(
            trk(arr, C + P_I + P))
        return json.loads(_cStr)


def genKey(t=-1, a=None):
    # t=type

    k = ""  # k=key
    s = ""  # suffix
    if a == None:
        p = 2  # step on array
        q = 1  # step for producing key
        a = [65, 91, 97, 123, 48, 58]  # array range
        if t == 0:  # standard base 64
            s = "+/="
        elif t == 1:  # non standard uri safe base 64
            s = "-_."  # standard uri safe using "+-$"
        elif t == 2:  # non standard base 64
            a = [97, 123, 63, 91, 48, 59]
        # ()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~!#$%&
        elif t == 5:
            s = "!#$%&"
            a = [40, 92, 93, 127]
        elif t == 6:  # 0123456789abcdefghijklmnopqrstuvwxyz-_.
            s = "-_."
            a = [48, 58, 97, 123]
        elif t == 7:  # 23456789ABCDEFGHJKLMNPQRSTUVWXYZ
            a = [50, 58, 65, 73, 74, 79, 80, 91]
        elif t == 8:  # 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ, can be use to encode table name to number
            a = [48, 58, 65, 91]
        elif t == 9:  # Random 64 key
            c = genKey(10)
            # s = "" #s here actually temp
            for i in range(64):
                s = choice(c)
                c = c.replace(s, "")
                k += s
            return k
        elif t == 10:  # string for use in t=9
            a = [32, 127]
        else:  # own base 2 to base 128
            k = "!"
            a = [35, 39, 40, 47, 48, 92, 93, 96, 97, 127, 192, 231]
    else:
        p = 3  # step on array
    l = len(a)
    for i in range(0, l, p):
        x = a[i]
        y = a[i+1]
        if p == 3:
            q = a[i+2]
        for j in range(x, y, q):
            k += chr(j)
    return k + s


class BNE:
    #bL = baseN_Bit_Length,
    def __init__(self,  bL=7,  k=""):
        if k == "":
            self._k = genKey()  # default key
        else:
            self._k = k
        self._bL = bL

    def Enc(self,  s):
        # s=source

        d = 0  # d=binData
        l = 0  # l=data bit length
        m = 8  # max bit length in an acii
        b = (2**self._bL) - 1  # baseNBit
        r = ""  # enc result
        j = len(s)  # source length
        i = 0
        while i < j:
            d = (d << m) + ord(s[i])
            i += 1
            l += m
            while l >= self._bL:
                l -= self._bL
                r += self._k[(d >> l) & b]
                d &= (2**l)-1
        if l > 0:
            r += self._k[(d << (self._bL - l)) & b]
        return r

    def Dec(self,  s):
        d = 0
        l = 0
        m = 8
        r = ""
        j = len(s)
        i = 0
        while i < j:
            d = ((d & 255) << self._bL) + self._k.index(s[i])
            i += 1
            l += self._bL
            if l >= m:
                l -= m
                r += chr((d >> l) & 255)
        return r


class BN:
    def __init__(self,  k=""):
        if k == "":
            self._k = genKey(5)
        else:
            self._k = k
        self._b = len(self._k)  # _b=baseN

    def ToBaseN(self,  n):
        # n=base10Number

        if n <= 0:
            return self._k[0]
        r = ""
        while n >= self._b:
            m = n % self._b
            n //= self._b
            r = self._k[m] + r
        if n > 0:
            r = self._k[n] + r
        return r

    def ToBase10(self,  s):

        n = 0
        l = len(s)
        for i in range(l):
            d = self._k.index(s[i])
            n += (self._b ** (l - i - 1)) * d
        return n




def arh(s,  p="",  q=""):
    # s=source

    z = 0  # z=zero
    m = 11  # multiplier
    a = 17  # adder
    l = len(s)  # l=source length
    i = len(p)
    j = len(q)  # length2=len(q) #use j to simplify code
    w = [i, m, a, j]  # pwd array
    x = z
    if i > j:
        h = i
    else:
        h = j
    for x in range(0, h):
        if i > x:
            w.append(ord(p[x]))
        if j > x:
            w.append(ord(q[x]))
    # print(w)
    h = len(w)-1  # h=pwd length
    #print("x: ", x, "w: ", len(w), h)
    j = 255  # byteMaxValue
    i = z
    r = ""  # r=result
    x += 1  # pwdIndex
    # print(x)
    for i in range(0, l):
        if x >= h:
            x = 0
        else:
            x += 1
        t = (m * w[x] + a) % j
        w[x] = t
        r += chr(ord(s[i]) ^ t)
    return r


def hashSId(s,  p,  q):  # calculating hash

    k = genKey(5)
    b = 5
    x = 0
    y = 0
    l = len(p)
    h = len(q)
    # print(sHash)
    j = len(s)
    for i in range(j):
        o = ord(s[i])
        x ^= o ^ ord(p[i % l])
        y ^= o ^ ord(q[i % h])
    n = (2**b) - 1
    #print(x, y, x & n, y & n, (x >> b) | ((y >> b) << (8-b)))
    return k[x & n] + k[y & n] + k[(x >> b) | ((y >> b) << (8-b))]


def sessionId():
    from uuid import uuid4
    u = uuid4().bytes
    s = ""
    for i in u:
        s += chr(i)
    return BNE().Enc(s)  # BNE(6, genKey(2)).Enc(s)


def isValidSId(s,  p,  q):
    x = -3
    if hashSId(s[:x], p, q) == s[x:]:
        return True
    else:
        return False


def ViValidSId(s,  p,  q):
    x = -3
    tok = hashSId(s[:x], p, q)
    return tok

# endregion SessionId
