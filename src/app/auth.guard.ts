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
    console.log("checking...")
    if (localStorage.getItem('username') != null) {
      console.log("authenticated")
      return true;
    } else {
      console.log("going to login ...")
      this.routes.navigate(['/authentication/login']);
      return false;
    }
  }
}
