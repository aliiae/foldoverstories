from rest_framework import viewsets, permissions, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from rooms.models import Room
from .serializers import RoomsSerializer, RoomUsersSerializer


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


class RoomUsersAPI(generics.GenericAPIView, ListModelMixin):  # TODO: try ModelViewSet...
    serializer_class = RoomUsersSerializer

    def post(self, request, *args, **kwargs):
        room_title = self.kwargs['room_title']
        room = get_object_or_404(Room, room_title=room_title)
        if request.user.is_authenticated:
            room.users.add(request.user)
            room.save()
            return Response({'room_title': room_title})
        else:
            raise PermissionDenied

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)

    def get_queryset(self):
        room = get_object_or_404(Room, room_title=self.kwargs['room_title'])
        return room.users.all().order_by('membership__joined_at')
