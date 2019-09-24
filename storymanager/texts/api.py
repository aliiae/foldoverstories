from rest_framework import viewsets, permissions

from .serializers import TextsSerializer


class TextsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TextsSerializer

    def get_queryset(self):
        return self.request.user.texts.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
