import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../../Components/Task-list/task-list/task-list.component';
import { AddtaskComponent } from '../../Components/Adding-task/addtask/addtask.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'AddTask',
        pathMatch: 'full',
      },
      {
        path: 'TaskList',
        component: TaskListComponent,
      },
      {
        path: 'AddTask',
        component: AddtaskComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
