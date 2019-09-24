from django.urls import path, include
from knox import views as knox_views

from .api import RegisterAPI, LoginAPI, UserAPI

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LoginView.as_view(), name='knox_logout')
]
