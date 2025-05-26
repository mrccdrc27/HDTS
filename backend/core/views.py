from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Employee, Ticket, TicketAttachment
from .serializers import EmployeeSerializer, TicketSerializer
from .serializers import MyTokenObtainPairSerializer, CustomTokenObtainPairSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            return JsonResponse({
                'success': True,
                'first_name': user.first_name,
                'message': 'Login successful'
            })
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'})

# For employee registration
class CreateEmployeeView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if password != confirm_password:
            return Response(
                {"error": "Passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = EmployeeSerializer(data=data)
        if serializer.is_valid():
            try:
                employee = serializer.save()
                return Response(
                    {"message": "Account created successfully. Pending approval."},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Token view for employee login (only employees)
class EmployeeTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  # restricts login to approved non-admin users

# ✅ Token view for admin login (only admins, not superusers)
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  # restricts to System Admin and Ticket Agent

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # For handling file uploads
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['System Admin', 'Ticket Agent']:
            return Ticket.objects.all()  # Admins and agents can see everything
        return Ticket.objects.filter(employee=user)  # Regular employees see their own
    
    def create(self, request, *args, **kwargs):
        # Extract the initial priority based on the category and subcategory
        # This logic would need to be updated based on your specific rules
        
        data = request.data.copy()
        
        # Set employee department if not provided
        if not data.get('department'):
            data['department'] = request.user.department
            
        # Handle file uploads separately
        files = request.FILES.getlist('files[]')
        
        serializer = self.get_serializer(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        
        # Process multiple file attachments
        for file in files:
            TicketAttachment.objects.create(
                ticket=instance,
                file=file,
                file_name=file.name,
                file_type=file.content_type,
                file_size=file.size,
                uploaded_by=request.user
            )
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        return serializer.save()
        
    def perform_update(self, serializer):
        instance = serializer.instance
        if instance.status != serializer.validated_data.get('status'):
            # Status change logic
            new_status = serializer.validated_data.get('status')
            if new_status == 'Closed' and instance.status != 'Closed':
                serializer.validated_data['time_closed'] = timezone.now()
                if instance.submit_date:
                    serializer.validated_data['resolution_time'] = timezone.now() - instance.submit_date
        serializer.save()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_profile_view(request):
    user = request.user
    serializer = EmployeeSerializer(user)
    return Response(serializer.data)