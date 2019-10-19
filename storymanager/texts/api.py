from typing import Dict

from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404

from rooms.models import Room, get_user_room_membership
from storymanager.django_types import QueryType
from texts.models import Text
from websockets.server_send import send_channel_message, WEBSOCKET_MSG_ADD_TEXT
from .serializers import TextsVisibleOnlySerializer, TextsFullSerializer

User = get_user_model()


class TextsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TextsFullSerializer
        return TextsVisibleOnlySerializer

    def get_queryset(self) -> QueryType[Text]:
        """Returns a queryset with a single record: the last, most recent text."""
        room = self.room
        if room.is_finished:
            raise PermissionDenied(detail='Story is finished')
        is_new_user: bool = self.request.user not in room.users.all()
        if is_new_user:  # new users can view anything
            return Text.objects.filter(room=room)
        user_membership = get_user_room_membership(self.request.user, room)
        if user_membership.has_stopped:  # user has previously left the room, cannot view anymore
            user_membership.can_write_now = False
            user_membership.save()
            raise PermissionDenied(detail='Left room')
        current_turn_user = room.calculate_current_turn_user(self.request.user)  # recalculate
        user_membership.refresh_from_db()
        if not user_membership.can_write_now:
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
        return Text.objects.filter(room=room).reverse()[:1]

    def perform_create(self, serializer: TextsFullSerializer):
        room = self.room
        if room.is_finished:
            raise PermissionDenied(detail='Story is finished')
        request_user = self.request.user
        request_membership = get_user_room_membership(request_user, room)
        if request_membership.has_stopped:
            raise PermissionDenied(detail='User has finished')

        current_turn_user: User = room.calculate_current_turn_user(self.request.user)
        request_membership.refresh_from_db()
        if not request_membership.can_write_now:
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
        serializer.save(author=request_user, room=room)
        # room.calculate_current_turn_user(self.request.user)  # recalculate current turn user
        room.save(user=self.request.user)
        send_channel_message(self.room_title, {
            'type': WEBSOCKET_MSG_ADD_TEXT,
            'room_title': self.room_title,
            'username': request_user.username,
        })

    @property
    def room(self) -> Room:
        return get_object_or_404(Room, room_title=self.room_title)

    @property
    def room_title(self) -> str:
        return self.kwargs['room_title']

    @staticmethod
    def _wrong_turn_error_detail(current_turn_user: User) -> Dict[str, str]:
        if not current_turn_user:
            return {'last_turn': 'It was the last turn'}
        return {'current_turn_username': current_turn_user.username}
