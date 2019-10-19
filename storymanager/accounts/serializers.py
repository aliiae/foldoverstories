from typing import Optional

from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

from rooms.models import Membership

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        password=validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class RoomUsersSerializer(serializers.ModelSerializer):
    texts_count = serializers.IntegerField(read_only=True)
    user_left_room = serializers.SerializerMethodField('get_user_left_room')
    user_can_write_now = serializers.SerializerMethodField('get_user_can_write_now')

    def get_user_left_room(self, obj: User) -> Optional[bool]:
        user_membership = self._get_user_membership(obj)
        return user_membership.has_stopped if user_membership else None

    def get_user_can_write_now(self, obj: User) -> Optional[bool]:
        user_membership = self._get_user_membership(obj)
        return user_membership.can_write_now if user_membership else None

    def _get_user_membership(self, obj: User) -> Membership:
        room_title = None
        if 'view' in self.context and 'room_title' in self.context.get('view').kwargs:
            room_title = self.context.get('view').kwargs['room_title']
        elif 'room_title' in self.context:
            room_title = self.context['room_title']
        if room_title:
            user_membership = Membership.objects.get(room__room_title=room_title, user=obj)
            return user_membership

    class Meta:
        model = User
        fields = ('username', 'texts_count', 'user_left_room', 'user_can_write_now')
