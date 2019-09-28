from datetime import datetime

from rest_framework import viewsets, permissions
from rest_framework.generics import get_object_or_404

from rooms.models import Room
from texts.models import Text
from .serializers import TextsSerializer


class TextsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TextsSerializer

    def get_queryset(self):
        room_title = self.kwargs['room_title']
        return Text.objects.filter(room__room_title=room_title)

    def perform_create(self, serializer: TextsSerializer):
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        room.users.add(self.request.user)
        serializer.save(author=self.request.user, room=room)
