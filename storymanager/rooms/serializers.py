from rest_framework import serializers
from django.contrib.auth.models import User

# from texts.models import Text
from .models import Room


class RoomUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


# class RoomTextsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Text
#         fields = '__all__'


class RoomsSerializer(serializers.ModelSerializer):
    users = RoomUsersSerializer(read_only=True, many=True)
    # texts = RoomTextsSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'
