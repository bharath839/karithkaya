import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent as UserSidebar } from '../sidebar/sidebar.component'; // Using the alias here

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserSidebar,
  ],
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
