from django.db import models


class Project(models.Model):
    """
    Represents a single project to showcase in the Projects section.
    Each project is stored in the MySQL database and rendered dynamically
    on the home page.
    """
    title = models.CharField(max_length=100)
    description = models.TextField()
    # Comma-separated list of technologies, e.g. "Django, MySQL, JavaScript"
    technologies = models.CharField(max_length=200)
    github_link = models.URLField(max_length=300, blank=True, null=True)
    live_demo = models.URLField(max_length=300, blank=True, null=True)
    # Controls display order on the site (lower numbers appear first)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def technology_list(self):
        """Return technologies as a clean Python list for template looping."""
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]


class ContactMessage(models.Model):
    """
    Stores messages submitted through the Contact section form.
    Every submission is saved into MySQL so it can be reviewed in
    the Django admin panel.
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.subject} - {self.name}"