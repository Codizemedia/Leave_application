import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as authActions from './authentication.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userDetailActions from '../../views/store/user-details/user-details.actions';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private routes: Router,
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private store: Store,
  ) {}

  loginEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthLogin),
      switchMap((response: any) => {
        return this.angularFireAuth
          .signInWithEmailAndPassword(
            response.payload.email,
            response.payload.password
          )
          .then((res) => {
            localStorage.setItem('uid', res.user!.uid);
            const signInDetails = {
              signedIn: true,
              uid: res.user?.uid,
            };
            this.routes.navigate(['/dashboard']);
            return authActions.successAuthLogin({ payload: signInDetails });
          });
      }),
      catchError((error) => {
        console.log("error", error)
        // setTimeout(() => {
        //   location.reload()
        // }, 1000);
        this.sharedService.openSnackBar(error.message + "PLEASE RELOAD THE PAGE");
        return of(authActions.authFailure(error));
      })
    )
  );

  registerEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthRegister),
      switchMap((response: any) => {
        return this.angularFireAuth
          .createUserWithEmailAndPassword(
            response.payload.email, 
            response.payload.password)
          .then((res) => {
            localStorage.setItem('uid', res.user!.uid);
            const signInDetails = {
              signedIn: true,
              uid: res.user?.uid,
            };
            const userDetails = {
              name: response.userDetails.name,
              email: response.userDetails.email,
              userRole: response.userDetails.userRole,
              uid: res.user!.uid,
            }
            this.store.dispatch(userDetailActions.requestAddUserDetailsACTION({payload: userDetails}))
            this.routes.navigate(['/dashboard']);
            return authActions.successAuthRegister({ payload: signInDetails });
          });
      }),
      catchError((error) => {
        // setTimeout(() => {
        //   location.reload()
        // }, 1000);
        this.sharedService.openSnackBar(error.message);
        return of(authActions.authFailure(error));
      })
    )
  );

  resetPasswordEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthResetPassword),
      switchMap((response: any) => {
        return this.angularFireAuth
        .sendPasswordResetEmail(response.payload.email)
          .then((res) => {
            // localStorage.setItem('uid', res.user!.uid);
            console.log("see reset password response", res)
            this.routes.navigate(['/dashboard']);
            return authActions.successAuthResetPassword({ payload: res });
          });
      }),
      catchError((error) => {
        this.sharedService.openSnackBar(error.message);
        return of(authActions.authFailure(error));
      })
    )
  );

  logoutEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthLogout),
      switchMap((payload: any) => {
        return this.angularFireAuth.signOut().then((res) => {
          localStorage.removeItem('uid');
          location.reload();
          console.log("logged out")
          return authActions.successAuthLogout();
        });
      }),
      catchError((error) => {
        return of(authActions.authFailure(error));
      })
    )
  );
}
