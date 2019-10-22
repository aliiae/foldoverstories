from django.contrib.auth import get_user_model
from django.db import models

from rooms.models import Room

User = get_user_model()


class Text(models.Model):
    author = models.ForeignKey(User, related_name='texts', null=True,
                               on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='texts', blank=True,
                             on_delete=models.CASCADE, db_column='room')
    visible_text = models.TextField()
    hidden_text = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(Text, self).save(*args, **kwargs)
        self.room.save()  # to also update the room's "modified_at" timestamp

    class Meta:
        ordering = ('created_at', 'room__room_title')
