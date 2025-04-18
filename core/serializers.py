from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        extra_kwargs = {
            'company_id': {'validators': []},
            'email': {'validators': []},
            'password': {'write_only': True},
        }

    def validate(self, data):
        company_id = data.get("company_id")
        email = data.get("email")

        if Employee.objects.filter(company_id=company_id).exists():
            raise serializers.ValidationError({"company_id": "Invalid Credentials"})

        if not email.lower().endswith("@gmail.com"):
            raise serializers.ValidationError({"email": "Only Gmail addresses are allowed."})

        if Employee.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Something went wrong. Please use a different email."})

        return data

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
