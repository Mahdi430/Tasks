import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Task } from '../TaskInterface/task.model';
import { StoragetasksService } from '../../Services/storage/storagetasks.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddtaskComponent implements OnInit {
  newTask: Task= {
    id: 0,
    title: '',
    description: '',
    dueDate:new Date(),
  };
 
  constructor(private storageservice: StoragetasksService) {}

  ngOnInit(): void {}
  
  onAddTask() {
    console.log(this.newTask);
    this.storageservice.onAddTask(this.newTask);
  }
}
