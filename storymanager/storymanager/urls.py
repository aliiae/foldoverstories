from django.urls import path, include, re_path

from frontend.views import index

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('texts_ws.urls')),
    path('', include('texts.urls')),
    path('', include('rooms.urls')),
    path('', include('accounts.urls')),
    re_path(r'.*', index),
]
