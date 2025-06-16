from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate(self, data):
        if data['due_date'] < data['created_at']:
            raise serializers.ValidationError("La fecha de vencimiento debe ser posterior a la de creación.")
        return data