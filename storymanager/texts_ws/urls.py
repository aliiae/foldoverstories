from django.conf.urls import url

from rooms.api import RoomsViewSet

urlpatterns = [
    url(r'ws/room/(?P<room_title>.+)', RoomsViewSet.as_view({'get': 'list'}), name='room_list'),
    url(r'ws/room/(?P<room_title>.+)', RoomsViewSet.as_view({'get': 'retrieve'}),
        name='room_detail')
]
