import logging
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from websockets.consumers import ClientError

WEBSOCKET_MSG_ADD_TEXT = 'room.text'
WEBSOCKET_MSG_JOIN = 'room.join'
WEBSOCKET_MSG_LEAVE = 'room.leave'
WEBSOCKET_MSG_FINISH = 'room.finish'

logger = logging.getLogger(__name__)


def send_channel_message(group_name, msg):
    """Sends message to all subscribers of the room with the specified group name."""
    try:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(group_name, msg)
    except ClientError:
        pass
    except OSError as e:
        logger.error(f'Websocket connection failure: {e.errno} {e.strerror}')
