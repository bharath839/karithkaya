import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FlagsUiService } from 'src/app/flags-ui.service'; // Import FlagsUiService

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class SidebarComponent implements OnInit {
  categories;
  backgroundColor: string = 'pink'; // Initialize with a default color

  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private flagService: FlagsUiService) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );

    this.flagService.getcolor.subscribe(
      (data: any) => {
        if (data && data.color) {
          this.backgroundColor = data.color;
        }
      }
    );
  }
}
