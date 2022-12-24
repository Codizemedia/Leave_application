// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FormStatusResolverService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormData } from '../models/application-form.model';
import { selectFormStatus } from '../views/store/form-status/form-status.selectors';
import * as formStatusActions from '../views/store/form-status/form-status.actions';

@Injectable({
  providedIn: 'root'
})
export class FormStatusResolverService implements Resolve<FormData>{

  constructor(private store: Store) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
     Observable<FormData> {
      return this.store.select(selectFormStatus).pipe(
        first(),
        switchMap((response) => {
          if (response.userDetails == undefined) {
            this.store.dispatch(formStatusActions.requestFetchFormStatusACTION());
          }
          return of(response);
        })
      );
  }
}

