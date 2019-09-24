from django.db import models


class RoomUsers(models.Model):
    room_title = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    user_cookie = models.CharField(max_length=200)
    user_position = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_heartbeat_at = models.DateTimeField()
