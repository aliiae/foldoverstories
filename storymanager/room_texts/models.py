from django.contrib.auth.models import User
from django.db import models


class RoomTexts(models.Model):
    author = models.ForeignKey(User, related_name="texts",
                               on_delete=models.CASCADE)
    visible_text = models.CharField(max_length=200)
    hidden_text = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
