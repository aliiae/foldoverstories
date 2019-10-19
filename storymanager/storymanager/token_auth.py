from channels.auth import AuthMiddlewareStack
from django.db import close_old_connections
from rest_framework import HTTP_HEADER_ENCODING
from django.contrib.auth.models import AnonymousUser
from knox.auth import TokenAuthentication

knoxAuth = TokenAuthentication()


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    from https://gist.github.com/rluts/22e05ed8f53f97bdd02eafdf38f3d60a
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        headers = dict(scope['headers'])
        if b'sec-websocket-protocol' in headers:
            try:
                close_old_connections()
                token_name, token_key = headers[b'sec-websocket-protocol'].decode().split(', ')
                if token_name == 'access_token':
                    user, auth_token = knoxAuth.authenticate_credentials(
                        token_key.encode(HTTP_HEADER_ENCODING))
                    scope['user'] = user
            except:
                scope['user'] = AnonymousUser()
        return self.inner(scope)


# noinspection PyPep8Naming
def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
