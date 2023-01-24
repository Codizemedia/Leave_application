import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('uid') != null) {
      console.log("see uid", localStorage.getItem('uid'))
      // this.routes.navigate(['/'])
      return true;
    } else {
      this.routes.navigate(['/authentication/login']);
      return false;
    }
  }
}
