from rest_framework import serializers
from .models import *

class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = "__all__"
        

