#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import logging.config
import websockets
# import ssl

logging.config.fileConfig('loggingsocket.conf')
logger = logging.getLogger('ws')


STATE = {"user_online": 0, "session": {}}

# user online menambah ke socket USER
async def user_online(ws, sid):
    STATE["session"][sid] = ws
    STATE["user_online"] += 1
    logging.info("STATE: %s, " % (STATE))


async def user_offline(ws, sid):
    STATE["session"].pop(sid, None)
    STATE["user_online"] -= 1
    logging.info("STATE: %s, " % (STATE))


async def call_request(sid, data):
    try:
        ses = STATE['session']
        rsid = data['to']
        if rsid in ses:
            logger.info(f"user {sid} request {rsid}")
            await notify_users([{"ws": ses[rsid], "msg":json.dumps({**data, "from": sid, 's': 0})}])

    except Exception as why:
        logger.error(why)



async def user_call(sid, data):
    try:
        ses = STATE['session']
        rsid = data['to']
        if rsid in ses:
            logger.info(f"user {sid} menghubungi {rsid}")
            await notify_users([{"ws": ses[sid], "msg":json.dumps({**data, 's': 0})}])
        else:
            logger.info(f"user {rsid} offline")
            await notify_users([{"ws": ses[sid], "msg":json.dumps({**data, 's': 1})}])

    except Exception as why:
        logger.error(why)


async def user_endcall(sid, data):
    try:
        ses = STATE['session']
        rsid = data['to']
        if rsid in ses:
            logger.info(f"user {rsid} end call")
            notif = [
                {"ws": ses[rsid], "msg":json.dumps({**data, 's': 0})},
                {"ws": ses[sid], "msg":json.dumps({**data, 's': 1})}
            ]
            await notify_users(notif)

    except Exception as why:
        logger.error(why)


async def notify_users(wss):
    if wss:
        await asyncio.wait([ws['ws'].send(ws['msg']) for ws in wss])


async def wsProcess(ws, sid):
    sid = sid.replace("/", "")
    try:
        async for msg in ws:
            message = json.loads(msg)
            data = message['data']
            event = data['event']
            if event == "online":
                logger.info(f"user {sid} online")
                await user_online(ws, sid)
            elif event == "request":
                await call_request(sid, data)
            elif event == "call":
                await user_call(sid, data)
            elif event == "end":
                await user_endcall(sid, data)
    finally:
        logger.info(f"user {sid} offline")
        await user_offline(ws, sid)


start_server = websockets.serve(wsProcess, "localhost", 8787)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
