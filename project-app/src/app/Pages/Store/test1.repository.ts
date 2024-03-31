import { Inject, Injectable } from '@angular/core';
import { TEST_STORE, Test1Store } from './test.store';
import { Task } from '../Components/TaskInterface/task.model';
import { StoragetasksService } from '../Services/storage/storagetasks.service';

@Injectable({
  providedIn: 'root',
})
export class Store1Repository {
  constructor(
    @Inject(TEST_STORE)
    private test1Store: Test1Store,
    // private tasksservice:StoragetasksService
  ) {}

  updateTest1(tasks: Task[]){
  
      this.test1Store.update((state) => ({
        ...state,
        tasks
    }))
   
    
  }
}
