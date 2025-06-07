from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Employee, Ticket, TicketAttachment, TicketComment
from .models import PRIORITY_LEVELS, DEPARTMENT_CHOICES
from .serializers import EmployeeSerializer, TicketSerializer, TicketAttachmentSerializer, AdminTokenObtainPairSerializer, MyTokenObtainPairSerializer, CustomTokenObtainPairSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
import json
import os

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

class CreateAdminEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        # Auto-generate Company ID
        last_employee = Employee.objects.filter(company_id__startswith='MA').order_by('company_id').last()
        if last_employee:
            last_num = int(last_employee.company_id[2:])
            new_num = last_num + 1
        else:
            new_num = 1
        data['company_id'] = f"MA{new_num:04d}"

        # Set default password
        data['password'] = "1234"

        # Set default status
        data['status'] = "Pending"

        # Remove image field if not present
        if 'image' not in data:
            data['image'] = ''  # Will use model default

        serializer = EmployeeSerializer(data=data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response({
                "message": "Employee account created successfully",
                "company_id": employee.company_id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Token view for employee login (only employees)
class EmployeeTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  # restricts login to approved non-admin users

class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # For handling file uploads
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['System Admin', 'Ticket Coordinator']:
            return Ticket.objects.all()  # Admins and coordinators can see everything
        return Ticket.objects.filter(employee=user)  # Regular employees see their own
    
    def create(self, request, *args, **kwargs):
        # Extract the initial priority based on the category and subcategory
        # This logic would need to be updated based on your specific rules
        
        data = request.data.copy()
            
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

def generate_company_id():
    last_employee = Employee.objects.filter(company_id__startswith='MA').order_by('company_id').last()
    if last_employee:
        last_num = int(last_employee.company_id[2:])
        new_num = last_num + 1
    else:
        new_num = 1
    return f"MA{new_num:04d}"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_employee_admin_view(request):
    data = request.data.copy()
    data['company_id'] = generate_company_id()
    data['password'] = '1234'  # Default password
    data['status'] = 'Pending'

    # Remove 'image' from data — let model default take over
    data.pop('image', None)

    serializer = EmployeeSerializer(data=data)
    if serializer.is_valid():
        employee = serializer.save()
        return Response({
            'message': 'Account created successfully.',
            'company_id': employee.company_id
        }, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_profile_view(request):
    user = request.user
    serializer = EmployeeSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_ticket_detail(request, ticket_id):
    """
    Get detailed information about a specific ticket including employee data and comments
    """
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)
        
        # Check if user has permission to view this ticket
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator'] or request.user == ticket.employee):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        # Get comments based on user role
        if request.user.role in ['System Admin', 'Ticket Coordinator'] or request.user.is_staff:
            # Admins can see all comments including internal ones
            comments = ticket.comments.all().order_by('created_at')
        else:
            # Regular employees only see non-internal comments
            comments = ticket.comments.filter(is_internal=False).order_by('created_at')
        
        # Serialize ticket data
        ticket_data = {
            'id': ticket.id,
            'ticket_number': ticket.ticket_number,
            'subject': ticket.subject,
            'category': ticket.category,
            'sub_category': ticket.sub_category,
            'description': ticket.description,
            'attachments': TicketAttachmentSerializer(ticket.attachments.all(), many=True).data,
            'status': ticket.status,
            'priority': ticket.priority,
            'department': ticket.department,
            'submit_date': ticket.submit_date,
            'update_date': ticket.update_date,
            'assigned_to': {
                'id': ticket.assigned_to.id,
                'first_name': ticket.assigned_to.first_name,
                'last_name': ticket.assigned_to.last_name,
            } if ticket.assigned_to else None,
            'employee': {
                'id': ticket.employee.id,
                'first_name': ticket.employee.first_name,
                'last_name': ticket.employee.last_name,
                'company_id': ticket.employee.company_id,
                'department': ticket.employee.department,
                'email': ticket.employee.email,
            },
            'comments': [
                {
                    'id': comment.id,
                    'comment': comment.comment,
                    'created_at': comment.created_at,
                    'is_internal': comment.is_internal,
                    'user': {
                        'first_name': comment.user.first_name,
                        'last_name': comment.user.last_name,
                        'role': getattr(comment.user, 'role', 'User')
                    }
                } for comment in comments
            ]
        }
        
        return Response(ticket_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_ticket(request, ticket_id):
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)

        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator']):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        if ticket.status not in ['New', 'Pending']:
            return Response({'error': 'Ticket cannot be approved in current state'}, status=status.HTTP_400_BAD_REQUEST)

        priority = request.data.get('priority', 'Low')
        department = request.data.get('department', 'IT Department')
        approval_notes = request.data.get('approval_notes', '')

        valid_priorities = [choice[0] for choice in PRIORITY_LEVELS]
        valid_departments = [choice[0] for choice in DEPARTMENT_CHOICES]

        if priority not in valid_priorities:
            return Response({'error': 'Invalid priority level'}, status=status.HTTP_400_BAD_REQUEST)
        if department not in valid_departments:
            return Response({'error': 'Invalid department'}, status=status.HTTP_400_BAD_REQUEST)

        ticket.status = 'Open'
        ticket.priority = priority
        ticket.department = department
        ticket.assigned_to = request.user
        ticket.save()

        # Optional: create a comment for audit
        # TicketComment.objects.create(
        #     ticket=ticket,
        #     user=request.user,
        #     comment=f"Ticket approved and set to Open. Priority: {priority}, Dept: {department}. Notes: {approval_notes}",
        #     is_internal=True
        # )

        return Response({
            'message': 'Ticket approved successfully',
            'ticket_id': ticket.id,
            'status': ticket.status,
            'priority': ticket.priority,
            'department': ticket.department
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_ticket(request, ticket_id):
    """
    Reject a ticket with a reason
    """
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)
        
        # Check if user has permission to reject tickets
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator']):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if ticket is in a state that can be rejected
        if ticket.status not in ['New', 'Pending', 'Open']:
            return Response({'error': 'Ticket cannot be rejected in current state'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get rejection reason from request
        rejection_reason = request.data.get('rejection_reason', '').strip()
        
        if not rejection_reason:
            return Response({'error': 'Rejection reason is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update ticket
        ticket.status = 'Rejected'
        ticket.assigned_to = request.user  # Assign to the rejecting admin
        ticket.save()
        
        # Create internal comment for rejection
        TicketComment.objects.create(
            ticket=ticket,
            user=request.user,
            comment=f"Ticket rejected by {request.user.first_name} {request.user.last_name}. Reason: {rejection_reason}",
            is_internal=True
        )
        
        return Response({
            'message': 'Ticket rejected successfully',
            'ticket_id': ticket.id,
            'status': ticket.status,
            'rejection_reason': rejection_reason
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def claim_ticket(request, ticket_id):
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)

        # Only allow claiming if the ticket is Open
        if ticket.status != 'Open':
            return Response({'error': 'Ticket is not available for claiming.'}, status=status.HTTP_400_BAD_REQUEST)

        # Optional: prevent re-claim
        if ticket.assigned_to and ticket.status != 'Open':
            return Response({'error': 'Ticket is already claimed.'}, status=status.HTTP_400_BAD_REQUEST)

        ticket.status = 'On Process'  # or "In Progress"
        ticket.assigned_to = request.user
        ticket.save()

        # Optional log entry
        # TicketComment.objects.create(
        #     ticket=ticket,
        #     user=request.user,
        #     comment="Ticket claimed and marked as In Progress",
        #     is_internal=True
        # )

        return Response({
            'message': 'Ticket successfully claimed.',
            'ticket_id': ticket.id,
            'status': ticket.status,
            'assigned_to': request.user.email
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_ticket_status(request, ticket_id):
    """
    Update ticket status with optional comment
    """
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)
        
        # Check if user has permission to update tickets
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator']):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        new_status = request.data.get('status')
        comment_text = request.data.get('comment', '').strip()
        
        if not new_status:
            return Response({'error': 'Status is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate status transition
        valid_statuses = ['Open', 'In Progress', 'Resolved', 'Closed', 'On Hold']
        if new_status not in valid_statuses:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        
        old_status = ticket.status
        ticket.status = new_status
        
        # Handle special status changes
        if new_status == 'Closed' and old_status != 'Closed':
            ticket.time_closed = timezone.now()
            if ticket.submit_date:
                ticket.resolution_time = timezone.now() - ticket.submit_date
        
        ticket.save()
        
        # Create comment for status change
        status_comment = f"Status changed from '{old_status}' to '{new_status}' by {request.user.first_name} {request.user.last_name}"
        if comment_text:
            status_comment += f". Comment: {comment_text}"
        
        TicketComment.objects.create(
            ticket=ticket,
            user=request.user,
            comment=status_comment,
            is_internal=False  # Status updates can be visible to employees
        )
        
        return Response({
            'message': 'Ticket status updated successfully',
            'ticket_id': ticket.id,
            'old_status': old_status,
            'new_status': new_status
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_new_tickets(request):
    """
    Get all tickets with 'New' status for admin review
    """
    try:
        # Check if user has permission to view tickets
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator']):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        new_tickets = Ticket.objects.filter(status='New').select_related('employee').order_by('-submit_date')
        
        tickets_data = []
        for ticket in new_tickets:
            tickets_data.append({
                'id': ticket.id,
                'ticket_number': ticket.ticket_number,
                'subject': ticket.subject,
                'category': ticket.category,
                'submit_date': ticket.submit_date,
                'employee_name': f"{ticket.employee.first_name} {ticket.employee.last_name}",
                'employee_department': ticket.employee.department,
                'has_attachment': bool(ticket.attachments.exists())  # Updated to check TicketAttachment
            })
        
        return Response(tickets_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_open_tickets(request):
    try:
        if not request.user.is_staff and request.user.role not in ['System Admin', 'Ticket Coordinator']:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        tickets = Ticket.objects.filter(status='Open').select_related('employee')
        data = TicketSerializer(tickets, many=True).data
        return Response(data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_tickets(request):
    """
    Get all tickets assigned to the current admin user
    """
    try:
        # Check if user has permission
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator']):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        my_tickets = Ticket.objects.filter(assigned_to=request.user).select_related('employee').order_by('-submit_date')
        
        tickets_data = []
        for ticket in my_tickets:
            tickets_data.append({
                'id': ticket.id,
                'ticket_number': ticket.ticket_number,
                'subject': ticket.subject,
                'category': ticket.category,
                'priority': ticket.priority,
                'department': ticket.department,
                'status': ticket.status,
                'submit_date': ticket.submit_date,
                'update_date': ticket.update_date,
                'employee_name': f"{ticket.employee.first_name} {ticket.employee.last_name}",
                'employee_department': ticket.employee.department,
                'has_attachment': bool(ticket.attachments.exists())
            })
        
        return Response(tickets_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_attachment(request, ticket_id):
    """
    Secure file download endpoint
    """
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)
        
        # Check permissions
        if not (request.user.is_staff or request.user.role in ['System Admin', 'Ticket Coordinator'] or request.user == ticket.employee):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        if not ticket.attachment:
            raise Http404("File not found")
        
        file_path = ticket.attachment.path
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="application/octet-stream")
                response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
                return response
        else:
            raise Http404("File not found")
            
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)