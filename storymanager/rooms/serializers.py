from typing import Optional

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from accounts.serializers import UserSerializer
from texts.models import Text
from .models import Room, Membership

User = get_user_model()


class RoomUserStatusSerializer(serializers.ModelSerializer):
    """A base serializer used for introducing user_left_room and user_can_write fields."""
    user_left_room = serializers.SerializerMethodField('get_user_left_room')
    user_can_write_now = serializers.SerializerMethodField('get_user_can_write_now')

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

    def get_current_turn_username(self, obj: Room, *args, **kwargs) -> Optional[str]:
        if 'request' not in self.context:
            return None
        request_user = self.context['request'].user
        current_turn_user = obj.calculate_current_turn_user(request_user)
        return current_turn_user.username if current_turn_user else None

    class Meta:
        model = Room
        fields = ('room_title', 'finished_at', 'user_left_room', 'user_can_write_now',
                  'current_turn_username')


class RoomsSerializer(RoomUserStatusSerializer):
    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Room
        fields = ('room_title', 'users', 'finished_at', 'modified_at',
                  'user_left_room', 'user_can_write_now')


class RoomsReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_title', 'finished_at')


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
