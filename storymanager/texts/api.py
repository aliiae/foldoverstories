from typing import Optional, Dict

from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404

from rooms.models import (Room, add_user_to_room, Membership, get_room_users, get_membership,
                          close_room)
from storymanager.django_types import QueryType
from texts.models import Text
from websockets.server_sends import send_channel_message, WEBSOCKET_MSG_ADD_TEXT
from .serializers import TextsVisibleOnlySerializer, TextsFullSerializer

User = get_user_model()


class TextsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TextsFullSerializer
        return TextsVisibleOnlySerializer

    def get_queryset(self) -> QueryType[Text]:
        room = self._room_instance
        if room.is_finished:
            raise PermissionDenied(detail='Story is finished')
        is_new_user: bool = self.request.user not in room.users.all()
        if is_new_user:  # new users can view anything
            return Text.objects.filter(room__room_title=self._room_title)
        user_membership: Membership = get_membership(self.request.user, room)
        if user_membership.has_stopped:  # user has previously left the room, cannot view anymore
            user_membership.can_write_now = False
            user_membership.save()
            raise PermissionDenied(detail='Left room')
        current_turn_user: User = self._get_current_turn_user(room)
        if self.request.user != current_turn_user:  # existing users can view only during their turn
            user_membership.can_write_now = False
            user_membership.save()
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
        return Text.objects.filter(room__room_title=self._room_title)

    def perform_create(self, serializer: TextsFullSerializer):
        room = self._room_instance
        if room.is_finished:
            raise PermissionDenied(detail='Story is finished')
        request_user = self.request.user
        add_user_to_room(request_user, room)
        user_membership = get_membership(request_user, room)
        if user_membership.has_stopped:
            raise PermissionDenied(detail='User has finished')

        current_turn_user = self._get_current_turn_user(room)
        if request_user != current_turn_user:
            user_membership.can_write_now = False
            user_membership.save()
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
        room.save()
        send_channel_message(self._room_title, WEBSOCKET_MSG_ADD_TEXT)
        serializer.save(author=request_user, room=room)

    def _default_turn_user(self, room: Room) -> User:
        default_user = self.request.user
        default_membership = get_membership(default_user, room)
        default_membership.can_write_now = True
        return default_user

    def _get_current_turn_user(self, room: Room) -> Optional[User]:
        """Returns the user allowed to post, the one next after the prev poster in room.users."""

        def index_of(target, items) -> int:
            index = next(idx for idx, item in enumerate(items) if item == target)
            return -1 if index is None else index

        users = get_room_users(room)
        if room.texts.count() == 0:  # the room is empty
            return self._default_turn_user(room)
        if users.count() == 1:  # only one user joined the room
            return users[0]
        prev_turn_user: User = room.texts.last().author
        prev_turn_user_index = index_of(prev_turn_user, users)
        if prev_turn_user_index == -1:  # current user is the first one to write
            return self._default_turn_user(room)
        # prev_turn_membership = self._get_membership(prev_turn_user, room)
        # prev_turn_membership.can_write_now = False
        # prev_turn_membership.save()
        curr_turn_user, curr_turn_membership = None, None
        for i in range(1, users.count()):
            curr_turn_user = users[(prev_turn_user_index + i) % users.count()]
            curr_turn_membership = get_membership(curr_turn_user, room)
            if not curr_turn_membership.has_stopped:
                break
        else:  # everyone else stopped, finish room to prevent double-posting
            if prev_turn_user == self.request.user:
                close_room(room)
                return None
        curr_turn_membership.can_write_now = True
        curr_turn_membership.save()
        return curr_turn_user

    @property
    def _room_title(self) -> str:
        return self.kwargs['room_title']

    @property
    def _room_instance(self) -> Room:
        return get_object_or_404(Room, room_title=self._room_title)

    @staticmethod
    def _wrong_turn_error_detail(current_turn_user: User) -> Dict[str, str]:
        if not current_turn_user:
            return {'last_turn': 'It was the last turn'}
        return {'current_turn_username': current_turn_user.username}
