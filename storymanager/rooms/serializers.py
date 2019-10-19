from typing import Optional

from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from rest_framework import serializers
from rest_framework.generics import get_object_or_404
from rest_framework.utils.serializer_helpers import ReturnList

from accounts.serializers import RoomUsersSerializer
from texts.models import Text
from .models import Room, Membership, get_user_room_membership

User = get_user_model()


class RoomUserStatusSerializer(serializers.ModelSerializer):
    """A base serializer used for introducing user_left_room and user_can_write fields."""
    users = serializers.SerializerMethodField('get_users')
    user_left_room = serializers.SerializerMethodField('get_user_left_room')
    user_can_write_now = serializers.SerializerMethodField('get_user_can_write_now')

    @staticmethod
    def get_users(obj: Room, *args, **kwargs) -> ReturnList:
        serializer = RoomUsersSerializer(
            User.objects.filter(membership__room=obj)
                .annotate(texts_count=Count('texts', filter=Q(texts__room=obj)))
                .order_by('membership__joined_at'),
            read_only=True, many=True, context={'room_title': obj.room_title})
        return serializer.data

    def get_user_left_room(self, obj: Room, *args, **kwargs) -> Optional[bool]:
        if 'request' not in self.context:
            return None
        user = self.context['request'].user
        if not obj.has_user(user):
            return None
        user_membership = get_object_or_404(Membership, room=obj, user=user)
        return user_membership.has_stopped

    def get_user_can_write_now(self, obj: Room, *args, **kwargs) -> Optional[bool]:
        if 'request' not in self.context:
            return None
        user = self.context['request'].user
        if not obj.has_user(user):
            return None
        user_membership = get_object_or_404(Membership, room=obj, user=user)
        return user_membership.can_write_now


class SingleRoomSerializer(RoomUserStatusSerializer):
    current_turn_username = serializers.SerializerMethodField('get_current_turn_username')
    visible_text = serializers.SerializerMethodField('get_visible_text', read_only=True)

    def get_visible_text(self, obj: Room) -> Optional[str]:
        if obj.is_finished:
            return None
        if not obj.texts.exists():
            return ''
        if 'request' not in self.context:  # user is not logged in, can view anything
            return obj.texts.last().visible_text
        request_user = self.context['request'].user
        obj.calculate_current_turn_user(request_user)
        request_user_membership = get_user_room_membership(request_user, obj)
        if not request_user_membership.can_write_now:
            return ''
        return obj.texts.last().visible_text

    def get_current_turn_username(self, obj: Room, *args, **kwargs) -> Optional[str]:
        if 'request' not in self.context:
            return None
        request_user = self.context['request'].user
        current_turn_user = obj.calculate_current_turn_user(request_user)
        return current_turn_user.username if current_turn_user else None

    class Meta:
        model = Room
        fields = ('room_title', 'users', 'finished_at', 'visible_text',
                  'user_left_room', 'user_can_write_now', 'current_turn_username')


class RoomsListSerializer(RoomUserStatusSerializer):
    class Meta:
        model = Room
        fields = ('room_title', 'users', 'finished_at', 'modified_at',
                  'user_left_room', 'user_can_write_now')


class RoomsReadOnlySerializer(SingleRoomSerializer):
    class Meta:
        model = Room
        fields = ('room_title', 'finished_at', 'users', 'visible_text')


class RoomReadSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    full_text = serializers.SerializerMethodField('get_full_text')

    @staticmethod
    def get_full_text(obj):
        return obj.hidden_text + ' ' + obj.visible_text

    @staticmethod
    def get_username(obj):
        return obj.author.username

    class Meta:
        model = Text
        fields = ('id', 'full_text', 'username')
