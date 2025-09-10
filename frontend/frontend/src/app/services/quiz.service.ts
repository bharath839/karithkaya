import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient, private configService: ConfigService) {}

  public quizzes() {
    return this._http.get(`${this.configService.api_url}/service2/quiz/getList`);
  }

  //add quiz
  public addQuiz(quiz) {
    return this._http.post(`${this.configService.api_url}/service2/quiz/create`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${this.configService.api_url}/service2/quiz/${qId}`);
  }

  //get the single quiz

  public getQuiz(qId) {
    return this._http.get(`${this.configService.api_url}/service2/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${this.configService.api_url}/service2/quiz/`, quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${this.configService.api_url}/service2/quiz/category/${cid}`);
  }
  //qet active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${this.configService.api_url}/service2/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${this.configService.api_url}/service2/quiz/category/active/${cid}`);
  }
}
