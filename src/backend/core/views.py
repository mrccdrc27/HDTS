from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Employee
from .serializers import EmployeeSerializer
from .serializers import MyTokenObtainPairSerializer, CustomTokenObtainPairSerializer

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
