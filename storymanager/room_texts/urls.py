from rest_framework import routers

from .api import RoomTextsViewSet

router = routers.DefaultRouter()
router.register('api/room_texts', RoomTextsViewSet, 'room_texts')
urlpatterns = router.urls
