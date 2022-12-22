import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as formDataActions from './leave-application-form.actions'



@Injectable()
export class LeaveApplicationFormEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,) {}

    fetchFormDataEFFECT$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(formDataActions.requestFetchFormDataACTION),
        switchMap(() => {
          return this.fireStore
            .collection('form_data')
            .valueChanges({ idField: 'id' })
            .pipe(
              switchMap((response) => {
                return [formDataActions.successFetchFormDataACTION({
                    payload: response,
                  })];
              
              }),
              catchError((error: Error) => {
                console.log('Fetch Error: ', error);
                return of(formDataActions.onFormDataFailure({ error: error }));
              })
            );
        })
      )
    );

    addFormDataEFFECT$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(formDataActions.requestAddFormDataACTION),
        switchMap((data) => {
          return this.fireStore
            .collection('form_data')
            .add(data.payload)
            .then(() => {
              // this.sharedService.openSnackBar('Category added successfuly', 'Ok');
              return formDataActions.successAddFormDataACTION();
            })
            .catch((error) => {
              console.log('Add Error: ', error);
              // this.sharedService.openSnackBar('Failed adding category', 'Ok');
              return formDataActions.onFormDataFailure({ error: error });
            });
        })
      );
    });

    updateUpdateEffect$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(formDataActions.requestUpdateFormDataACTION),
        switchMap((data) => {
          return this.fireStore
            .collection('categories')
            .doc(data.id)
            .update(data.payload)
            .then(() => {
              // this.sharedService.openSnackBar('Category updated successfuly','Ok');
              return formDataActions.successUpdateFormDataACTION();
            })
            .catch((error) => {
              console.log('Update Error: ', error);
              // this.sharedService.openSnackBar('Failed updating category', 'Ok');
              return formDataActions.onFormDataFailure({ error: error });
            });
        })
      )
    );

    deleteFormDataEFFEET$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(formDataActions.requestDeleteFormDataACTION),
        switchMap((docID) => {
          return this.fireStore
            .collection('categories')
            .doc(docID.payload)
            .delete()
            .then(() => {
              // this.sharedService.openSnackBar( 'Category deleted successfuly', 'Ok');
              return formDataActions.successDeleteFormDataACTION();
            })
            .catch((error) => {
              console.log('Delete Error: ', error);
              // this.sharedService.openSnackBar('Failed deleting category', 'Ok');
              return formDataActions.onFormDataFailure({ error: error });
            });
        })
      )
    );
}
