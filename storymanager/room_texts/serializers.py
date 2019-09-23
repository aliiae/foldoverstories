from rest_framework import serializers

from .models import RoomTexts


class RoomTextsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTexts
        fields = '__all__'
