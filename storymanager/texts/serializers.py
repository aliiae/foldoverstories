from rest_framework import serializers

from rooms.models import Room
from rooms.serializers import RoomUsersSerializer
from .models import Text


class TextsRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_title', 'is_finished')


class TextsFullSerializer(serializers.ModelSerializer):
    room = TextsRoomSerializer(read_only=True)
    author = RoomUsersSerializer(read_only=True)

    class Meta:
        model = Text
        fields = '__all__'


class TextsSerializer(serializers.ModelSerializer):
    room = TextsRoomSerializer(read_only=True)

    class Meta:
        model = Text
        fields = ('visible_text', 'room')
