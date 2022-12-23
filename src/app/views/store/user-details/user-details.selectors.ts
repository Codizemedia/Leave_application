import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectUserDetailsFeatureState =
  createFeatureSelector<any>('userDetails');

export const selectUserDetails = createSelector(
  selectUserDetailsFeatureState,
  (state: any) => {
    return state
  }
);