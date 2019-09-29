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

        is_new_user = self.request.user not in room.users.all()
        if is_new_user:  # new users can view anything
            return Text.objects.filter(room__room_title=room_title)

        current_turn_user = self._get_current_turn_user(room)
        if self.request.user != current_turn_user:  # existing users can view only during their turn
            raise PermissionDenied(detail='Incorrect turn')
        return Text.objects.filter(room__room_title=room_title)

    def perform_create(self, serializer: TextsSerializer):
        # TODO: add timeout
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)

        is_new_user = self.request.user not in room.users.all()
        if is_new_user:
            room.users.add(self.request.user)  # TODO: 'Join' functionality in UI and API
        current_turn_user = self._get_current_turn_user(room)
        if self.request.user != current_turn_user:
            raise PermissionDenied(detail='Incorrect turn')

        room.save()
        serializer.save(author=self.request.user, room=room)

    def _default_turn_user(self):
        return self.request.user  # TODO: Or should it be the owner of the room, users[0]?

    def _get_current_turn_user(self, room):
        """Returns the user allowed to post, the one next after the prev poster in room.users."""

        def index_of(target, items):
            return next(i for i, user in enumerate(items) if user == target)

        users = room.users.all().order_by('date_joined')
        if room.texts.count() == 0:
            return self._default_turn_user()
        prev_user = room.texts.last().author
        prev_user_index = index_of(prev_user, users)
        if prev_user_index is None:
            return self._default_turn_user()

        current_turn_user_index = (prev_user_index + 1) % room.users.count()
        current_turn_user = users[current_turn_user_index]
        return current_turn_user
