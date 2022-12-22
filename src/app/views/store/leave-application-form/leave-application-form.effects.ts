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
    private fireStore: AngularFirestore) {}

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

    
  selectCaategoryEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(formDataActions.requestSelectFormDataACTION),
        switchMap((response:any) => {
          console.log("see effect response", response)
          return [
            formDataActions.successSelectFormDataACTION(response),
          ];
        }),
        catchError((error: Error) => {
          console.log('Fetch Error: ', error);
          return of(formDataActions.onFormDataFailure({ error: error }));
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
              return formDataActions.successAddFormDataACTION();
            })
            .catch((error) => {
              console.log('Add Error: ', error);
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
            .collection('form_data')
            .doc(data.id)
            .update(data.payload)
            .then(() => {
              return formDataActions.successUpdateFormDataACTION();
            })
            .catch((error) => {
              console.log('Update Error: ', error);
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
            .collection('form_data')
            .doc(docID.payload)
            .delete()
            .then(() => {
              return formDataActions.successDeleteFormDataACTION();
            })
            .catch((error) => {
              console.log('Delete Error: ', error);
              return formDataActions.onFormDataFailure({ error: error });
            });
        })
      )
    );
}
