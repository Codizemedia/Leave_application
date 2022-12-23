import { Action, createReducer, on } from '@ngrx/store';
import * as userDetailActions from './user-details.actions';
import { UserDetailsState } from './user-details.state';


export const userDetailsFeatureKey = 'userDetails';


export const initialState: UserDetailsState = {
  userDetails: {}
};


export const userDetailsReducer = createReducer(
  initialState,

  on(
    userDetailActions.successFetchUserDetailsACTION,
    (state: UserDetailsState, { payload }) => {
      return {...state, formData: payload };
    }
  ),

  on(userDetailActions.successSelectUserDetailsACTION,
    (state: any, {payload}) =>{
      return { ...state, selectedFormData: payload };
    }),


  on(userDetailActions.requestAddUserDetailsACTION, 
    (state: UserDetailsState, {payload}) => {
      // const categories = [...state.formData, payload]
    return { ...state, payload };
  }),

  on(
    userDetailActions.requestUpdateUserDetailsACTION,
    (state: UserDetailsState, { payload }) => {
      const updateUserDetails = [state.userDetails].map((userDetails: any) => {
        return payload === userDetails.id ? payload : userDetails;
      });
      const returnState = { ...state, userDetails: updateUserDetails };
      return returnState;
    }
  ),

  on(
    userDetailActions.requestDeleteUserDetailsACTION,
    (state: UserDetailsState, { payload }) => {
      let newUserDetails = [state.userDetails];
      newUserDetails.splice(newUserDetails.indexOf(payload), 1);
      const returnState = { ...state, formData: newUserDetails };
      return returnState;
    }
  )
);


