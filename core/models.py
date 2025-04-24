import os
import re
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

# 🛡 Image Validators
def validate_image_size(image):
    max_mb = 2
    if image.size > max_mb * 1024 * 1024:
        raise ValidationError(f"Image must be smaller than {max_mb}MB.")

def validate_image_extension(image):
    ext = os.path.splitext(image.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png']
    if ext not in valid_extensions:
        raise ValidationError("Image must be a .jpg, .jpeg, or .png file.")

# ✉️ Gmail Email Validator
def validate_gmail_email(value):
    if not value.lower().endswith('@gmail.com'):
        raise ValidationError("Only Gmail addresses are allowed.")
    
def validate_roman_suffix(value):
    if value and not re.match(r"^(Jr|Sr|II|III|IV|V|VI|VII|VIII|IX|X)$", value):
        raise ValidationError("Invalid suffix. Only Jr, Sr, or Roman numerals (II–X) are allowed.")

DEPARTMENT_CHOICES = [
    ("IT Department", "IT Department"),
    ("Asset Management", "Asset Management"),
    ("Document Control", "Document Control"),
    ("Finance & Budgeting", "Finance & Budgeting"),
    ("Operations", "Operations"),
    ("Facilities & Maintenance", "Facilities & Maintenance"),
    ("Human Resources", "Human Resources"),
    ("Administration", "Administration"),
]

STATUS_CHOICES = [
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
]

ROLE_CHOICES = [
    ("IT Department", "IT Department"),
    ("Asset Management", "Asset Management"),
    ("Document Control", "Document Control"),
    ("Finance & Budgeting", "Finance & Budgeting"),
    ("Operations", "Operations"),
    ("Facilities & Maintenance", "Facilities & Maintenance"),
    ("Human Resources", "Human Resources"),
    ("Administration", "Administration"),
]

USERROLE_CHOICES = [
    ("Employee", "Employee"),
    ("Ticket Agent", "Ticket Agent"),
    ("System Admin", "System Admin"),
]

class Employee(models.Model):

    # 📋 Status (default: pending)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="pending",
        help_text="Approval status of the employee"
    )

    # 📢 Track if approval email has already been sent
    notified = models.BooleanField(
        default=False,
        help_text="Marks if approval email has been sent to this employee"
    )

    # 🎓 Suffix (optional)
    suffix = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        validators=[validate_roman_suffix],
        help_text="Optional. Must be Jr, Sr, or Roman numeral suffix like II–X"
    )

    # 🆔 Company ID (e.g., MA0001 to MA9999)
    company_id = models.CharField(
        max_length=6,
        unique=True,
        validators=[
            RegexValidator(
                regex=r"^MA[0-9]{4}$",
                message="Company ID format is invalid. Please enter a number like 0001"
            )
        ],
        help_text="Format: MA0001 to MA9999"
    )

    department = models.CharField(
        max_length=50,
        choices=DEPARTMENT_CHOICES,
        help_text="Select a department from the predefined list."
    )

    # 📇 Name fields
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)

    # 🖼️ Required employee photo
    image = models.ImageField(
        upload_to='employees/',
        validators=[validate_image_size, validate_image_extension],
        help_text="Required. Upload a 1x1 photo (JPG or PNG), max 2MB, white background"
    )

    # 📧 Gmail-only email
    email = models.EmailField(
        unique=True,
        validators=[validate_gmail_email],
        help_text="Only Gmail addresses are allowed"
    )

    # 🔐 Password (you can hash this later)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    userrole = models.CharField(
        max_length=20,
        choices=USERROLE_CHOICES,
        default="Employee",  # new signups default to Employee
        help_text="Defines the role of the user"
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(department__in=[d[0] for d in DEPARTMENT_CHOICES]),
                name='valid_department_constraint'
            )
        ]

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(userrole__in=["Employee", "Ticket Agent", "System Admin"]),
                name="valid_userrole_constraint"
            )
        ]
