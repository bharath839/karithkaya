import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from './config.service';




@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  //current user: which is loggedin
  public getCurrentUser(username) {
    return this.http.get(`${this.configService.api_url}/auth/${username}`);
  }

  //generate token

  public generateToken(loginData: any) {

    
    return this.http.post(`${this.configService.api_url}/auth/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token) {
    localStorage.setItem('token', token);

    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole() {
    let user = this.getUser();
    console.log(user)
    return user.userRoles[0].role.roleId==44?"ADMIN":"NORMAL";
    return user.authorities[0].authority;
  }
}
