import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable, NgModule, computed, signal } from '@angular/core';

import { ReplaySubject, } from 'rxjs';
import { Task } from '../../Components/TaskInterface/task.model';


@Injectable({
  providedIn: 'root',
})
export class StoragetasksService {
  tasks: Task[] = [];

  tasksUsingSubject$ = new ReplaySubject<Task[]>();

  constructor(private http: HttpClient) {}

  get id(): number[] {
    if (!this.tasks) {
      return []; // Return an empty array if tasks are not available
    }
    return Array.from(new Set(this.tasks.map((tasks) => tasks.id)));
  }

  Updatetasks(tasks: Task[]) {
    this.http
      .put<Task[]>(
        'https://taskmanager-27bc0-default-rtdb.firebaseio.com/tasks.json',
        tasks
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchUsingObservables() {
    return this.http
      .get<Task[]>(
        'https://taskmanager-27bc0-default-rtdb.firebaseio.com/tasks.json'
      )
      .subscribe((response) => {
        console.log('BAtata', response);
        this.tasks = response || [];
        this.tasksUsingSubject$.next(this.tasks);
      });
  }
  Savevlaues(tasks: Task[]) {
    this.tasksUsingSubject$.next(tasks);
  }

  onAddTask(newTask: Task) {
    if (
      newTask.title.trim() !== '' &&
      newTask.description?.trim() !== '' &&
      newTask.id !== 0 &&
      newTask.id === this.tasks.length + 1
    ) {
      this.tasks.push({ ...newTask });
      this.Updatetasks(this.tasks);
    } else if( newTask.title.trim() === '') {
      console.log('trim')
      alert('error in title');
      // alert('Error in inputs');
      newTask.title = '';
    }
    else if(newTask.description?.trim() === ''){
      console.log('trim2');
      alert('error in descripton');
      newTask.description = '';
      
    }
    else if(  newTask.id === 0){
      newTask.id = 0;
      console.log('id=0');
      alert('error cannot be 0');
      
      
    }
    else if(newTask.id !== this.tasks.length + 1){
      console.log('length');
      alert('error in id');
    }
    else{
      console.log('none')
    }
   
  
    
    
  }

 
}
