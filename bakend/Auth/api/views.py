from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer


@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({
            "detail": "Password incorrect",
        }, status=status.HTTP_401_UNAUTHORIZED)
    # token, created = Token.objects.get_or_create(user=user)
    token = RefreshToken.for_user(user)
    userSerializer = UserSerializer(instance=user)
    return Response({
        # "token": token.key,
        "refresh": str(token),
        "access": str(token.access_token),
        "user": userSerializer.data
    })


@api_view(['POST'])
def signup(request):
    userSerializer = UserSerializer(data=request.data)
    if userSerializer.is_valid():
        userSerializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        # token, created = Token.objects.get_or_create(user=user)
        token = RefreshToken.for_user(user)
        return Response({
            # "token": token.key,
            "refresh": str(token),
            "access": str(token.access_token),
            "user": userSerializer.data
        })
    return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def check_token(request):
    return Response("Valid for {}".format(request.user.email))

