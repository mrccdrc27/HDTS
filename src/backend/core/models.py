import re
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError

SUFFIX_CHOICES = [
    ('Jr.', 'Jr.'), ('Sr.', 'Sr.'), ('III', 'III'), ('IV', 'IV'), ('V', 'V'),
    ('VI', 'VI'), ('VII', 'VII'), ('VIII', 'VIII'), ('IX', 'IX'), ('X', 'X'),
]

DEPARTMENT_CHOICES = [
    ('IT Department', 'IT Department'),
    ('Asset Management', 'Asset Management'),
    ('Document Control', 'Document Control'),
    ('Finance & Budgeting', 'Finance & Budgeting'),
    ('Operations', 'Operations'),
    ('Facilities & Maintenance', 'Facilities & Maintenance'),
    ('Human Resources', 'Human Resources'),
    ('Administration', 'Administration'),
]

ROLE_CHOICES = [
    ('Employee', 'Employee'),
    ('Ticket Agent', 'Ticket Agent'),
    ('System Admin', 'System Admin'),
]

STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('Approved', 'Approved'),
    ('Denied', 'Denied'),
]

class EmployeeManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault("notified", True)
        return self.create_user(email, password, **extra_fields)

class Employee(AbstractBaseUser, PermissionsMixin):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    suffix = models.CharField(max_length=10, blank=True, null=True, choices=SUFFIX_CHOICES)
    company_id = models.CharField(max_length=6, unique=True)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    image = models.ImageField(upload_to='employee_images/', blank=True, null=True)

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    notified = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['last_name', 'first_name', 'company_id']

    objects = EmployeeManager()

    last_login = None  # Optional: Only include if you do not want login tracking

    def clean(self):
        if not re.match(r'^MA\d{4}$', self.company_id):
            raise ValidationError("Company ID must be in the format MA0001 to MA9999")
        super().clean()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
