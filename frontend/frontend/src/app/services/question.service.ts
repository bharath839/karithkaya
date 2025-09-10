import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient, private configService: ConfigService) {}

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${this.configService.api_url}/service1/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${this.configService.api_url}/service1/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question) {
    return this._http.post(`${this.configService.api_url}/service1/question/`, question);
  }
  //delete question
  public deleteQuestion(questionId) {
    return this._http.delete(`${this.configService.api_url}/service1/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions) {
    return this._http.post(`${this.configService.api_url}/service1/question/eval-quiz`, questions);
  }
}
