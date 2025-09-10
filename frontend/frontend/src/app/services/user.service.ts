import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${this.configService.api_url}/auth/register`, user);
  }

public getVersion(){
  return this.http.get(`${this.configService.api_url}/auth/version`);
}



public  getBgColours(){

  return this.http.get(`${this.configService.image_url}/images`,{ responseType: 'text' }); 
}

public selectColor(color:any){
 return this.http.put(`${this.configService.image_url}/images/activate/`+color,color);
}

public getActiveColor(){
  return this.http.get(`${this.configService.image_url}/images/a`,{ responseType: 'text' }); 
}

public addColor(data:any){
  return this.http.post(`${this.configService.image_url}/images`,data,{ responseType: 'text' });
}

}
