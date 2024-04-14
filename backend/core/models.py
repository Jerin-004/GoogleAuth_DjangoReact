from django.db import models


# Create your models here.

class UserData(models.Model):
    username = models.CharField(max_length=255)
    emaildata = models.CharField(max_length=255)