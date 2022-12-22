import { AuthEffects } from '../authentication/store/authentication.effects';
import { LeaveApplicationFormEffects } from '../views/store/leave-application-form/leave-application-form.effects';

export const appEffects = [
  AuthEffects,
  LeaveApplicationFormEffects
];
