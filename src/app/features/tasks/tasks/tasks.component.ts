import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
type TaskPriority = 'baja' | 'media' | 'alta';

interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate: Date;
}

function parseDateFromInput(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // El mes en JS es base 0
}

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})


export class TasksComponent {
  tasks: Task[] = [];
  editingIndex: number | null = null;

  // Form fields
  formTitle = '';
  formDescription = '';
  formStatus: TaskStatus = 'pendiente';
  formPriority: TaskPriority = 'media';
  formCreatedAt: string = '';
  formDueDate: string = '';

  private parseDateFromInput(dateString: string): Date {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // Agregar o actualizar tarea
  saveTask() {
    const task: Task = {
      title: this.formTitle,
      description: this.formDescription,
      status: this.formStatus,
      priority: this.formPriority,
      createdAt: parseDateFromInput(this.formCreatedAt),
      dueDate: parseDateFromInput(this.formDueDate)
    };

    if (this.editingIndex === null) {
      this.tasks.push(task);
    } else {
      this.tasks[this.editingIndex] = task;
      this.editingIndex = null;
    }
    this.resetForm();
  }

  // Editar tarea
  editTask(index: number) {
    const t = this.tasks[index];
    this.formTitle = t.title;
    this.formDescription = t.description;
    this.formStatus = t.status;
    this.formPriority = t.priority;
    this.formCreatedAt = t.createdAt.toISOString().substring(0, 10);
    this.formDueDate = t.dueDate.toISOString().substring(0, 10);
    this.editingIndex = index;
  }

  // Eliminar tarea
  removeTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editingIndex === index) {
      this.resetForm();
      this.editingIndex = null;
    }
  }

  // Limpiar formulario
  resetForm() {
    this.formTitle = '';
    this.formDescription = '';
    this.formStatus = 'pendiente';
    this.formPriority = 'media';
    this.formCreatedAt = '';
    this.formDueDate = '';
  }
  toggleStatus(index: number) {
    const task = this.tasks[index];
    if (task.status === 'pendiente') {
      task.status = 'en progreso';
    } else if (task.status === 'en progreso') {
      task.status = 'completada';
    } else {
      task.status = 'pendiente';
    }
  }
  getTimeLeft(dueDate: Date): string {
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${daysLeft} días, ${hoursLeft} horas, ${minutesLeft} minutos`;
  }
  
}