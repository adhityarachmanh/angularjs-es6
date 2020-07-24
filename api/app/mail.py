
from app.settings import EMAIL_HOST_USER
from django.template.loader import render_to_string
from django.core.mail import send_mail

def sendMail(EMAIL_RECEIVER,payload,template):
    subject = ''
    html_message = render_to_string(template, payload)
    tb = html_message.find('<title>')
    if tb > 0:
        tb += 7
        te = html_message.find('</title>')
        if te > 0:
            subject = html_message[tb:te]
    send_mail(
        subject,
        '',
        EMAIL_HOST_USER,
        EMAIL_RECEIVER,
        html_message=html_message,
        fail_silently=False,
    )
