

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as userDetailActions from './user-details.actions';
import { UserDetailsService } from 'src/app/services/user-details.service';



@Injectable()
export class UserDetailsEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private userDetailsService: UserDetailsService,) {}

    fetchEFFECT$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(userDetailActions.requestFetchUserDetailsACTION),
        switchMap(() => {
          return this.fireStore
            .collection('user_details')
            .valueChanges({ idField: 'id' })
            .pipe(
              switchMap((response: any) => {
                const returnResponse = response.filter((data:any)=>{
                  return data.uid == localStorage.getItem("uid")
                })
                this.userDetailsService.userDetails = returnResponse[0]; 
                return [userDetailActions.successFetchUserDetailsACTION({
                    payload: returnResponse,
                  })];
              }),
              catchError((error: Error) => {
                console.log('Fetch Error: ', error);
                return of(userDetailActions.onUserDetailsFailure({ error: error }));
              })
            );
        })
      )
    );

    selectEFFECT$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(userDetailActions.requestSelectUserDetailsACTION),
          switchMap((response:any) => {
            return [
              userDetailActions.successSelectUserDetailsACTION(response),
            ];
          }),
          catchError((error: Error) => {
            console.log('Fetch Error: ', error);
            return of(userDetailActions.onUserDetailsFailure({ error: error }));
          })
      )
    );

    addEFFECT$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(userDetailActions.requestAddUserDetailsACTION),
        switchMap((data) => {
          return this.fireStore
            .collection('user_details')
            .add(data.payload)
            .then(() => {
              return userDetailActions.successAddUserDetailsACTION();
            })
            .catch((error) => {
              console.log('Add Error: ', error);
              return userDetailActions.onUserDetailsFailure({ error: error });
            });
        })
      );
    });

    updateEffect$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(userDetailActions.requestUpdateUserDetailsACTION),
        switchMap((data) => {
          return this.fireStore
            .collection('user_details')
            .doc(data.id)
            .update(data.payload)
            .then(() => {
              return userDetailActions.successUpdateUserDetailsACTION();
            })
            .catch((error) => {
              console.log('Update Error: ', error);
              return userDetailActions.onUserDetailsFailure({ error: error });
            });
        })
      )
    );

    deleteEFFEET$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(userDetailActions.requestDeleteUserDetailsACTION),
        switchMap((docID) => {
          return this.fireStore
            .collection('user_details')
            .doc(docID.payload)
            .delete()
            .then(() => {
              return userDetailActions.successDeleteUserDetailsACTION();
            })
            .catch((error) => {
              console.log('Delete Error: ', error);
              return userDetailActions.onUserDetailsFailure({ error: error });
            });
        })
      )
    );
}

