from rest_framework import routers

from .api import RoomsViewSet

router = routers.DefaultRouter()
router.register('api/rooms', RoomsViewSet, 'rooms')
urlpatterns = router.urls
