import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  userDetails: UserDetails = {
    id: "",
    name: "",
    email: "",
    uid: "",
    userRole:"",
  }

  constructor() { }
}
