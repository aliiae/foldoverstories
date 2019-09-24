from rest_framework import viewsets, permissions
from rooms.models import Rooms

from .serializers import RoomsSerializer


class RoomsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoomsSerializer
    lookup_field = 'room_title'
    queryset = Rooms.objects.all()

    # def get_queryset(self):
    #     return self.request.user.rooms.all()

    def perform_create(self, serializer):
        room = serializer.save()
        room.users.add(self.request.user)
