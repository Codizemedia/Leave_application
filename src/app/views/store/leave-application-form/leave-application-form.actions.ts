

import { createAction, props } from '@ngrx/store';
import { FormData } from 'src/app/models/application-form.model';

// export const requestFetchCategoriesACTION = createAction(
//   '[ ApplicationForm ] Request Fetch Categories'
// );
// export const successFetchCategoriesACTION = createAction(
//   '[ ApplicationForm ] Success Fetch Categories',
//   props<{ payload: any[] }>()
// );
export const requestFetchFormDataACTION = createAction(
  '[ ApplicationForm ] Request Fetch FormData',
  // props<{ payload: any }>()
);
export const successFetchFormDataACTION = createAction(
  '[ ApplicationForm ] Success Fetch FormData',
  props<{ payload: any[] }>()
);
export const requestSelectFormDataACTION = createAction(
  '[ ApplicationForm ] Request Select FormData',
  props<{ payload: any }>()
);
export const successSelectFormDataACTION = createAction(
  '[ ApplicationForm ] Success Select FormData',
  props<{ payload: FormData }>()
);
export const requestAddFormDataACTION = createAction(
  '[ ApplicationForm ] Request Add FormData',
  props<{ payload: any }>()
);
export const successAddFormDataACTION = createAction(
  '[ ApplicationForm ] Success Add FormData'
);
export const requestDeleteFormDataACTION = createAction(
  '[ ApplicationForm ] Request Delete FormData',
  props<{ payload: string }>()
);
export const successDeleteFormDataACTION = createAction(
  '[ ApplicationForm ] Success Delete FormData'
);
export const requestUpdateFormDataACTION = createAction(
  '[ApplicationForm] Request Update FormData',
  props<{ id: string; payload: FormData }>()
);
export const successUpdateFormDataACTION = createAction(
  '[ ApplicationForm ] Success Update FormData'
);
export const onFormDataFailure = createAction(
  '[ ApplicationForm ] FormData Failure',
  props<{ error: any }>()
);
