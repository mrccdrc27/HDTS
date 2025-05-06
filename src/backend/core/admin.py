from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.mail import send_mail
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import Employee

# Custom form for creating users
class EmployeeCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = Employee
        fields = (
            'email', 'first_name', 'last_name', 'middle_name',
            'suffix', 'company_id', 'department', 'role', 'status', 'image',
        )

    def clean_password2(self):
        pw1 = self.cleaned_data.get("password1")
        pw2 = self.cleaned_data.get("password2")
        if pw1 and pw2 and pw1 != pw2:
            raise forms.ValidationError("Passwords don't match.")
        return pw2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

# Custom form for updating users
class EmployeeChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = Employee
        fields = (
            'email', 'password', 'first_name', 'last_name', 'middle_name',
            'suffix', 'company_id', 'department', 'role', 'status', 'notified', 'image',
        )

    def clean_password(self):
        return self.initial["password"]

# Register the custom admin
@admin.register(Employee)
class EmployeeAdmin(UserAdmin):
    add_form = EmployeeCreationForm
    form = EmployeeChangeForm
    model = Employee

    list_display = (
        'email', 'first_name', 'last_name', 'company_id',
        'department', 'role', 'status', 'notified'
    )
    list_filter = ('department', 'role', 'status', 'notified')
    search_fields = ('email', 'first_name', 'last_name', 'company_id')
    ordering = ('email',)

    fieldsets = (
        (None, {
            'fields': (
                'email', 'password', 'first_name', 'last_name', 'middle_name',
                'suffix', 'company_id', 'department', 'role', 'status', 'notified', 'image',
            )
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'password1', 'password2', 'first_name', 'last_name',
                'middle_name', 'suffix', 'company_id', 'department', 'role',
                'status', 'image'
            ),
        }),
    )

    def save_model(self, request, obj, form, change):
        if change:
            previous = Employee.objects.get(pk=obj.pk)
            if (
                previous.status != 'Approved' and
                obj.status == 'Approved' and
                not obj.notified
            ):
                send_mail(
                    subject='Account Approved',
                    message='Your account has been approved. You may now log in.',
                    from_email='sethpelagio20@gmail.com',
                    recipient_list=[obj.email],
                    fail_silently=False,
                )
                obj.notified = True
        super().save_model(request, obj, form, change)
