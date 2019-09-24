from rest_framework import viewsets, permissions

from .serializers import RoomTextsSerializer


class RoomTextsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RoomTextsSerializer

    def get_queryset(self):
        return self.request.user.texts.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
