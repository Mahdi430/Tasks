import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { TaskListComponent } from '../../../Pages/Components/Task-list/task-list/task-list.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,TaskListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
constructor(){
   
}

}
