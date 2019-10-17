from rest_framework import serializers

from accounts.serializers import RoomUsersSerializer
from rooms.serializers import RoomsReadOnlySerializer
from .models import Text


class TextsFullSerializer(serializers.ModelSerializer):
    room = RoomsReadOnlySerializer(read_only=True)
    author = RoomUsersSerializer(read_only=True)

    class Meta:
        model = Text
        fields = ('room', 'author', 'hidden_text', 'visible_text')


class TextsVisibleOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('visible_text',)
