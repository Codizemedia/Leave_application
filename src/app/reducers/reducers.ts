import {
  ActionReducerMap,
} from '@ngrx/store';
import * as auth from '../authentication/store/authentication.reducer';
import * as formData from '../views/store/leave-application-form/leave-application-form.reducer';
import * as userDetails from '../views/store/user-details/user-details.reducer';
import * as formStatusActions from '../views/store/form-status/form-status.reducer';
import { AuthState } from '../authentication/store/auth.state';
import { FormDataState } from '../views/store/leave-application-form/leave-application-form.state';
import { UserDetailsState } from '../views/store/user-details/user-details.state';
import { FormStatusState } from '../views/store/form-status/form-status.state';


export const appFeatureKey = 'app';

export interface AppState {
  auth: AuthState;
  formData: FormDataState;
  userDetails: UserDetailsState;
  formStatus: FormStatusState
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  formData: formData.formDataReducer,
  userDetails: userDetails.userDetailsReducer,
  formStatus: formStatusActions.formStatusReducer
};