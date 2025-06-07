from rest_framework import serializers
from .models import Employee, Ticket, TicketAttachment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import AuthenticationFailed

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'last_name', 'first_name', 'middle_name', 'suffix',
            'company_id', 'department', 'email', 'password', 
            'image', 'role', 'status'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'image': {'required': False, 'allow_null': True}
        }

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
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        
        return token

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
        except AuthenticationFailed:
            raise serializers.ValidationError("Invalid credentials.")

        user = self.user

        if user.is_superuser or user.role in ["System Admin", "Ticket Coordinator"]:
            raise serializers.ValidationError("Invalid credentials.")

        if hasattr(user, 'status') and user.status != 'Approved':
            raise serializers.ValidationError("Account is pending for approval.")

        data['email'] = user.email
        data['role'] = user.role if hasattr(user, 'role') else 'Unknown'
        data['first_name'] = user.first_name

        return data

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        if not user.is_superuser and user.role not in ["System Admin", "Ticket Coordinator"]:
            raise serializers.ValidationError("Access denied: Admins only.")

        # Add these to the response body (optional)
        data['email'] = user.email
        data['role'] = getattr(user, 'role', 'Unknown')
        data['first_name'] = user.first_name

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # ✅ Add custom claims to the JWT
        token['email'] = user.email
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = ['id', 'file', 'file_name', 'file_type', 'file_size', 'upload_date']
        read_only_fields = ['id', 'upload_date', 'file_size']

class EmployeeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['first_name', 'last_name', 'email', 'company_id', 'department', 'image']

class TicketSerializer(serializers.ModelSerializer):
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    scheduled_date = serializers.DateField(required=False, allow_null=True)
    assigned_to = serializers.StringRelatedField(read_only=True)
    employee = EmployeeInfoSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = [
            'id', 'ticket_number', 'subject', 'category', 'sub_category',
            'description', 'scheduled_date', 'priority', 'department',
            'status', 'submit_date', 'update_date', 'assigned_to', 'attachments',
            'employee'
        ]
        read_only_fields = [
            'id', 'ticket_number', 'submit_date', 'update_date',
            'response_time', 'resolution_time', 'time_closed', 'assigned_to',
            'employee'
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        return Ticket.objects.create(employee=user, **validated_data)
