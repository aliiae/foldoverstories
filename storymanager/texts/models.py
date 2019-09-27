from django.contrib.auth.models import User
from django.db import models

from rooms.models import Room


class Text(models.Model):
    author = models.ForeignKey(User, related_name='texts', null=True,
                               on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='texts', blank=True,
                             on_delete=models.CASCADE, db_column='room')
    visible_text = models.TextField()
    hidden_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
