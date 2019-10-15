from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from texts.models import Text
from .models import Room, Membership

User = get_user_model()


class RoomUsersSerializer(serializers.ModelSerializer):
    texts_count = serializers.IntegerField(read_only=True)
    user_left_room = serializers.SerializerMethodField('did_user_leave_room')
    user_can_write_now = serializers.SerializerMethodField('can_user_write_now')

    def did_user_leave_room(self, obj) -> bool:  # => user_left_room
        user_membership = self._get_user_membership(obj)
        if user_membership:
            return user_membership.has_stopped

    def can_user_write_now(self, obj) -> bool:  # => user_can_write_now
        user_membership = self._get_user_membership(obj)
        if user_membership:
            return user_membership.can_write_now

    def _get_user_membership(self, obj):
        if 'room_title' in self.context.get('view').kwargs:
            room = get_object_or_404(Room, room_title=self.context.get('view').kwargs['room_title'])
            user_membership = get_object_or_404(Membership, room=room, user=obj)
            return user_membership

    class Meta:
        model = User
        fields = ('username', 'texts_count', 'user_left_room', 'user_can_write_now')


class RoomsReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_title', 'users', 'is_finished', 'finished_at')


class RoomsSerializer(serializers.ModelSerializer):
    users = RoomUsersSerializer(read_only=True, many=True)
    user_left_room = serializers.SerializerMethodField('did_user_leave_room')
    user_can_write_now = serializers.SerializerMethodField('can_user_write_now')

    def did_user_leave_room(self, obj):  # => user_left_room
        user = self.context['request'].user
        if not obj.has_user(user):
            return None
        user_membership = get_object_or_404(Membership, room=obj, user=user)
        return user_membership.has_stopped

    def can_user_write_now(self, obj):  # => user_can_write_now
        user = self.context['request'].user
        if not obj.has_user(user):
            return None
        user_membership = get_object_or_404(Membership, room=obj, user=user)
        return user_membership.can_write_now

    class Meta:
        model = Room
        fields = ('room_title', 'users', 'is_finished', 'finished_at', 'modified_at',
                  'user_left_room', 'user_can_write_now')


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
