from rest_framework import serializers
from .models import Employee
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'last_name', 'first_name', 'middle_name', 'suffix',
            'company_id', 'department', 'email', 'password', 'image', 'role'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee(**validated_data)
        employee.set_password(password)
        employee.save()
        return employee

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        return token

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # ❌ Block superusers and admin roles from this endpoint
        if user.is_superuser or user.role in ["System Admin", "Ticket Agent"]:
            raise serializers.ValidationError("This login is for employee accounts only.")

        # ❌ Block employees who are not approved
        if hasattr(user, 'status') and user.status != 'Approved':
            raise serializers.ValidationError("Your account is pending approval.")

        data['email'] = user.email
        data['role'] = user.role if hasattr(user, 'role') else 'Unknown'
        return data
