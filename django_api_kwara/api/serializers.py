from rest_framework import serializers
from rest_framework.response import Response
from . import models
# from django.core.mail import send_mail
# import vonage

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LoanApplication
        fields = '__all__'

class SavingsApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SavingsApplication
        fields = '__all__'