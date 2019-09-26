from rest_framework import viewsets, permissions

from .serializers import RoomsSerializer


class RoomsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoomsSerializer
    lookup_field = 'roomTitle'

    def get_queryset(self):
        return self.request.user.room.all()

    def perform_create(self, serializer: RoomsSerializer):
        room = serializer.save()
        room.users.add(self.request.user)
