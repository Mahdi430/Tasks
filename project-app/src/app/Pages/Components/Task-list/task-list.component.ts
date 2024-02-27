import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../TaskInterface/task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { StoragetasksService } from '../../Services/storage/storagetasks.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditTaskComponent } from '../Edittask/Edittask.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule,EditTaskComponent,MatDialogModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  task!: Task;
  tasks: Task[] = [];
  Editemode=false;

  constructor(
    private storageservice: StoragetasksService,
    private http: HttpClient,
    private router: Router,
    private popup:MatDialog,
  
  ) {}

 ngOnInit(): void {
    this.storageservice.tasksUsingSubject$.subscribe((tasks: Task[]) => {
      if (tasks) {
        this.tasks = tasks;
       
      }
    });

    this.storageservice.fetchUsingObservables();
  }
  get id(): number[] {
    return Array.from(new Set(this.tasks?.map((task) => task.id)));
  }
  tasksById(id: number): Task[] {
    return this.tasks.filter((task: { id: number }) => task.id === id);
  }
  Deletetask(id: number) {
 

    this.tasks = this.tasks.filter((task) => task.id !== id );

    this.storageservice.Savevlaues(this.tasks);
    this.storageservice.Updatetasks(this.tasks);
  }
  Edittask(id: number){
    const taskToEdit = this.tasks.find(task => task.id === id);
     this.Editemode=!this.Editemode;
    if (taskToEdit && this.Editemode) {
      console.log('Task to edit:', taskToEdit);
      this.popup.open(EditTaskComponent, {
        data: { task: taskToEdit }
      
      }) ;
    } else {
      console.error('Task with ID', id, 'not found.');
    }
  
  }
  
}
