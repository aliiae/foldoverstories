from rest_framework import routers

from .api import RoomsViewSet

router = routers.DefaultRouter()
router.register('story', RoomsViewSet, 'room')
urlpatterns = router.urls
