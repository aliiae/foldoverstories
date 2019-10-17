from typing import Optional

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

from rooms.utils import random_adj_noun_pair
from storymanager.django_types import QueryType
from websockets.server_send import (send_channel_message, WEBSOCKET_MSG_JOIN,
                                    WEBSOCKET_MSG_FINISH, WEBSOCKET_MSG_LEAVE)

User = get_user_model()


def get_user_room_membership(user: User, room: 'Room') -> 'Membership':
    return Membership.objects.get(room=room, user=user)


def leave_room(room_title: str, user_membership: 'Membership'):
    user_membership.has_stopped = True
    user_membership.can_write_now = False
    user_membership.save()
    send_channel_message(room_title, {
        'type': WEBSOCKET_MSG_LEAVE,
        'room_title': room_title,
        'username': user_membership.user.username,
    })


def attempt_random_adj_noun_pair(attempts: int = 5) -> str:
    """Tries to generate a unique adjective-noun pair for 5 times, else returns a random number."""
    attempts = attempts or 1
    for _ in range(attempts):
        adj_noun_pair = random_adj_noun_pair()
        if not Room.objects.filter(room_title=adj_noun_pair).exists():
            return adj_noun_pair
    return str(random.randint(10000, 99999))


class Room(models.Model):
    room_title = models.SlugField(unique=True, default=attempt_random_adj_noun_pair,
                                  primary_key=True)
    users = models.ManyToManyField(User, related_name='rooms', blank=True,
                                   through='Membership')
    is_finished = models.BooleanField(default=False)
    finished_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.room_title

    def save(self, *args, **kwargs):
        if self.is_finished:
            self.finished_at = timezone.now()
        super(Room, self).save(*args, **kwargs)

    def calculate_current_turn_user(self, request_user: User) -> Optional[User]:
        """
        Returns the curr_user allowed to post, the one next after the prev poster in self.users.
        Allows the current turn curr_user write, prohibits others.
        Closes the room if no active (.has_stopped = False) users left.

        Returns None if the room is closed.
        """

        def index_of(target, items) -> int:
            index = next(idx for idx, item in enumerate(items) if item == target)
            return -1 if index is None else index

        def marked_curr_user(curr_user=request_user, update_others=False) -> User:
            curr_membership = get_user_room_membership(curr_user, self)
            if not curr_membership.can_write_now:
                curr_membership.can_write_now = True
                curr_membership.save()
            if update_others:
                self.close_all_memberships_except(curr_user)
            return curr_user

        if self.is_finished:
            return None
        active_users = self.get_active_users()
        if active_users.count() == 0:  # everyone stopped
            self.close()
            return None
        if self.texts.count() == 0:  # the room is empty
            return marked_curr_user(request_user)
        all_users = self.get_all_room_users()
        if all_users.count() == 1:  # return the room's owner if they're alone
            return marked_curr_user(self.users.all()[0])
        prev_turn_user: User = self.texts.last().author
        if active_users.count() == 1 and prev_turn_user == request_user == active_users.all()[0]:
            # everyone else stopped, finish room to prevent double-posting
            self.close()
            return None
        prev_turn_user_index = index_of(prev_turn_user, all_users)
        if prev_turn_user_index == -1:  # current curr_user is the first one to write, allow anyone
            return marked_curr_user(request_user)
        # get the next available active curr_user
        curr_turn_user = active_users[(prev_turn_user_index + 1) % active_users.count()]
        return marked_curr_user(curr_turn_user, update_others=True)

    def close_all_memberships_except(self, excluded_user: User = None):
        """Marks all users who are not `curr_turn_user` as those who cannot write"""
        if excluded_user is None:
            not_curr_memberships = Membership.objects.filter(room=self)
        else:  # everyone
            not_curr_memberships = Membership.objects.filter(room=self).exclude(user=excluded_user)
        not_curr_memberships.update(can_write_now=False)

    def get_all_room_users(self) -> QueryType[User]:
        return self.users.all().order_by('membership__joined_at')

    def get_active_users(self) -> QueryType[User]:
        """Returns a subset of users who have not stopped yet"""
        return self.users.exclude(membership__has_stopped=True).order_by('membership__joined_at')

    def has_user(self, user: User) -> bool:
        return Membership.objects.filter(room=self, user=user).exists()

    def add_user(self, user: User):
        if self.has_user(user):
            return
        new_user_membership = Membership.objects.create(room=self, user=user)
        new_user_membership.save()
        self.calculate_current_turn_user(user)  # recalculate current turn user
        send_channel_message(self.room_title, {
            'type': WEBSOCKET_MSG_JOIN,
            'room_title': self.room_title,
            'username': user.username,
        })

    def close(self):
        self.is_finished = True
        self.close_all_memberships_except()
        self.save()
        send_channel_message(self.room_title, {
            'type': WEBSOCKET_MSG_FINISH,
            'room_title': self.room_title,
        })


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    has_stopped = models.BooleanField(default=False)
    can_write_now = models.BooleanField(default=False)
    joined_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.user}_{self.room}'
