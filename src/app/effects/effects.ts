import { AuthEffects } from '../authentication/store/authentication.effects';
import { LeaveApplicationFormEffects } from '../views/store/leave-application-form/leave-application-form.effects';
import { UserDetailsEffects } from '../views/store/user-details/user-details.effects';

export const appEffects = [
  AuthEffects,
  LeaveApplicationFormEffects,
  UserDetailsEffects
];
