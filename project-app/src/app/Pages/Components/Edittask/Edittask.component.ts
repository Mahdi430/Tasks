import { Component, Inject, Input, OnInit } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Store1Repository } from '../../Store/test1.repository';
import { test1$ } from '../../Store/test.store';

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
  tasks: Task[] = [];
  constructor(
    private storage: StoragetasksService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private store: Store1Repository,
    private router: Router
  ) {
    this.task = data.task;
  }

  ngOnInit() {
    test1$.subscribe((response) => {
      this.tasks = response;
      console.log('inEdit:', this.tasks);
    });

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

    let updatedTasks = this.tasks.map((t) =>
      t.id === this.task.id ? updatedTask : t
    );
    this.storage.Updatetasks(updatedTasks);
    console.log('tttt', this.storage.posted);
    if (this.storage.posted) {
      this.store.updateTest1(updatedTasks);
    }

    this.dialogRef.close('Saved');
  }

  cancelEdit() {
    console.log('Editing cancelled');
    this.dialogRef.close('Canceled');
    this.router.navigate(['Tasklist']);
  }
}
