from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.fields import CurrentUserDefault
from rest_framework.generics import get_object_or_404

from texts.models import Text
from .models import Room, Membership


class RoomUsersSerializer(serializers.ModelSerializer):
    texts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'texts_count')


class RoomsSerializer(serializers.ModelSerializer):
    users = RoomUsersSerializer(read_only=True, many=True)
    user_left_room = serializers.SerializerMethodField('did_user_leave_room')
    user_can_write_now = serializers.SerializerMethodField('can_user_write_now')

    def did_user_leave_room(self, obj):  # user_left_room
        user_membership = get_object_or_404(Membership, room=obj, user=self.context['request'].user)
        return user_membership.has_stopped

    def can_user_write_now(self, obj):
        user_membership = get_object_or_404(Membership, room=obj, user=self.context['request'].user)
        return user_membership.can_write_now

    class Meta:
        model = Room
        fields = ('room_title', 'users', 'is_finished', 'finished_at', 'modified_at',
                  'user_left_room', 'user_can_write_now')


class RoomReadSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    full_text = serializers.SerializerMethodField('get_full_text')

    def get_full_text(self, obj):
        return obj.hidden_text + ' ' + obj.visible_text

    def get_username(self, obj):
        return obj.author.username

    class Meta:
        model = Text
        fields = ('full_text', 'username')
