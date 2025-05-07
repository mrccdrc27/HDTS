from django.urls import path
from .views import (
    CreateEmployeeView,
    EmployeeTokenObtainPairView,
    AdminTokenObtainPairView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('create_employee/', CreateEmployeeView.as_view(), name='create_employee'),

    # JWT for employee login
    path('token/employee/', EmployeeTokenObtainPairView.as_view(), name='token_employee'),

    # JWT for admin login
    path('token/admin/', AdminTokenObtainPairView.as_view(), name='admin_token_obtain_pair'),

    # JWT refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
