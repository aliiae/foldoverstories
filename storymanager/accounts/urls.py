from django.urls import path, include
from knox import views as knox_views

from .api import RegisterAPI, LoginAPI, UserAPI

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view(), name='register'),
    path('api/auth/login', LoginAPI.as_view(), name='knox_login'),
    path('api/auth/user', UserAPI.as_view(), name='user'),
    path('api/auth/logout', knox_views.LogoutView.as_view(),
         name='knox_logout'),
]
