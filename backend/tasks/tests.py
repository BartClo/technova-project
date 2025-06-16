from django.test import TestCase
from .models import Task

class TaskModelTest(TestCase):
    def test_create_task(self):
        task = Task.objects.create(
            title="Test",
            description="Desc",
            status="pendiente",
            priority="media",
            created_at="2025-06-16",
            due_date="2025-06-20"
        )
        self.assertEqual(task.title, "Test")
