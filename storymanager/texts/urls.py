from rest_framework import routers

from .api import TextsViewSet

router = routers.DefaultRouter()
router.register('api/texts', TextsViewSet, 'texts')
urlpatterns = router.urls
