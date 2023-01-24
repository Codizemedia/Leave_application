import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userDetailActions from '../views/store/user-details/user-details.actions';
import { selectUserDetails } from '../views/store/user-details/user-details.selectors';
@Injectable({
  providedIn: 'root'
})

export class UserRoleGuard implements CanActivate {

  constructor(
    private routes: Router,
    private store: Store) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   this.store.select(selectUserDetails).subscribe((response: any)=>{
    console.log('see user role response', response)
   })
    if (localStorage.getItem('uid') != null) {
      // this.routes.navigate(['/'])
      return true;
    } else {
      console.log("going to login ...")
      this.routes.navigate(['/authentication/login']);
      return false;
    }
  }
}