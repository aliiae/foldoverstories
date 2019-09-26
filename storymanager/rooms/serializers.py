from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Rooms


class RoomUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class RoomsSerializer(serializers.ModelSerializer):
    users = RoomUsersSerializer(read_only=True, many=True)
    class Meta:
        model = Rooms
        fields = '__all__'
