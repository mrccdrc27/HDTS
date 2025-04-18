from django.urls import path
from . import views

urlpatterns = [
    path('api/employees/register/', views.register_employee, name='register_employee'),
    path('api/employees/login/', views.employee_login, name='employee_login'),
]
