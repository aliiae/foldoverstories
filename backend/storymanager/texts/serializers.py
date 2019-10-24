from rest_framework import serializers

from accounts.serializers import UserSerializer
from .models import Text


class TextsFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('hidden_text', 'visible_text')


class TextsVisibleOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('visible_text',)
