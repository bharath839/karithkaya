import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class NormalGuard  {
  constructor(private login: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('NormalGuard: Checking canActivate...');
    const isLoggedIn = this.login.isLoggedIn();
    const userRole = this.login.getUserRole();
    console.log('NormalGuard: isLoggedIn:', isLoggedIn);
    console.log('NormalGuard: userRole:', userRole);

    if (isLoggedIn && userRole == 'NORMAL') {
      console.log('NormalGuard: Access granted.');
      return true;
    }

    console.log('NormalGuard: Access denied. Redirecting to login.');
    this.router.navigate(['login']);
    return false;
  }
}
