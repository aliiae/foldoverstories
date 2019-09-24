from django.contrib.auth.models import User
from django.db import models


class Rooms(models.Model):
    room_title = models.CharField(max_length=100, unique=True)
    users = models.ManyToManyField(User, related_name="room")
    created_at = models.DateTimeField(auto_now_add=True)
