import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../../tasks/tasks/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Pendientes', 'Completadas'],
    datasets: [
      {
        label: 'Tareas',
        data: [0, 0],
        backgroundColor: ['#f59e0b', '#10b981'],
        borderRadius: 8,
      },
    ],
  };
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.updateChartData();
      },
    });
  }

  get pendingTasksCount() {
    return this.tasks.filter((t) => t.status !== 'completada').length;
  }

  get completedTasksCount() {
    return this.tasks.filter((t) => t.status === 'completada').length;
  }

  get totalTasks() {
    return this.tasks.length;
  }

  get completedPercentage() {
    return this.totalTasks === 0
      ? 0
      : Math.round((this.completedTasksCount / this.totalTasks) * 100);
  }

  get pendingPercentage() {
    return this.totalTasks === 0
      ? 0
      : Math.round((this.pendingTasksCount / this.totalTasks) * 100);
  }

  updateChartData() {
    this.barChartData.datasets[0].data = [
      this.pendingTasksCount,
      this.completedTasksCount,
    ];
  }

  exportChart() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'informe-tareas.png';
      link.click();
    }
  }
}
