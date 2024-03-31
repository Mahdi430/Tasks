import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Inject, Injectable, NgModule, computed, signal } from '@angular/core';

import { ReplaySubject, tap } from 'rxjs';
import { Task } from '../../Components/TaskInterface/task.model';
import { TEST_STORE, Test1Store } from '../../Store/test.store';
import { Store1Repository } from '../../Store/test1.repository';

@Injectable({
  providedIn: 'root',
})
export class StoragetasksService {
  tasks: Task[] = [];
  posted = false;

  tasksUsingSubject$ = new ReplaySubject<Task[]>();

  constructor(private http: HttpClient, private store: Store1Repository) {}

  Updatetasks(tasks: Task[]) {
    this.http
      .put<Task[]>(
        'https://taskmanager-27bc0-default-rtdb.firebaseio.com/tasks.json',
        tasks
      )
      .subscribe((response) => {
        console.log('Posting', response);
      });
    this.posted = true;
  }

  fetchUsingObservables() {
    return this.http
      .get<Task[]>(
        'https://taskmanager-27bc0-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        tap((response) => {
          this.tasks = response || [];
          console.log('BAtata', response);

          this.store.updateTest1(this.tasks);
          this.tasksUsingSubject$.next(this.tasks);
        })
      );
  }
  Savevlaues(tasks: Task[]) {
    this.tasksUsingSubject$.next(tasks);
  }

  onAddTask(newTask: Task) {
    if (
      (newTask.title.trim() !== '' &&
        newTask.description?.trim() !== '' &&
        newTask.id !== 0 &&
        newTask.id === this.tasks.length + 1) ||
      this.tasks[0].id > newTask.id
    ) {
      this.tasks.push({ ...newTask });
      this.Updatetasks(this.tasks);
    } else if (newTask.title.trim() === '') {
      console.log('trim');
      // alert('error in title');
      // alert('Error in inputs');
      newTask.title = '';
    } else if (newTask.description?.trim() === '') {
      console.log('trim2');
      alert('error in descripton');
      newTask.description = '';
    } else if (newTask.id === 0) {
      newTask.id = 0;
      console.log('id=0');
      alert('error cannot be 0');
    } else if (newTask.id !== this.tasks.length + 1) {
      console.log('length');
      alert('error in id');
    } else {
      console.log('none');
    }
  }
}
