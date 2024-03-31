import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../TaskInterface/task.model';
import { CommonModule } from '@angular/common';
import { StoragetasksService } from '../../Services/storage/storagetasks.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditTaskComponent } from '../Edittask/Edittask.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { test1$ } from '../../Store/test.store';
import { Store1Repository } from '../../Store/test1.repository';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    EditTaskComponent,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  task!: Task;
  subscribe = new Subscription();
  tasks: Task[] = [];
  fetched = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private popup: MatDialog,
    private storage: StoragetasksService,
    private store: Store1Repository
  ) {}

  ngOnInit(): void {
    this.storage.fetchUsingObservables().subscribe();

    test1$.subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks);
      this.tasks.forEach((element) => {
        if (!element) {
          alert('One of the fetched tasks is null !!');
          this.fetched = false;
        }
      });

      this.fetched = true;
    });
    this.storage.Savevlaues(this.tasks);

    if (!this.tasks) {
      this.fetched = false;
    }
  }

  get id(): number[] {
    if (this.tasks) {
      return Array.from(new Set(this.tasks.map((task) => task.id)));
    } else {
      return [];
    }
  }
  tasksById(id: number): Task[] {
    return this.tasks.filter((task: { id: number }) => task.id === id);
  }
  Deletetask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.storage.Updatetasks(this.tasks);
    this.store.updateTest1(this.tasks);
  }
  Edittask(id: number) {
    const taskToEdit = this.tasks.find((task) => task.id === id);

    if (taskToEdit) {
      console.log('Task to edit:', taskToEdit);
      this.popup.open(EditTaskComponent, {
        data: { task: taskToEdit },
      });
    } else {
      console.error('not found.');
    }
  }
}
