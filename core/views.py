from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .serializers import EmployeeSerializer
from .models import Employee

@api_view(['POST'])
def register_employee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def employee_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        employee = Employee.objects.get(email=email)
    except Employee.DoesNotExist:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if employee.status != 'approved':
        return Response({'detail': 'Account not approved yet'}, status=status.HTTP_403_FORBIDDEN)

    if not check_password(password, employee.password):
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'Login successful', 'employee_id': employee.id})
