from django.contrib.auth.models import User
from django.db import models
from rooms.models import Rooms

class Texts(models.Model):
    author = models.ForeignKey(User, related_name="texts",
                               on_delete=models.CASCADE,
                               null=True)
    room_title = models.ForeignKey(Rooms, related_name="texts",
                                   on_delete=models.CASCADE,
                                   null=True)
    visible_text = models.TextField()
    hidden_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
