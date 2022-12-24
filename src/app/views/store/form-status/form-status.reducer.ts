import { Action, createReducer, on } from '@ngrx/store';
import * as formStatusActions from './form-status.actions';
import { FormStatusState } from './form-status.state';


export const formStatusFeatureKey = 'formStatus';



export const initialState: FormStatusState = {
  formStatus: undefined
};


export const formStatusReducer = createReducer(
  initialState,

  on(
    formStatusActions.successFetchFormStatusACTION,
    (state: FormStatusState, { payload }) => {
      console.log("see payload", payload)
      return {...state, formStatus: payload };
    }
  ),

  on(formStatusActions.successSelectFormStatusACTION,
    (state: any, {payload}) =>{
      return { ...state, selectedformStatus: payload };
    }),


  on(formStatusActions.requestAddFormStatusACTION, 
    (state: FormStatusState, {payload}) => {
      // const categories = [...state.formData, payload]
    return { ...state, payload };
  }),

  on(
    formStatusActions.requestUpdateFormStatusACTION,
    (state: FormStatusState, { payload }) => {
      const updateFormStatus = [state.formStatus].map((formStatus: any) => {
        return payload === formStatus.id ? payload : formStatus;
      });
      const returnState = { ...state, formStatus: updateFormStatus };
      return returnState;
    }
  ),

  on(
    formStatusActions.requestDeleteFormStatusACTION,
    (state: FormStatusState, { payload }) => {
      let newformStatus = [state.formStatus];
      newformStatus.splice(newformStatus.indexOf(payload), 1);
      const returnState = { ...state, formStatus: newformStatus };
      return returnState;
    }
  )

);

