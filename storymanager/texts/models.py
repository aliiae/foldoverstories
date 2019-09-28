from django.contrib.auth.models import User
from django.db import models

from rooms.models import Room


class Text(models.Model):
    author = models.ForeignKey(User, related_name='texts', null=True,
                               on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='texts', blank=True,
                             on_delete=models.CASCADE, db_column='room')
    visible_text = models.TextField()
    hidden_text = models.TextField(default='')
    is_last = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(Text, self).save(*args, **kwargs)
        self.room.save()  # to update the room's modified_at timestamp
