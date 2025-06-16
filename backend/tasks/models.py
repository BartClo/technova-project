from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('en progreso', 'En progreso'),
        ('completada', 'Completada'),
    ]
    PRIORITY_CHOICES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendiente')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='media')
    created_at = models.DateField()
    due_date = models.DateField()
