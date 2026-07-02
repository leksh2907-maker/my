from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project, ContactMessage


def home(request):
    """
    Renders the single-page portfolio (index.html).
    Passes all Project records from MySQL to the template so the
    Projects section can be built dynamically.
    Also handles the Contact form submission (POST request) so the
    whole site works as one page without needing a page reload/redirect
    for the form.
    """
    if request.method == 'POST':
        # Read the submitted contact form fields
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message_text = request.POST.get('message', '').strip()

        # Basic server-side validation
        if name and email and subject and message_text:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message_text,
            )
            messages.success(request, "Your message has been sent successfully! I'll get back to you soon.")
        else:
            messages.error(request, "Please fill in all fields before submitting.")

        # Redirect after POST (Post/Redirect/Get pattern) to avoid
        # duplicate form submissions on page refresh.
        return redirect('/#contact')

    projects = Project.objects.all()
    context = {
        'projects': projects,
    }
    return render(request, 'index.html', context)