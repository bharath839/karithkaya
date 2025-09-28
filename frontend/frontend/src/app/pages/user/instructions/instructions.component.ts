import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class InstructionsComponent implements OnInit {
  qid;
  quiz;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    console.log('InstructionsComponent: Quiz ID from route (ngOnInit):', this.qid); // Log qid

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log('InstructionsComponent: Quiz data loaded (ngOnInit):', this.quiz); // Log quiz data
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz() {
    console.log('InstructionsComponent: === startQuiz() method entered ==='); // NEW LOG
    console.log('InstructionsComponent: Navigating directly with qid:', this.qid); // NEW LOG

    // Temporarily bypass SweetAlert2 to test direct navigation
    this._router.navigate(['/start/' + this.qid]);

    // Original SweetAlert2 code (now commented out)
    // Swal.fire({
    //   title: 'Do you want to start the quiz?',
    //   showCancelButton: true,
    //   confirmButtonText: `Start`,
    //   denyButtonText: `Don't save`,
    //   icon: 'info',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     console.log('InstructionsComponent: Confirming navigation to /start/' + this.qid);
    //     this._router.navigate(['/start/' + this.qid]);
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info');
    //   }s
    // });
  }
}
