from django.contrib import admin
from .models import Project, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Project model.
    Lets the site owner add/edit/delete portfolio projects
    from the Django admin panel at /admin/.
    """
    list_display = ('title', 'technologies', 'order', 'created_at')
    list_editable = ('order',)
    search_fields = ('title', 'technologies')
    ordering = ('order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """
    Admin configuration for viewing messages submitted
    through the Contact form.
    """
    list_display = ('name', 'email', 'subject', 'submitted_at')
    search_fields = ('name', 'email', 'subject')
    readonly_fields = ('name', 'email', 'subject', 'message', 'submitted_at')
    ordering = ('-submitted_at',)