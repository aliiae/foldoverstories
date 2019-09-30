from django.db.models import Count, Q
from rest_framework import viewsets, permissions, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from rooms.models import Room
from .serializers import RoomsSerializer, RoomUsersSerializer, RoomReadSerializer


class RoomsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RoomsSerializer
    lookup_field = 'room_title'

    def get_queryset(self):
        return self.request.user.rooms.all().order_by('-modified_at')

    def perform_create(self, serializer: RoomsSerializer):
        room = serializer.save()
        room.users.add(self.request.user)


class RoomUsersAPI(generics.GenericAPIView, ListModelMixin):
    serializer_class = RoomUsersSerializer

    def post(self, request, *args, **kwargs):
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        if request.user.is_authenticated:
            room.users.add(request.user)
            room.save()
            return Response({'room_title': room_title, 'user': request.user})
        else:
            raise PermissionDenied(detail='User needs to login first')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)

    def get_queryset(self):
        room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        room_users = room.users.annotate(texts_count=Count('texts', filter=Q(texts__room=room)))
        return room_users.all().order_by('membership__joined_at')


class RoomReadViewSet(viewsets.ModelViewSet):
    serializer_class = RoomReadSerializer

    def get_queryset(self):
        room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        if not room.is_finished:
            raise PermissionDenied(detail='Story is not finished yet')
        return room.texts.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)
