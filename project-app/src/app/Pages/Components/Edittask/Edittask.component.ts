import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StoragetasksService } from '../../Services/storage/storagetasks.service';
import { Task } from '../TaskInterface/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-task-app',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './Edittask.component.html',
  styleUrl: './Edittask.component.css',
})
export class EditTaskComponent implements OnInit {
  @Input() task!: Task;
  taskForm!: FormGroup;

  constructor(
    private storage: StoragetasksService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    public dialogRef: MatDialogRef<EditTaskComponent>
  ) {
    this.task = data.task;
  }

  ngOnInit() {
    if (this.data.task) {
      this.taskForm = this.fb.group({
        title: [this.data.task.title],
        description: [this.data.task.description],
        dueDate: [this.data.task.dueDate],
      });
    } else {
      console.error('Task object is undefined or null.');
    }
  }
  saveTaskChanges() {
    const updatedTask = { ...this.task, ...this.taskForm.value };
    console.log('Saving task changes:', updatedTask);

    const updatedTasks = this.storage.tasks.map((t) =>
      t.id === this.task.id ? updatedTask : t
    );
    this.storage.Savevlaues(updatedTasks);
    this.storage.Updatetasks(updatedTasks);
    this.dialogRef.close('Saved');
  }

  cancelEdit() {
    console.log('Editing cancelled');
   this.dialogRef.close('Canceled');
  }
}
