import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  done: boolean;
}

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  newTask = '';
  tasks: Task[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask.trim(), done: false });
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
