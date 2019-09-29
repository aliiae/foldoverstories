from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
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
        room = get_object_or_404(Room, room_title=room_title)
        users = room.users.all()
        current_turn_user = users[room.current_user_index]
        # if self.request.user != current_turn_user:
        #     # raise PermissionDenied(detail='Incorrect turn')
        #     return Text.objects.filter(room__room_title=room_title, author=self.request.user)
        return Text.objects.filter(room__room_title=room_title)

    def perform_create(self, serializer: TextsSerializer):
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        users = room.users.all()
        prev_turn_user = users[room.current_user_index]
        if room.texts.count() > 0 and prev_turn_user == self.request.user:
            raise PermissionDenied(detail='Incorrect turn')
        room.users.add(self.request.user)
        room.current_user_index = (room.current_user_index + 1) % room.users.count()
        room.save()
        serializer.save(author=self.request.user, room=room)
