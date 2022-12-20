import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../shared/form-questions';
 

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  isLinear = false;
  firstStepForm: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  thirdFormGroup: FormGroup = Object.create(null);
  choices1 = choicesA
  choices2 = choicesB
  choices3 = choicesC
  choices4 = choicesD

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.firstStepForm = this._formBuilder.group({
      officeOrDepartment: ['     MSU-LNAC', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      dateOfFilling: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  onCheckChange(event: any){
    console.log("event", event)
  }

  submitForm(){
    this.router.navigate(['/dashboard'])
  }

}
