import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('../tasks/tasks.routes').then(m => m.TASKS_ROUTES)
      }
    ]
  }
];
