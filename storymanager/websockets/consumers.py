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
            asyncio.gather(*channel_groups)
            await self.accept(subprotocol=self.scope['subprotocols'][1])

    async def receive_json(self, content, **kwargs):
        try:
            pass
            # if command == 'join':
            #     await self.join_room(content['room'])
            # elif command == 'leave':
            #     await self.leave_room(content['room'])
            # elif command == 'send':
            #     await self.send_room(content['room'])
        except ClientError as e:
            await self.send_json({'error': e.code})
    #
    # async def join_room(self, room_title):
    #     """Called by receive_json when someone sent a join command."""
    #     room = await self._get_room_or_error(room_title)
    #     await self.channel_layer.group_send(room.group_name, {'type': 'room.join'})
    #     self.rooms.add(room_title)
    #     await self.channel_layer.group_add(room.group_name, self.channel_name)
    #
    # async def leave_room(self, room_title):
    #     """Called by receive_json when someone sent a leave command."""
    #     room = await self._get_room_or_error(room_title)
    #     await self.channel_layer.group_send(room.group_name, {'type': 'room.leave'})
    #     # self.rooms.discard(room_title)
    #     # await self.channel_layer.group_discard(room.group_name, self.channel_name)
    #
    # async def send_room(self, room_title):
    #     """Called by receive_json when someone sends a text to a room."""
    #     if room_title not in self.rooms:
    #         raise ClientError('ROOM_ACCESS_DENIED')
    #     room = await self._get_room_or_error(room_title)
    #     await self.channel_layer.group_send(room.group_name, {'type': 'room.text'})

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

    async def echo_message(self, event):
        await self.send_json(event)

    @database_sync_to_async
    def _get_user_rooms(self, user):
        return user.rooms.only('room_title').values_list('room_title', flat=True)


class ClientError(Exception):
    def __init__(self, code):
        super().__init__(code)
        self.code = code
