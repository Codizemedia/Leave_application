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
    private registerService: RegisterService
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
  }
}
