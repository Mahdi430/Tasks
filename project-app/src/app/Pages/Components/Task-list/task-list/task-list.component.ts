import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../TaskInterface/task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { StoragetasksService } from '../../../Services/storage/storagetasks.service';
import { LoadedspinerComponent } from '../../loadedspiner/loadedspiner.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, LoadedspinerComponent, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentDate:String=new Date().toLocaleDateString();
 

  constructor(
    private storageservice: StoragetasksService,
    private http: HttpClient
  ) {}
  
  get id(): number[] {
    return Array.from(new Set(this.tasks?.map((task) => task.id)));
  }
  date1(date:Date):String{
   return date.toLocaleString();
  }
  ngOnInit(): void {
    this.storageservice.tasksUsingSubject$.subscribe((tasks: Task[]) => {
      if (tasks) {
        this.tasks = tasks;
      }
    });

    this.storageservice.fetchUsingObservables();
   console.log(this.currentDate);
  }

  tasksById(id: number): Task[] {
    return this.tasks.filter((task: { id: number }) => task.id === id);
  }
  Deletetask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.storageservice.Savevlaues(this.tasks);
    this.storageservice.Updatetasks(this.tasks);
  }
}
