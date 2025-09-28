import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
  }
}
