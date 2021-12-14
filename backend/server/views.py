from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
)
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, TokenObtainPairSerializer

User = get_user_model()


class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()


class TokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
