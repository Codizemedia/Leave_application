import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as authActions from './authentication.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  signedIn: false,
  uid: '',
};

export const authReducer = createReducer(
  initialState,
  on(authActions.successAuthLogin, (state: any, { payload }) => {
    // console.log("state", payload)
    return {  
      signedIn: true,
      uid: payload.uid, };
  }),

  on(authActions.successAuthRegister, (state: any, { payload }) => {
    // console.log("state", payload)
    return {  
      signedIn: true,
      uid: payload.uid, };
  }),

  on(authActions.successAuthLogout, (state: any) => {
    return {
      signedIn: false,
      uid: '',
    };
  })
);
