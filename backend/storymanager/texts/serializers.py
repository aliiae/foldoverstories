from rest_framework import serializers

from accounts.serializers import UserSerializer
from .models import Text


class TextsFullSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Text
        fields = ('author', 'hidden_text', 'visible_text')


class TextsVisibleOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('visible_text',)
