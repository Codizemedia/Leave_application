import { AccountCredentials } from '../../models/auth.model';

export interface AuthState {
  signedIn: boolean;
  uid: string;
}
