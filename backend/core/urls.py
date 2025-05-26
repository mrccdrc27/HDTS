from django.urls import path, include
from .views import (
    CreateEmployeeView,
    EmployeeTokenObtainPairView,
    AdminTokenObtainPairView,
    TicketViewSet,
    employee_profile_view,
)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "API is working!"})

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='ticket')

urlpatterns = [
    path('', api_root),  # GET /api/
    path('', include(router.urls)),  # GET/POST /api/tickets/
    path('create_employee/', CreateEmployeeView.as_view(), name='create_employee'),
    path('token/employee/', EmployeeTokenObtainPairView.as_view(), name='token_employee'),
    path('token/admin/', AdminTokenObtainPairView.as_view(), name='admin_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('employee/profile/', employee_profile_view, name='employee_profile'),
]
