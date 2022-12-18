import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from '../../myservice.service';
import * as authActions from '../store/authentication.actions';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AccountCredentials } from 'src/app/models/auth.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  _loginForm!: FormGroup;
  constructor(
    private service: MyserviceService, 
    private routes: Router,
    private formBuilder: FormBuilder,
    private store: Store) { 
      
      this.loginForm();
    }


  // check(uname: string, p: string) {
  //   const output = this.service.checkusernameandpassword(uname, p);
  //   if (output == true) {
  //     this.routes.navigate(['/starter']);
  //   } else {  
  //     this.msg = 'Invalid Username or Password';
  //   }
  // }

  loginForm(){
    this._loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(""),
     });
  }

  onLogin(){
    const value = this._loginForm.value;
    if(this._loginForm.valid){
      const credentials: AccountCredentials = {
        email: value.email,
        password: value.password,
      };
      this.store.dispatch(authActions.requestAuthLogin({ payload: credentials }));
    }
   
  }

  ngOnInit() {}
}
