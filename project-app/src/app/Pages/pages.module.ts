import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Components/Task-list/task-list.component';
import { AddtaskComponent } from './Components/Adding-task/addtask.component';
import { EditTaskComponent } from './Components/Edittask/Edittask.component';

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
      {
        path: 'Edittask',
        component: EditTaskComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
