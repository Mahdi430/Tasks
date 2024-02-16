import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StoragetasksService } from '../../Pages/Services/storage/storagetasks.service';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../Pages/Components/TaskInterface/task.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterOutlet, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private storage: StoragetasksService) {}

  route(url: string) {
    this.router.navigateByUrl(url);
  }
}
