import asyncio

from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from channels.generic.websocket import AsyncJsonWebsocketConsumer

User = get_user_model()


class RoomConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, scope):
        super().__init__(scope)
        self.rooms = set()

    async def connect(self):
        user = self.scope['user']
        if user.is_anonymous:
            await self.close()
        else:
            channel_groups = []
            self.rooms = set(
                (room_title for room_title in await self._get_user_rooms(self.scope['user'])))
            for room in self.rooms:
                channel_groups.append(self.channel_layer.group_add(room, self.channel_name))
            await asyncio.gather(*channel_groups)
            await self.accept(subprotocol=self.scope['subprotocols'][1])

    async def receive_json(self, content, **kwargs):
        try:
            pass
        except ClientError as e:
            await self.send_json({'error': e.code})

    async def room_join(self, event):
        await self.send_json({'msg_type': 'room.join'})

    async def room_leave(self, event):
        await self.send_json({'msg_type': 'room.leave'})

    async def room_text(self, event):
        await self.send_json({'msg_type': 'room.text'})

    async def room_finish(self, event):
        await self.send_json({'msg_type': 'room.finish'})

    async def disconnect(self, code):
        # remove this channel from every room's group
        channel_groups = [
            self.channel_layer.group_discard(group=room_title, channel=self.channel_name)
            for room_title in self.rooms]
        await asyncio.gather(*channel_groups)
        # remove all references to rooms
        self.rooms.clear()
        await super().disconnect(code)

    @database_sync_to_async
    def _get_user_rooms(self, user):
        return user.rooms.only('room_title').values_list('room_title', flat=True)


class ClientError(Exception):
    def __init__(self, code):
        super().__init__(code)
        self.code = code
