import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient, private configService: ConfigService) {}
  //load all the cateogries
  public categories() {
    return this._http.get(`${this.configService.api_url}/service1/category/getList`);
  }

  //add new category
  public addCategory(category) {
    return this._http.post(`${this.configService.api_url}/service1/category/create`, category);
  }
}
