from typing import Optional
import uuid
from django.contrib.auth import get_user_model
from django.db import models, transaction
from django.utils import timezone

from rooms.utils import random_adj_noun_pair
from storymanager.django_types import QueryType
from websockets.server_send import (send_channel_message, WEBSOCKET_MSG_FINISH)

User = get_user_model()


def get_user_room_membership(user: User, room: 'Room') -> Optional['Membership']:
    if not room.has_user(user):
        return None
    return Membership.objects.select_related().get(room=room, user=user)


def attempt_random_adj_noun_pair(attempts: int = 5) -> str:
    """
    Tries to generate a unique adjective-noun pair for n (5) times, otherwise returns a random UUID.
    Example: 'steel-fish' or '513a3445-8ac4-425e-97c9-8152571bb682'.

    :param attempts: Number of attempts to generate a unique id.
    :return: A unique id string.
    """
    attempts = attempts or 1
    for _ in range(attempts):
        adj_noun_pair = random_adj_noun_pair()
        if not Room.objects.filter(room_title=adj_noun_pair).exists():
            return adj_noun_pair
    return str(uuid.uuid4())


class Room(models.Model):
    room_title = models.SlugField(unique=True, default=attempt_random_adj_noun_pair)
    users = models.ManyToManyField(User, related_name='rooms', blank=True, through='Membership')
    is_finished = models.BooleanField(default=False)
    finished_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-modified_at', 'room_title')

    def __str__(self):
        return self.room_title

    def save(self, *args, **kwargs):
        if self.is_finished:
            self.finished_at = timezone.now()
        super(Room, self).save(*args, **kwargs)

    @classmethod
    def calculate_current_turn_user(cls, room_title: str, request_user: User) -> Optional[User]:
        """Calculates the user allowed to post, the one chronologically next after the prev poster.

        Allows the current turn curr_user write, prohibits others.
        Closes the room if no active (those who have not stopped) users left.
        Returns None if the room is closed.

        :param room_title: The room's title used as id.
        :param request_user: The currently logged in user.
        :return: A current turn User object, or None if the room is closed.
        """

        def index_of(target, items) -> int:
            index = next(idx for idx, item in enumerate(items) if item == target)
            return -1 if index is None else index

        def marked_curr_user(curr_user=request_user, update_others=False) -> Optional[User]:
            """
            Allows `curr_user` to write now.

            If `update_others=True`, forbids all other users to write now.
            If the user is a not logged in or has not joined the room yet, returns None.
            """
            curr_membership = get_user_room_membership(curr_user, room)
            if curr_membership is None:  # it is a guest user, they can view anything
                return None
            if curr_membership.status == Membership.WAITING:
                Membership.update_status(curr_membership, Membership.CAN_WRITE)
            if update_others:
                room.close_all_memberships_except(curr_user)
            return curr_user

        with transaction.atomic():
            room = Room.objects.select_for_update().select_related().get(room_title=room_title)
            if room.is_finished:
                return None
            active_users = room.get_active_users()
            if active_users.count() == 0:  # everyone stopped
                room.close()
                return None
            if room.texts.count() == 0:  # the room is empty, return the currently logged in user
                return marked_curr_user(request_user)
            all_users = room.get_all_room_users()
            if all_users.count() == 1:  # return the room's owner if they're alone
                return marked_curr_user(room.users.all()[0])
            prev_turn_user: User = room.texts.last().author
            if (active_users.count() == 1
                    and prev_turn_user == request_user == active_users.first()):
                # everyone else stopped, finish room to prevent double-posting
                room.close()
                return None
            prev_turn_user_index = index_of(prev_turn_user, all_users)
            if prev_turn_user_index == -1:  # current user is the first one to write, allow anyone
                return marked_curr_user(request_user)
            # get the next available active curr_user
            curr_turn_user = active_users[(prev_turn_user_index + 1) % active_users.count()]
            return marked_curr_user(curr_turn_user, update_others=True)

    def close_all_memberships_except(self, excluded_user: User = None):
        """Marks all users who are not `curr_turn_user` as those who cannot write now."""
        if excluded_user is None:
            not_curr_memberships = Membership.objects.filter(room=self)
            not_curr_memberships.update(status=Membership.STOPPED)
        else:
            not_curr_memberships = (Membership.objects
                                    .filter(room=self)
                                    .exclude(status=Membership.STOPPED)
                                    .exclude(user=excluded_user))
            not_curr_memberships.update(status=Membership.WAITING)

    def get_all_room_users(self) -> QueryType[User]:
        """Returns all room's users."""
        return self.users.all().order_by('membership__id')

    def get_active_users(self) -> QueryType[User]:
        """Returns the subset of users who have not stopped yet."""
        return (self.users
                .exclude(membership__status=Membership.STOPPED)
                .order_by('membership__id'))

    def has_user(self, user: User) -> bool:
        """Checks whether the user has joined the room before."""
        return Membership.objects.filter(room=self, user=user).exists()

    def add_user(self, user: User):
        """Adds a user into the room."""
        if self.has_user(user):
            return
        new_user_membership = Membership.objects.create(room=self, user=user)
        new_user_membership.save()
        Room.calculate_current_turn_user(self.room_title, user)  # recalculate current turn user

    def leave_room(self, user: User):
        """Marks the user as finished in the room."""
        user_membership = get_user_room_membership(user, self)
        if not user_membership:
            return
        Membership.update_status(user_membership, Membership.STOPPED)
        Room.calculate_current_turn_user(self.room_title, user)

    def close(self):
        """Closes the room and corresponding memberships."""
        self.is_finished = True
        self.close_all_memberships_except(None)
        self.save()
        send_channel_message(self.room_title, {
            'type': WEBSOCKET_MSG_FINISH,
            'room_title': self.room_title,
        })


class Membership(models.Model):
    STOPPED = 'STOPPED'
    WAITING = 'WAITING'
    CAN_WRITE = 'CAN_WRITE'
    USER_STATUS_CHOICES = ((STOPPED, 'STOPPED'), (WAITING, 'WAITING'), (CAN_WRITE, 'CAN_WRITE'))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    status = models.CharField(choices=USER_STATUS_CHOICES, default=WAITING, max_length=9)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user}+{self.room}'

    @classmethod
    def update_status(cls, membership, new_status):
        Membership.objects.filter(id=membership.id).update(status=new_status)
