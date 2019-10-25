from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()
PASSWORD = 'pass_w0rd!'


def create_user(username: str = 'test_user', password: str = PASSWORD) -> User:
    User.objects.filter(username=username).delete()
    return User.objects.create_user(username=username, password=password)


def login_user_into_client(user: User, client: APIClient) -> str:
    from knox.models import AuthToken
    instance, token = AuthToken.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    client.login(username=user.username, password=PASSWORD)
    return token


def create_user_room_text(user: User, room: 'Room', visible_text: str = 'text', **kwargs) -> 'Text':
    from texts.models import Text
    text = Text.objects.create(room=room, author=user, visible_text=visible_text, **kwargs)
    return text


def create_user_room(user: User, room_title: str, **kwargs) -> 'Room':
    from rooms.models import Room
    Room.objects.filter(room_title=room_title).delete()
    room = Room.objects.create(room_title=room_title, **kwargs)
    room.add_user(user)
    return room
