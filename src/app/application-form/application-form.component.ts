import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onCheckChange(event: any){
    console.log("event", event)
  }

  public choices: Array<any> = [
    {description: 'Vacation Leave', value: false},
    {description: "Mandatory/Force Leave", value: false},
    {description: "Sick Leave", value: false},
    {description: "Maternity Leave", value: false},
    {description: "Paternity Leave", value: false},
    {description: "Special Privilege Leave", value: false},
    {description: "Solo Parent Leave", value: false},
    {description: "Study Leave", value: false},
    {description: "10-Day VAWC Leave", value: false},
    {description: "Rehabilitation Privilege", value: false},
    {description: "Special Leave Benefits for Women", value: false},
    {description: "Special Emergency", value: false},
    {description: "Adoption Leave", value: false},
  ];


}
