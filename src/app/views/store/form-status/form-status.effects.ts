

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as fromStatusActions from './form-status.actions';



@Injectable()
export class FormStatusEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore) {}

    fetchEFFECT$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(fromStatusActions.requestFetchFormStatusACTION),
        switchMap(() => {
          return this.fireStore
            .collection('form_status')
            .valueChanges({ idField: 'id' })
            .pipe(
              switchMap((response) => {
                const returnResponse = response.filter((data:any)=>{
                  return data.status != "done";
                })
                return [fromStatusActions.successFetchFormStatusACTION({
                    payload: response,
                })];
              }),
              catchError((error: Error) => {
                console.log('Fetch Error: ', error);
                return of(fromStatusActions.onFormStatusaFailure({ error: error }));
              })
            );
        })
      )
    );

    selectEFFECT$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(fromStatusActions.requestSelectFormStatusACTION),
          switchMap((response:any) => {
            return [
              fromStatusActions.successSelectFormStatusACTION(response),
            ];
          }),
          catchError((error: Error) => {
            console.log('Fetch Error: ', error);
            return of(fromStatusActions.onFormStatusaFailure({ error: error }));
          })
      )
    );

    addEFFECT$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(fromStatusActions.requestAddFormStatusACTION),
        switchMap((data) => {
          console.log("see add data", data)
          return this.fireStore
            .collection('form_status')
            .add(data.payload)
            .then(() => {
              return fromStatusActions.successAddFormStatusACTION();
            })
            .catch((error) => {
              console.log('Add Error: ', error);
              return fromStatusActions.onFormStatusaFailure({ error: error });
            });
        })
      );
    });

    updateEffect$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(fromStatusActions.requestUpdateFormStatusACTION),
        switchMap((data) => {
          console.log("see update data", data)
          return this.fireStore
            .collection('form_status')
            .doc(data.id)
            .update(data.payload)
            .then(() => {
              return fromStatusActions.successUpdateFormStatusACTION();
            })
            .catch((error) => {
              console.log('Update Error: ', error);
              return fromStatusActions.onFormStatusaFailure({ error: error });
            });
        })
      )
    );

    deleteEFFEET$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(fromStatusActions.requestDeleteFormStatusACTION),
        switchMap((docID) => {
          return this.fireStore
            .collection('form_status')
            .doc(docID.payload)
            .delete()
            .then(() => {
              return fromStatusActions.successDeleteFormStatusACTION();
            })
            .catch((error) => {
              console.log('Delete Error: ', error);
              return fromStatusActions.onFormStatusaFailure({ error: error });
            });
        })
      )
    );
}


