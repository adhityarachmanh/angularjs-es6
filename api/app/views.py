
from django.shortcuts import render
from .settings import PRODUCT


def creator_view(request):
    return render(request, 'creator.html', context={"zproduct": PRODUCT, "zcreator": "ARH"}, status=200)


def error404(request):
    return render(request, '404.html', context={"zproduct": PRODUCT, "zcreator": "ARH"}, status=200)
