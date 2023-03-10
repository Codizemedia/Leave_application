import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
// import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { RegisterService } from './register.service';
import { Store } from '@ngrx/store';
import * as authActions from '../store/authentication.actions'



const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = Object.create(null);

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    // private handleToken: HandleTokenService,
    private registerService: RegisterService,
    private store: Store
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: "default name",
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: password,
      password_confirmation: confirmPassword
    });
  }

  onSubmit() {
    // this.router.navigate(['/']);
    // this.router.navigate(['/dashboards/dashboard1']);
    // this.registerService.postUserData(this.form.value).subscribe({
    //   next: (response) => {
    //     console.log(response.token);
    //     this.handleToken.saveToken(response.token);
    //     this.handleToken.saveUser(response);     
    //   },
    //   error: (error) => console.log("REGISTER ERROR: "+error),
    //   complete:()=> {
    //     this.router.navigate(['/dashboards/dashboard1']);
    //   }
    // }).unsubscribe;
    // console.log("doing ")

    const accountCredentials = {
      email: this.form.value.email, 
      password: this.form.value.password
    }

    const userDetails = {
      name: "Employee",
      userRole: "applicant",
      email: this.form.value.email, 
    }

    this.store.dispatch(authActions.requestAuthRegister({payload: accountCredentials, userDetails: userDetails}))
    // this.store.dispatch(userDetailActions.requestAddUserDetailsACTION({payload: userDetails}))
  }
}
