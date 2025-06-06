import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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

  public tasks = [
    { title: 'Tarea 1', completed: false },
    { title: 'Tarea 2', completed: true },
    { title: 'Tarea 3', completed: false },
    { title: 'Tarea 4', completed: true },
    { title: 'Tarea 5', completed: true },
  ];

  get pendingTasksCount() {
    return this.tasks.filter(t => !t.completed).length;
  }

  get completedTasksCount() {
    return this.tasks.filter(t => t.completed).length;
  }

  public barChartData: ChartData<'bar'> = {
    labels: ['Pendientes', 'Completadas'],
    datasets: [
      {
        label: 'Tareas',
        data: [0, 0], // Se actualizará en ngOnInit
        backgroundColor: ['#f59e0b', '#10b981'],
        borderRadius: 8,
      },
    ],
  };

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    this.barChartData.datasets[0].data = [
      this.pendingTasksCount,
      this.completedTasksCount,
    ];
  }
}
