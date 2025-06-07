from django.urls import path, include
from .views import (
    CreateEmployeeView,
    EmployeeTokenObtainPairView,
    AdminTokenObtainPairView,
    TicketViewSet,
    CreateAdminEmployeeView,
    employee_profile_view,
    approve_ticket,
    reject_ticket,
    get_ticket_detail,
    get_new_tickets,
    claim_ticket,
    update_ticket_status,
    get_open_tickets,
    get_my_tickets,
    create_employee_admin_view
)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "API is working!"})

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='ticket')

urlpatterns = [
    path('', api_root),

    # Custom endpoints (must come before router)
    path('create_employee/', CreateEmployeeView.as_view(), name='create_employee'),
    path("admin/create-employee/", CreateAdminEmployeeView.as_view(), name="admin-create-employee"),
    path('token/employee/', EmployeeTokenObtainPairView.as_view(), name='token_employee'),
    path("token/admin/", AdminTokenObtainPairView.as_view(), name="admin_token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('employee/profile/', employee_profile_view, name='employee_profile'),

    path('tickets/<int:ticket_id>/', get_ticket_detail, name='get_ticket_detail'),
    path('tickets/<int:ticket_id>/approve/', approve_ticket, name='approve_ticket'),
    path('tickets/<int:ticket_id>/reject/', reject_ticket, name='reject_ticket'),
    path('tickets/<int:ticket_id>/claim/', claim_ticket, name='claim_ticket'),
    path('tickets/<int:ticket_id>/update-status/', update_ticket_status, name='update_ticket_status'),
    path('tickets/new/', get_new_tickets, name='get_new_tickets'),
    path('tickets/open/', get_open_tickets, name='get_open_tickets'),
    path('tickets/my-tickets/', get_my_tickets, name='get_my_tickets'),

    # DRF router (should be last)
    path('', include(router.urls)),
]