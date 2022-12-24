// import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectFormStatusFeatureState =
  createFeatureSelector<any>('formStatus');

export const selectFormStatus = createSelector(
  selectFormStatusFeatureState,
  (state: any) => {
    return state
  }
);
