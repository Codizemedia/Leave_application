import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// export const selectEquipmentsFeatureState = createFeatureSelector<any>('equipments');
export const selectAuthState = (state: any) => state.auth;
export const isSignedIn = createSelector(
  selectAuthState,
  (state: any) => state
);

export const isLoggedOut = createSelector(isSignedIn, (signedIn) => !signedIn);

