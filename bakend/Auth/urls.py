
from django.contrib import admin
from django.urls import path
from .api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login', login),
    path('auth/signup', signup),
    path('auth/check_token', check_token)
]
