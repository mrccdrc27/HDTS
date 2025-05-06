import re
from django.core.exceptions import ValidationError
from django.db import models

class Employee(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    company_id = models.CharField(max_length=6, unique=True)
    
    def clean(self):
        if not re.match(r'^MA\d{4}$', self.company_id):
            raise ValidationError("Company ID must be in the format MA0001 to MA9999")
        super().clean()

    department = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    image = models.ImageField(upload_to='employee_images/', blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    notified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
