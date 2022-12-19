import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import * as authActions from '../store/authentication.actions'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private store: Store) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit() {
    // this.router.navigate(['/authentication/login']);
    this.store.dispatch(authActions.requestAuthResetPassword({payload: {email: this.form.value.email}}))
  }
}
