import { createAction, props } from '@ngrx/store';
import { UserDetails } from 'src/app/models/user-details.model';


export const requestFetchUserDetailsACTION = createAction(
  '[ UserDetails ] Request Fetch UserDetails',
  // props<{ payload: any }>()
);
export const successFetchUserDetailsACTION = createAction(
  '[ UserDetails ] Success Fetch UserDetails',
  props<{ payload: any[] }>()
);
export const requestSelectUserDetailsACTION = createAction(
  '[ UserDetails ] Request Select UserDetails',
  props<{ payload: any }>()
);
export const successSelectUserDetailsACTION = createAction(
  '[ UserDetails ] Success Select UserDetails',
  props<{ payload: UserDetails }>()
);
export const requestAddUserDetailsACTION = createAction(
  '[ UserDetails ] Request Add UserDetails',
  props<{ payload: UserDetails }>()
);
export const successAddUserDetailsACTION = createAction(
  '[ UserDetails ] Success Add UserDetails'
);
export const requestDeleteUserDetailsACTION = createAction(
  '[ UserDetails ] Request Delete UserDetails',
  props<{ payload: string }>()
);
export const successDeleteUserDetailsACTION = createAction(
  '[ UserDetails ] Success Delete UserDetails'
);
export const requestUpdateUserDetailsACTION = createAction(
  '[UserDetails] Request Update UserDetails',
  props<{ id: string; payload: UserDetails }>()
);
export const successUpdateUserDetailsACTION = createAction(
  '[ UserDetails ] Success Update UserDetails'
);
export const onUserDetailsFailure = createAction(
  '[ UserDetails ] UserDetails Failure',
  props<{ error: any }>()
);
