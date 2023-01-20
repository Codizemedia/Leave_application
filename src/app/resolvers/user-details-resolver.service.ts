
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormData } from '../models/application-form.model';
import * as userDetailActions from '../views/store/user-details/user-details.actions';
import { selectUserDetails } from '../views/store/user-details/user-details.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolverService implements Resolve<FormData>{

  constructor(private store: Store) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot)
    : Observable<FormData> {
      return this.store.select(selectUserDetails).pipe(
        first(),
        switchMap((response) => {
          if (response.userDetails == undefined) {
            
            this.store.dispatch(userDetailActions.requestFetchUserDetailsACTION());
          }
          return of(response);
        })
      );
  }
}

