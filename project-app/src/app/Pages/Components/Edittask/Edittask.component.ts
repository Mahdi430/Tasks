import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import { StoragetasksService } from "../../Services/storage/storagetasks.service";
import { Task } from "../TaskInterface/task.model";
@Component({
    selector:'edit-task-app',
    standalone:true,
    imports:[CommonModule,FormsModule,MatInputModule],
   templateUrl:'./Edittask.component.html',
   styleUrl:'./Edittask.component.css'
})
export class EdittaskComponent implements OnInit{
    task:Task={
        id: 0,
        title: "",
        description:'',
        dueDate: new Date()
    }
    constructor(private storage:StoragetasksService){

    }
    ngOnInit(){
      
        this.task=this.storage.edittask
    
    }

}