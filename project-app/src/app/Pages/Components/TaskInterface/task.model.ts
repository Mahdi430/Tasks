import { Observable } from "rxjs";


export interface Task{
    id: number;
    title:string;
    description?:string;
    dueDate:Date;
  
}