
from django.contrib import admin
from django.urls import path
from .api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login', login),
    path('auth/signup', signup),
    path('auth/check_token', check_token),
    path('auth/get_user_data', get_user_data),
    path('auth/edit_user/<str:username>/', edit_user),
    path('auth/delete_user/<str:username>/', delete_user),
]
