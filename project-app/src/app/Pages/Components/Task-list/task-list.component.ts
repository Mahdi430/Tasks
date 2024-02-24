import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../TaskInterface/task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { StoragetasksService } from '../../Services/storage/storagetasks.service';

import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  Editemode=false;

  constructor(
    private storageservice: StoragetasksService,
    private http: HttpClient,
    private router: Router
  ) {}

  get id(): number[] {
    return Array.from(new Set(this.tasks?.map((task) => task.id)));
  }

  ngOnInit(): void {
    this.storageservice.tasksUsingSubject$.subscribe((tasks: Task[]) => {
      if (tasks) {
        this.tasks = tasks;
      }
    });

    this.storageservice.fetchUsingObservables();
  
  }

  tasksById(id: number): Task[] {
    return this.tasks.filter((task: { id: number }) => task.id === id);
  }
  Deletetask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.storageservice.Savevlaues(this.tasks);
    this.storageservice.Updatetasks(this.tasks);
  }
  Edittask(id:number){
 
   this.Editemode=!this.Editemode;
   if(this.Editemode){
    this.router.navigate(['Edittask']);
    
   }
  }
}
