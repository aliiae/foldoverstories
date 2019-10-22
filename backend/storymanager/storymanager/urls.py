from django.urls import path, include

urlpatterns = [
    path('', include('websockets.urls')),
    path('', include('texts.urls')),
    path('', include('rooms.urls')),
    path('', include('accounts.urls')),
]
