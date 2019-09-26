from rest_framework import viewsets, permissions

from .serializers import TextsSerializer


class TextsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TextsSerializer

    def get_queryset(self):
        return self.request.user.texts.filter(room_title__room_title='same_frog')

    def perform_create(self, serializer: TextsSerializer):
        serializer.save(author=self.request.user)
