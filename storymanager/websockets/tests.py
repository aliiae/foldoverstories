from typing import Tuple

import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from channels.testing import WebsocketCommunicator
from rest_framework.test import APIClient

from storymanager.routing import application
from rooms.models import add_user_to_room
from storymanager.tests_utils import create_user, login_user_into_client, create_user_room
from websockets.server_send import WEBSOCKET_MSG_JOIN

TEST_CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
    },
}
User = get_user_model()
ROOM_TITLE = 'a-b'


@database_sync_to_async
def ws_create_login_user_with_group(
        client: APIClient, group: str = ROOM_TITLE, **kwargs) -> Tuple[User, str]:
    user = create_user(**kwargs)
    user_group, _ = Group.objects.get_or_create(name=group)
    user.groups.add(user_group)
    user.save()
    token = login_user_into_client(user, client)
    return user, token


async def auth_connect(token, room_title: str = ROOM_TITLE) -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(
        application=application,
        subprotocols=['accept_token', token],
        path=f'ws/room/{room_title}',
    )
    connected, subprotocol = await communicator.connect()
    print('OUTPUT:', subprotocol)
    assert connected
    return communicator


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
class TestWebsockets:

    async def test_authorised_user_can_connect(self, settings):
        settings.CHANNEL_LAYERS = TEST_CHANNEL_LAYERS
        client = APIClient()
        user, token = await ws_create_login_user_with_group(client=client)
        communicator = await auth_connect(token)
        await communicator.disconnect()

    async def test_users_are_alerted_on_room_join(self, settings):
        settings.CHANNEL_LAYERS = TEST_CHANNEL_LAYERS
        client = APIClient()
        user, token = await ws_create_login_user_with_group(client=client)
        communicator = await auth_connect(token)
        room = await database_sync_to_async(create_user_room)(user, ROOM_TITLE)
        channel_layer = get_channel_layer()
        await channel_layer.group_add(group=ROOM_TITLE, channel='test_channel')
        another_user = await ws_create_login_user_with_group(client=client, username='another_user')
        await database_sync_to_async(add_user_to_room)(another_user, room)
        # Receive JSON message from server on test channel.
        response = await channel_layer.receive('test_channel')
        data = response.get('data')
        assert data['type'] == WEBSOCKET_MSG_JOIN
        await communicator.disconnect()
