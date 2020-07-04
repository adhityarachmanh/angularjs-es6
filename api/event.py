
import asyncio
import json
import logging
import logging.config
import websockets


logging.config.fileConfig('loggingsocket.conf')
logger = logging.getLogger('ws')

STATE={"user_online": 0,"session":{}}

async def notify(wss,message):
    if wss:
        msg = json.dumps(message)
        await asyncio.wait([ws.send(message) for ws in wss])

# user online tambah  SESSION USER
async def online(ws,sid):
    logger.info(f"user {sid} online")
    STATE["session"][sid]=ws
    STATE["user_online"] += 1
    logging.info("STATE: %s, " % (STATE))


# user offline hapus  SESSION USER
async def offline(ws,sid):
    logger.info(f"user {sid} offline")
    STATE["session"].pop(sid,None)
    STATE["user_online"] -= 1
    logging.info("STATE: %s, " % (STATE))

async def call_request(sid,data):
    try:
        logger.info(f"state {STATE} ")
        session_user = STATE['session']
        receiver_sid = data['receiver']
        if receiver_sid in session_user:
            logger.info(f"user {receiver_sid} online")
            ws = session_user[receiver_sid]
            logger.info(f"ws {ws}")
            message = {**data,'status':0}
            await notify([ws],message)
        else:
            logger.info(f"user {receiver_sid} ga online")
            ws = session_user[sid]
            logger.info(f"ws {ws} ,session:{STATE['session']}")
            message = {**data,'status':1}
            await notify([ws],message)
    except Exception as why:
        logger.error(why)

async def call(sid,data):
    logger.info("sender and receiver call")
   

async def endcall(sid,data):
    logger.info("user endcall")

# user eventcd
async def do_event(data,ws,sid):
    try:
        event = data['event']
        if event == "online":
            await online(ws,sid)
        elif event == "call-request":
            await call_request(sid,data)
        elif event == "call":
            await call(sid,data)
        elif event == "end-call":
            await endcall(sid,data) 
    except Exception as why:
        logger.info(why)   