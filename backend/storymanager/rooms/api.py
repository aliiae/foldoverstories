from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from django.http import HttpResponse
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, NotAuthenticated, ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from accounts.serializers import RoomUsersSerializer
from rooms.models import Room, Membership
from texts.models import Text
from storymanager.django_types import QueryType, RequestType
from websockets.server_send import WEBSOCKET_MSG_JOIN, send_channel_message, WEBSOCKET_MSG_LEAVE
from .serializers import (RoomsListSerializer, RoomReadSerializer, RoomsReadOnlySerializer,
                          SingleRoomSerializer)

User = get_user_model()


class RoomsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class RoomsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = RoomsPagination
    lookup_field = 'room_title'
    serializer_class = RoomsListSerializer
    detail_serializer_class = SingleRoomSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'create':
            if hasattr(self, 'detail_serializer_class'):
                return self.detail_serializer_class
        return super(RoomsViewSet, self).get_serializer_class()

    def get_queryset(self) -> QueryType[Room]:
        if not self.request.user.is_authenticated:
            return Room.objects.none()
        return self.request.user.rooms.all()

    def retrieve(self, request, room_title=None, *args, **kwargs) -> HttpResponse:
        room: Room = get_object_or_404(Room, room_title=room_title)
        if not request.user.is_authenticated:
            return Response(RoomsReadOnlySerializer(room, context={'request': request}).data)
        return Response(self.detail_serializer_class(room, context={'request': request}).data)

    def perform_create(self, serializer: RoomsListSerializer):
        room: Room = serializer.save()
        room.add_user(self.request.user)

    @action(detail=True, methods=['post'])
    def leave(self, request: RequestType, room_title=None, *args, **kwargs) -> HttpResponse:
        room: Room = get_object_or_404(Room, room_title=room_title)
        if not request.user.is_authenticated:
            raise NotAuthenticated(detail='User needs to login first')

        room_memberships: QueryType[Membership] = Membership.objects.filter(room=room).all()
        user_membership: Membership = room_memberships.get(user=self.request.user)
        if not user_membership:
            raise ValidationError(detail='User has not joined the room')
        if user_membership.status == Membership.STOPPED:
            # user has previously left the room, nothing to do
            return Response(status=status.HTTP_204_NO_CONTENT)
        room.leave_room(request.user)
        send_channel_message(room_title, {
            'type': WEBSOCKET_MSG_LEAVE,
            'room_title': room_title,
            'username': self.request.user.username,
        })
        return Response(status=status.HTTP_200_OK)


class RoomUsersAPI(generics.GenericAPIView, ListModelMixin):
    serializer_class = RoomUsersSerializer

    def post(self, request, *args, **kwargs) -> HttpResponse:
        """Adds `request.user` into the room with `room_title`."""
        room_title: str = self.kwargs['room_title']
        room: Room = get_object_or_404(Room, room_title=room_title)
        if not request.user.is_authenticated:
            raise NotAuthenticated(detail='User needs to login first')
        room.add_user(request.user)
        send_channel_message(room_title, {
            'type': WEBSOCKET_MSG_JOIN,
            'room_title': room_title,
            'username': self.request.user.username,
        })
        return Response(status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)

    def get_queryset(self) -> QueryType[User]:
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        room_users = room.users.annotate(texts_count=Count('texts', filter=Q(texts__room=room)))
        Room.calculate_current_turn_user(room_title, self.request.user)  # recalculate
        return room_users.all().order_by('membership__id')


class RoomReadViewSet(viewsets.GenericViewSet, ListModelMixin):
    permission_classes = [permissions.AllowAny]
    serializer_class = RoomReadSerializer
    pagination_class = None

    def get_queryset(self) -> QueryType[Text]:
        room: Room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        if not room.is_finished:
            raise PermissionDenied(detail='Story is not finished yet')
        return room.texts.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)
