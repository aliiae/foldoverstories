from rest_framework import routers

from .api import RoomUsersViewSet

router = routers.DefaultRouter()
router.register('api/room_users', RoomUsersViewSet, 'room_users')
urlpatterns = router.urls
