from django.contrib import admin
from .models import ContactRequest

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "project_type", "created_at")
    search_fields = ("name", "email")

# Register your models here.
