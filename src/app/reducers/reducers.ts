import {
  ActionReducerMap,
} from '@ngrx/store';
import * as auth from '../authentication/store/authentication.reducer';
import { AuthState } from '../authentication/store/auth.state';


export const appFeatureKey = 'app';

export interface AppState {

  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,

};