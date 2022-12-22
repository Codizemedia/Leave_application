import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormData } from '../models/application-form.model';
import { selectFormData } from '../views/store/leave-application-form/leave-application-form.selectors';
import * as formDataActions from '../views/store/leave-application-form/leave-application-form.actions';

@Injectable({
  providedIn: 'root'
})
export class FormDataResolverService implements Resolve<FormData>{

  constructor(private store: Store) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
     Observable<FormData> {
      return this.store.select(selectFormData).pipe(
        first(),
        switchMap((response) => {
          // if (response..length == 0) {
          //   this.store.dispatch(categoryActions.requestFetchCategoriesACTION());
          // }
          return of(response);
        })
      );
  }
}

