from rest_framework import serializers

from .models import RoomUsers


class RoomUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomUsers
        fields = '__all__'
