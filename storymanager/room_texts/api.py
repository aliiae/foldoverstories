from rest_framework import viewsets, permissions

from .models import RoomTexts
from .serializers import RoomTextsSerializer


class RoomTextsViewSet(viewsets.ModelViewSet):
    queryset = RoomTexts.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoomTextsSerializer
