from channels.routing import ProtocolTypeRouter, URLRouter
import texts_ws.routing
from storymanager.token_auth import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            texts_ws.routing.websocket_urlpatterns
        )
    ),
})
