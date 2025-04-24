from django.contrib import admin
from django.core.mail import send_mail
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "company_id", "department", "userrole", "status", "notified")

    def save_model(self, request, obj, form, change):
        # ✅ Always run this after saving
        super().save_model(request, obj, form, change)

        # 🧠 Check if this employee is approved and not notified
        if obj.status == "approved" and not obj.notified:
            try:
                print(f"✅ Sending approval email to {obj.email}...")

                send_mail(
                    subject="Your SmartSupport account has been approved",
                    message=f"Hi {obj.first_name},\n\nYour account has been approved. You can now log in to the system.",
                    from_email="sethpelagio20@gmail.com",  # same as EMAIL_HOST_USER
                    recipient_list=[obj.email],
                    fail_silently=False,
                )

                obj.notified = True
                obj.save()
                print("✅ Email sent and employee marked as notified.")
            except Exception as e:
                print(f"❌ Failed to send email to {obj.email}: {e}")
