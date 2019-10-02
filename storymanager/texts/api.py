from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404

from rooms.models import Room, Membership
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
        user_membership = Membership.objects.get(room=room, user=self.request.user)
        if user_membership.has_stopped:  # user has previously left the room, cannot view anymore
            raise PermissionDenied(detail='Left room')
        current_turn_user = self._get_current_turn_user(room)
        if self.request.user != current_turn_user:  # existing users can view only during their turn
            user_membership.can_write_now = False
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
        return Text.objects.filter(room__room_title=room_title)

    def perform_create(self, serializer: TextsSerializer):
        # TODO: add timeout?
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        if room.is_finished:
            raise PermissionDenied(detail='Story is finished')
        is_new_user = self.request.user not in room.users.all()
        if is_new_user:
            room.users.add(self.request.user)
        user_membership = Membership.objects.get(room=room, user=self.request.user)
        if user_membership.has_stopped:
            raise PermissionDenied(detail='User has finished')

        current_turn_user = self._get_current_turn_user(room)
        if self.request.user != current_turn_user:
            user_membership.can_write_now = False
            raise PermissionDenied(detail=self._wrong_turn_error_detail(current_turn_user))
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
        if users.count() == 1:
            return users[0]
        prev_turn_user = room.texts.last().author
        prev_turn_user_index = index_of(prev_turn_user, users)
        if prev_turn_user_index is None:
            return self._default_turn_user()

        step_in_queue = 1  # skip users who left
        current_turn_user_index = (prev_turn_user_index + step_in_queue) % users.count()
        current_turn_user = users[current_turn_user_index]
        current_turn_membership = Membership.objects.get(room=room, user=current_turn_user)
        while current_turn_membership.has_stopped and step_in_queue <= users.count():
            step_in_queue += 1
            current_turn_user_index = (prev_turn_user_index + step_in_queue) % users.count()
            current_turn_user = users[current_turn_user_index]
            current_turn_membership = Membership.objects.get(room=room, user=current_turn_user)
        if step_in_queue == users.count():  # everyone finished except for current user
            if prev_turn_user == current_turn_user == self.request.user and users.count() > 1:
                room.is_finished = True
                room.save()
                return None
        current_turn_membership.can_write_now = True
        return current_turn_user

    @staticmethod
    def _wrong_turn_error_detail(current_turn_user):
        return {'current_turn_username': current_turn_user.username}
