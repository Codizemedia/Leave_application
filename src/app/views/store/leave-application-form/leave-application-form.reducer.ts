import { Action, createReducer, on } from '@ngrx/store';
import { FormDataState } from './leave-application-form.state';
import * as formDataActions from './leave-application-form.actions'


export const leaveApplicationFormFeatureKey = 'formData';

export const initialState: FormDataState = {
  formData: {},
  selectedFormData: {}
};

export const formDataReducer = createReducer(
  initialState,

  on(
    formDataActions.successFetchFormDataACTION,
    (state: FormDataState, { payload }) => {
      return {...state, formDtaa: payload };
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
      const updateCategory = [state.formData].map((category: any) => {
        return payload === category.id ? payload : category;
      });
      const returnState = { ...state, category: updateCategory };
      return returnState;
    }
  ),

  on(
    formDataActions.requestDeleteFormDataACTION,
    (state: FormDataState, { payload }) => {
      let newCategories = [state.formData];
      newCategories.splice(newCategories.indexOf(payload), 1);
      const returnState = { ...state, products: newCategories };
      return returnState;
    }
  )
);

