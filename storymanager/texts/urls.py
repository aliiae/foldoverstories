from rest_framework import routers

from .api import TextsViewSet

router = routers.DefaultRouter()
router.register(r'api/texts/(?P<room_title>.+)', TextsViewSet, 'texts')
urlpatterns = router.urls
