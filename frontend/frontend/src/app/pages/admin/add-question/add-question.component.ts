import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CKEditorModule,
  ],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId;
  qTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {
    console.log('AddQuestionComponent: Form submission initiated.');
    console.log('Question data (before validation):', this.question);

    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open('Question content is required !!', '', { duration: 3000 });
      console.warn('AddQuestionComponent: Validation failed - content missing.');
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open('Option 1 is required !!', '', { duration: 3000 });
      console.warn('AddQuestionComponent: Validation failed - option1 missing.');
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open('Option 2 is required !!', '', { duration: 3000 });
      console.warn('AddQuestionComponent: Validation failed - option2 missing.');
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snack.open('Answer is required !!', '', { duration: 3000 });
      console.warn('AddQuestionComponent: Validation failed - answer missing.');
      return;
    }

    //form submit
    console.log('AddQuestionComponent: Validation passed. Attempting to add question...');
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log('AddQuestionComponent: Question added successfully:', data);
        Swal.fire('Success ', 'Question Added. Add Another one', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        console.error('AddQuestionComponent: Error in adding question:', error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
