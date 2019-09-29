import random

from django.contrib.auth.models import User
from django.db import models

from rooms.utils import ADJECTIVES, NOUNS


def random_adj_noun_pair(delimiter: str = '-') -> str:
    """
    Creates a random adj-noun pair joined by the specified delimiter.

    Sources:
    - Adjectives:
    -- 100 descriptive words (https://en.wiktionary.org/wiki/Appendix:Basic_English_word_list)
    -- 50 opposites (https://en.wiktionary.org/wiki/Appendix:Basic_English_word_list)
    - Nouns:
    -- Animal names with 1-3 syllables
    (http://jzimba.blogspot.com/2018/07/a-list-of-animal-names-sorted-by.html)


    :return: A string in the form adjective + delimiter + noun, e.g. 'small-bird'.
    """
    return random.choice(ADJECTIVES) + delimiter + random.choice(NOUNS)


def attempt_random_adj_noun_pair(attempts: int = 5) -> str:
    """Tries to generate a unique adj-noun pair for 5 times, else returns a random integer."""
    attempts = attempts or 1
    while attempts:
        adj_noun_pair = random_adj_noun_pair('-')
        if not Room.objects.filter(room_title=adj_noun_pair).exists():
            return adj_noun_pair
        attempts -= 1
    return str(random.randint(10000, 99999))


class Room(models.Model):
    room_title = models.SlugField(unique=True, default=attempt_random_adj_noun_pair,
                                  primary_key=True)
    users = models.ManyToManyField(User, related_name='rooms', blank=True)
    is_finished = models.BooleanField(default=False)
    current_user_index = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
