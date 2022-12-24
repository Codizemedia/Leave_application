
import { createAction, props } from '@ngrx/store';
import { FormStatus } from 'src/app/models/form-status.model';


export const requestFetchFormStatusACTION = createAction(
  '[ FormStatus ] Request Fetch FormStatus',
  // props<{ payload: any }>()
);
export const successFetchFormStatusACTION = createAction(
  '[ FormStatus ] Success Fetch FormStatus',
  props<{ payload: any[] }>()
);
export const requestSelectFormStatusACTION = createAction(
  '[ FormStatus ] Request Select FoFormStatusrmData',
  props<{ payload: any }>()
);
export const successSelectFormStatusACTION = createAction(
  '[ FormStatus ] Success Select FormStatus',
  props<{ payload: FormStatus }>()
);
export const requestAddFormStatusACTION = createAction(
  '[ FormStatus ] Request Add FormStatus',
  props<{ payload: FormStatus }>()
);
export const successAddFormStatusACTION = createAction(
  '[ FormStatus ] Success Add FormStatus'
);
export const requestDeleteFormStatusACTION = createAction(
  '[ FormStatus ] Request Delete FormStatus',
  props<{ payload: string }>()
);
export const successDeleteFormStatusACTION = createAction(
  '[ FormStatus ] Success Delete FormStatus'
);
export const requestUpdateFormStatusACTION = createAction(
  '[ FormStatus ] Request Update FormStatus',
  props<{ id: string; payload: FormStatus }>()
);
export const successUpdateFormStatusACTION = createAction(
  '[ FormStatus ] Success Update FormStatus'
);
export const onFormStatusaFailure = createAction(
  '[ FormStatus ] FormData Failure',
  props<{ error: any }>()
);
