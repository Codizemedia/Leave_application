import { Action, createReducer, on } from '@ngrx/store';
import { FormDataState } from './leave-application-form.state';
import * as formDataActions from './leave-application-form.actions'


export const leaveApplicationFormFeatureKey = 'formData';

export const initialState: FormDataState = {
  formData: undefined,
  selectedFormData: undefined
};

export const formDataReducer = createReducer(
  initialState,

  on(
    formDataActions.successFetchFormDataACTION,
    (state: FormDataState, { payload }) => {
      return {...state, formData: payload };
    }
  ),

  on(formDataActions.successSelectFormDataACTION,
    (state: any, {payload}) =>{
      return { ...state, selectedFormData: payload };
    }),


  on(formDataActions.requestAddFormDataACTION, 
    (state: FormDataState, {payload}) => {
      // const categories = [...state.formData, payload]
    return { ...state, payload };
  }),

  on(
    formDataActions.requestUpdateFormDataACTION,
    (state: FormDataState, { payload }) => {
      const updateFormData = [state.formData].map((formData: any) => {
        return payload === formData.id ? payload : formData;
      });
      const returnState = { ...state, formData: updateFormData };
      return returnState;
    }
  ),

  on(
    formDataActions.requestDeleteFormDataACTION,
    (state: FormDataState, { payload }) => {
      let newFormData = [state.formData];
      newFormData.splice(newFormData.indexOf(payload), 1);
      const returnState = { ...state, formData: newFormData };
      return returnState;
    }
  )
);

