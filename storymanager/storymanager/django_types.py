from typing import TypeVar, Generic, Iterator

from django.db.models import QuerySet

T = TypeVar("T")


class QueryType(Generic[T], QuerySet):
    def __iter__(self) -> Iterator[T]:
        pass

    def add(self, *args, **kwargs):
        pass


class ModelType:
    objects: QuerySet = ...

    def save(self, *args, **kwargs):
        pass


class RoomType(ModelType):
    texts: QueryType['TextType'] = ...
    users: QueryType['UserType'] = ...
    is_finished: bool = ...


class UserType(ModelType):
    username: str = ...


class MembershipType(ModelType):
    has_stopped: bool = ...
    can_write_now: bool = ...


class TextType(ModelType):
    pass
