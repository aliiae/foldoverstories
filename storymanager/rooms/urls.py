from django.urls import re_path
from rest_framework import routers

from .api import RoomsViewSet, RoomUsersAPI

router = routers.DefaultRouter()
router.register('api/rooms', RoomsViewSet, 'rooms')
# router.register(r'api/rooms/(?P<room_title>.+)/users', RoomUsersAPI, 'rooms')

urlpatterns = router.urls
urlpatterns += [
    re_path(r'api/rooms/(?P<room_title>.+)/users', RoomUsersAPI.as_view(), name='room_users')
]
