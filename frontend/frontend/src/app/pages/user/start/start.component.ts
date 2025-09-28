import { LocationStrategy, CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log('StartComponent: Initial qid:', this.qid); // Log initial qid
    this.loadQuestions();
    console.log('StartComponent: isSubmit (ngOnInit):', this.isSubmit); // Log initial isSubmit
  }
  loadQuestions() {
    console.log('StartComponent: Loading questions for qid:', this.qid); // Log question loading initiation
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        console.log('StartComponent: Questions loaded:', this.questions); // Log loaded questions
        if (this.questions && this.questions.length > 0) {
          this.timer = this.questions.length * 2 * 60;
          console.log('StartComponent: Timer initialized to:', this.timer); // Log timer value
          this.startTimer();
        } else {
          console.warn('StartComponent: No questions loaded or questions array is empty.');
        }
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
        console.error('StartComponent: Error loading questions:', error); // Log error
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    console.log('StartComponent: evalQuiz() called. Submitting quiz...'); // Log evalQuiz call
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log('StartComponent: Eval Quiz data received:', data); // Log eval quiz data
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
        console.log('StartComponent: isSubmit after evalQuiz:', this.isSubmit); // Log isSubmit after eval
      },
      (error) => {
        console.log(error);
        console.error('StartComponent: Error evaluating quiz:', error); // Log error
      }
    );
  }
}
