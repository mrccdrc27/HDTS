from rest_framework import serializers
from .models import Employee, Ticket, TicketAttachment
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
        data['first_name'] = user.first_name
        
        return data

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = ['id', 'file', 'file_name', 'file_type', 'file_size', 'upload_date']
        read_only_fields = ['id', 'upload_date', 'file_size']

class TicketSerializer(serializers.ModelSerializer):
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    scheduled_date = serializers.DateField(required=False, allow_null=True)
    attachment = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Ticket
        fields = [
            'id', 'ticket_number', 'subject', 'category', 'sub_category', 'attachment',
            'description', 'scheduled_date', 'priority', 'department',
            'status', 'submit_date', 'update_date', 'attachments'
        ]
        read_only_fields = [
            'id', 'submit_date', 'update_date', 'response_time',
            'resolution_time', 'time_closed'
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        ticket = Ticket.objects.create(employee=user, **validated_data)
        return ticket
