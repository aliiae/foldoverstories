from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from websockets.consumers import ClientError

WEBSOCKET_MSG_ADD_TEXT = 'room.text'
WEBSOCKET_MSG_JOIN = 'room.join'
WEBSOCKET_MSG_LEAVE = 'room.leave'
WEBSOCKET_MSG_FINISH_ROOM = 'room.finish'


def send_channel_message(group_name, msg_type):
    try:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(group_name, {'type': msg_type})
    except ClientError:
        pass
    except OSError:
        pass
