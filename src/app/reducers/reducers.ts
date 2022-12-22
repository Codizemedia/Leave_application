import {
  ActionReducerMap,
} from '@ngrx/store';
import * as auth from '../authentication/store/authentication.reducer';
import * as formData from '../views/store/leave-application-form/leave-application-form.reducer';
import { AuthState } from '../authentication/store/auth.state';
import { FormDataState } from '../views/store/leave-application-form/leave-application-form.state';


export const appFeatureKey = 'app';

export interface AppState {
  auth: AuthState;
  formData: FormDataState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  formData: formData.formDataReducer

};