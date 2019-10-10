from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from django.http import HttpResponse
from rest_framework import viewsets, permissions, generics
from rest_framework.exceptions import PermissionDenied, NotAuthenticated, ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from rooms.models import Room, Membership
from texts.models import Text
from storymanager.django_types import QueryType, RequestType
from texts_ws.server_send import send_channel_message, WEBSOCKET_MSG_JOIN, WEBSOCKET_MSG_LEAVE
from .serializers import RoomsSerializer, RoomUsersSerializer, RoomReadSerializer

User = get_user_model()


class RoomsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class RoomsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RoomsSerializer
    lookup_field = 'room_title'
    pagination_class = RoomsPagination

    def get_queryset(self) -> QueryType[Room]:
        return self.request.user.rooms.all().order_by('-modified_at')

    def perform_create(self, serializer: RoomsSerializer):
        room = serializer.save()
        room.users.add(self.request.user)


class RoomUsersAPI(generics.GenericAPIView, ListModelMixin):
    serializer_class = RoomUsersSerializer

    def post(self, request, *args, **kwargs) -> HttpResponse:
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        if not request.user.is_authenticated:
            raise NotAuthenticated(detail='User needs to login first')
        if request.user in room.users.all():
            raise ValidationError(detail='User has already joined')
        new_user_membership = Membership(room=room, user=request.user)  # adds user to the room
        new_user_membership.save()
        room.save()
        send_channel_message(room_title, WEBSOCKET_MSG_JOIN)
        return Response(status=200)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)

    def get_queryset(self) -> QueryType[User]:
        room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        room_users = room.users.annotate(texts_count=Count('texts', filter=Q(texts__room=room)))
        return room_users.all().order_by('membership__joined_at')


class LeaveRoomAPI(generics.GenericAPIView):
    def post(self, request: RequestType, *args, **kwargs) -> HttpResponse:
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        if not request.user.is_authenticated:
            raise NotAuthenticated(detail='User needs to login first')

        room_memberships: QueryType[Membership] = Membership.objects.filter(room=room).all()
        user_membership: Membership = room_memberships.get(user=self.request.user)
        if not user_membership:
            raise ValidationError(detail='User has not joined the room')
        if user_membership.has_stopped:  # user has previously left the room, nothing to do
            return Response(status=204)
        user_membership.has_stopped = True
        user_membership.can_write_now = False
        user_membership.save()
        if all(membership.has_stopped for membership in room_memberships):  # all authors left
            room.is_finished = True
            room.save()
        send_channel_message(room_title, WEBSOCKET_MSG_LEAVE)
        return Response(status=200)


class RoomReadViewSet(viewsets.ModelViewSet):
    serializer_class = RoomReadSerializer

    def get_queryset(self) -> QueryType[Text]:
        room: Room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        if not room.is_finished:
            raise PermissionDenied(detail='Story is not finished yet')
        return room.texts.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)
