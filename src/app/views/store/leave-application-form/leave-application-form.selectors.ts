import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormData } from 'src/app/models/application-form.model';

export const selectFormDataFeatureState =
  createFeatureSelector<any>('formData');
export const selectFormData = createSelector(
  selectFormDataFeatureState,
  (state: FormData) => state
);
