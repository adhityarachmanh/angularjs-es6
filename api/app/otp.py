import logging
from twilio.rest import Client
from .settings import TWILIO_ID,TWILIO_TOKEN,TWILIO_PROVIDER_NUMBER
from .mail import sendMail
from .lib import Generate,date_now
from datetime import timedelta

client = Client(TWILIO_ID,TWILIO_TOKEN)
provider_number = TWILIO_PROVIDER_NUMBER

logger = logging.getLogger()

class OTP():
    def WhatsApp(msg, to, sender=provider_number):
        message = client.messages.create(
            body=msg,
            from_=f'whatsapp:+{sender}',
            to=f'whatsapp:+{to}'
        )
        return message

    def SMS(msg, to, sender=provider_number):
        message = client.messages.create(
            body=msg,
            from_=f'+{sender}',
            to=f'+{to}'
        )
        return message

    def Email(EMAIL_RECEIVER,payload,template):
        sendMail(EMAIL_RECEIVER, payload,template)


### CODE CONFIRMATION ###

def providerCodeConfirmation(data):
    provider,user,action,code = data['provider'],data['user'],data['action'],data['code']
    msg = f"[{action}]\nJANGAN MEMBERITAHU KODE RAHASIA INI KE SIAPAPUN termasuk pihak Fresh Fish. WASPADA TERHADAP KASUS PENIPUAN!\n\nKODE VERIFIKASI : {code}\n\nTerimakasih atas waktu Anda,\nAdmin Fresh Fish"
    if provider=='whatsapp':
        OTP.WhatsApp(msg, user['phone'])
    if provider=='sms':
        OTP.SMS(msg, user['phone'])
    elif provider=='email':
       
        OTP.Email([user['email']],{'ztype':action, 'zfullname':user['fullname'], 'zcode':code},"confirmationCode.html")

class CodeConfirmation():
    def send(action, user,provider):
        try:
            expired_time = date_now()+timedelta(minutes=2)
            code = Generate.confirmationCode(6)
            providerCodeConfirmation({'action':action,'provider':provider,'action':action,'user':user,'code':code})
            return {'code': code,'user':user, 'expired_time': str(expired_time), 'action': action,'provider':provider}
        except Exception as why:
            logger.error(why)
            return {}

    def resend(action, user, code,provider):
        providerCodeConfirmation({'action':action,'user':user,'provider':provider,'action':action,'user':user,'code':code})

    def request(action, user,provider):
        try:
            code = Generate.confirmationCode(6)
            providerCodeConfirmation({'action':action,'provider':provider,'action':action,'user':user,'code':code})
            expired_time = date_now()+timedelta(minutes=2)
            return {'code': code,'user':user, 'expired_time': str(expired_time), 'action': action,'provider':provider}
        except:
            return {}