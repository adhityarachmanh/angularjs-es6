import math
import random 
import time

USERS={}



def random_num():
    MIN = 1000
    MAX = 9999
    num = math.floor(random.random() * ((MAX + 1) - MIN)) + MIN
    return num

def randomID():
    uid = "HIPMI-TESTER-"+str(random_num())
    while  uid in USERS:
        uid = "HIPMI-TESTER-"+str(random_num())
        time.sleep(5)
        
        
    return uid

def create(room):
    uid = randomID()
    USERS[uid] = room
    return uid;

def get(uid):
    return USERS[uid]

def remove(uid):
    global USERS
    USERS.pop(uid,None)
    

    