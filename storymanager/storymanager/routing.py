from channels.routing import ProtocolTypeRouter, URLRouter
import websockets.routing
from storymanager.token_auth import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            websockets.routing.websocket_urlpatterns
        )
    ),
})
