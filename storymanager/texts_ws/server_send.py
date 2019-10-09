from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def send_channel_message(group_name, msg_type):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(group_name, {'type': msg_type})
