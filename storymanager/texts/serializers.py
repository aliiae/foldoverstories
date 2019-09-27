from rest_framework import serializers

from rooms.serializers import RoomsSerializer, RoomUsersSerializer
from .models import Text


class TextsSerializer(serializers.ModelSerializer):
    room = RoomsSerializer(read_only=True, many=False)
    author = RoomUsersSerializer(read_only=True)

    class Meta:
        model = Text
        fields = '__all__'
