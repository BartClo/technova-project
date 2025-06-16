import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService, Task } from './task.service';

type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
type TaskPriority = 'baja' | 'media' | 'alta';

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

  constructor(private router: Router, private taskService: TaskService) {
    this.loadTasks();
  }

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

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: tasks => this.tasks = tasks,
      error: err => alert('Error al cargar tareas: ' + err.message)
    });
  }

  // Agregar o actualizar tarea
  saveTask() {
    if (this.formDueDate < this.formCreatedAt) {
      alert('La fecha de vencimiento debe ser posterior a la de creación.');
      return;
    }

    const task: Task = {
      title: this.formTitle,
      description: this.formDescription,
      status: this.formStatus,
      priority: this.formPriority,
      created_at: this.formCreatedAt,
      due_date: this.formDueDate
    };

    if (this.editingIndex === null) {
      this.taskService.addTask(task).subscribe(() => this.loadTasks());
    } else if (this.tasks[this.editingIndex]?.id) {
      this.taskService.updateTask(this.tasks[this.editingIndex].id!, task).subscribe(() => this.loadTasks());
      this.editingIndex = null;
    }
    this.resetForm();
  }

  // Editar tarea
  editTask(index: number) {
    const t = this.tasks[index];
    this.formTitle = t.title;
    this.formDescription = t.description;
    this.formStatus = t.status as TaskStatus;
    this.formPriority = t.priority as TaskPriority;
    // Las fechas vienen como string 'YYYY-MM-DD', así que las usamos directo
    this.formCreatedAt = t.created_at;
    this.formDueDate = t.due_date;
    this.editingIndex = index;
  }

  // Eliminar tarea
  removeTask(index: number) {
    const task = this.tasks[index];
    if (task?.id) {
      this.taskService.deleteTask(task.id).subscribe(() => this.loadTasks());
    }
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
    if (task.id) {
      this.taskService.updateTask(task.id, task).subscribe(() => this.loadTasks());
    }
  }
  getTimeLeft(dueDate: string): string {
    // dueDate es string 'YYYY-MM-DD'
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = due.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${daysLeft} días, ${hoursLeft} horas, ${minutesLeft} minutos`;
  }

  filterStatus: string = 'todas';
  filterPriority: string = 'todas';
  showForm: boolean = false;

  setFilterStatus(status: string) {
    this.filterStatus = status;
  }

  setFilterPriority(priority: string) {
    this.filterPriority = priority;
  }

  filteredTasks() {
    return this.tasks.filter(task => {
      const statusOk = this.filterStatus === 'todas' || task.status === this.filterStatus;
      const priorityOk = this.filterPriority === 'todas' || task.priority === this.filterPriority;
      return statusOk && priorityOk;
    });
  }
    goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}