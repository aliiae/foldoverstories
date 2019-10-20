from typing import TypeVar, Generic, Iterator

from django.contrib.auth import get_user_model
from django.db.models import QuerySet
from django.http import HttpRequest

T = TypeVar("T")

User = get_user_model()


class QueryType(Generic[T], QuerySet):
    def __iter__(self) -> Iterator[T]:
        pass

    def add(self, *args, **kwargs):
        pass


class ModelType:
    objects: QuerySet = ...

    def save(self, *args, **kwargs):
        pass


class RequestType(HttpRequest):
    user: User = ...
