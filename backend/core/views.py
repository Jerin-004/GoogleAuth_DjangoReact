from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken

from . import utils

def authenticate_or_create_user(email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = User.objects.create_user(username=email, email=email)
    return user

def get_jwt_token(user):
    token = AccessToken.for_user(user)
    return str(token)

class LoginWithGoogle(APIView):

    def post(self, request):
        if 'code' in request.data.keys():
            code = request.data['code']
            id_token = utils.get_id_token_with_code_method_1(code)
            print(id_token)
            user_name = id_token['name']
            user = authenticate_or_create_user(user_name)
            token = get_jwt_token(user)
            return Response({'access_token': token, 'username': user_name})

        return Response(status=status.HTTP_400_BAD_REQUEST)
    
