from rest_framework import serializers
from django.contrib.auth.models import User
from texts.models import Text
from .models import Room


class RoomUsersSerializer(serializers.ModelSerializer):
    texts_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'texts_count')


class RoomsSerializer(serializers.ModelSerializer):
    users = RoomUsersSerializer(read_only=True, many=True)

    class Meta:
        model = Room
        fields = '__all__'


class RoomReadSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    full_text = serializers.SerializerMethodField('get_full_text')

    def get_full_text(self, obj):
        return obj.hidden_text + ' ' + obj.visible_text

    def get_username(self, obj):
        return obj.author.username

    class Meta:
        model = Text
        fields = ('full_text', 'username',)
