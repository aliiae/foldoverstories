from django.db import models


class RoomTexts(models.Model):
    author_id = models.CharField(max_length=100)
    visible_text = models.CharField(max_length=200)
    hidden_text = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
