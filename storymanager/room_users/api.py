from rest_framework import viewsets, permissions

from .models import RoomUsers
from .serializers import RoomUsersSerializer


class RoomUsersViewSet(viewsets.ModelViewSet):
    queryset = RoomUsers.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoomUsersSerializer
