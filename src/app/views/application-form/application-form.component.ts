import { Component, OnInit } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
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
  secondStepForm: FormGroup = Object.create(null);
  thirdFormGroup: FormGroup = Object.create(null);
  choices1 = choicesA
  choices2 = choicesB
  choices3 = choicesC
  choices4 = choicesD
  formData!: Object;
  filledUpFormData:Map<string, string> = new Map<string, string>()

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.firstStepForm = this._formBuilder.group({
      officeOrDepartment: ['MSU-LNAC', Validators.required,  ],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      dateOfFilling: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.secondStepForm = this._formBuilder.group({
      vacationLeave: [false,],
      mandatoryOrForceLeave: [false,],
      sickLeave: [false,],
      maternityLeave: [false,],
      paternityLeave: [false,],
      specialPrivilege: [false,],
      soloParentLeave: [false,],
      studyLeave: [false,],
      tenDayVAWCLeave: [false,],
      rehabilitationPrivilege: [false,],
      specialLeaveBenefitsForWomen: [false,],
      specialEmergency: [false,],
      adoptionLeave: [false,],
      withinThePhilippines: [false,],
      withinThePhilippinesInput: ["",],
      abroad: [false,],
      abroadInput: ["",],
      inHospital: [false,],
      inHospitalInput: ["",],
      outPatient: [false,],
      outPatientInput: ["",],
      incaseOfLeaveForWomen: ["",],
      completionOfMastersDegree: [false,],
      barOrBoardExaminationReview: [false,],
      monetizationOfLeaveCredits: [false,],
      terminalLeave: [false,],
      numberOfWorkingDays: ["",],
      inclusiveDates: ["",],
      notRequested: [false,],
      requested: [false,],
    });

    const firtsFormMap = new Map(Object.entries(this.firstStepForm.value))
    const secondFormMap = new Map(Object.entries(this.secondStepForm.value))
   
    firtsFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });
    secondFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });

    this.formData =  this.filledUpFormData;
    // this.formData = Object.fromEntries()
    
  

    // console.log("look for something", Object.entries(this.filledUpFormData).map(function(key,value)=> key, value ))
  }

  // onCheckChange(event: any){
  //   console.log("event", event)
  // }

  submitForm(){
    this.router.navigate(['/dashboard'])
  }

  firstStepSubmit(){
    if(this.firstStepForm.valid){
      console.log(this.firstStepForm.getRawValue())
    }
  }

  secondStepSubmit(){
    const firtsFormMap = new Map(Object.entries(this.firstStepForm.value))
    const secondFormMap = new Map(Object.entries(this.secondStepForm.value))
    // if(this.firstStepForm.valid){
      firtsFormMap.forEach((value:any, key:any) =>{
        this.filledUpFormData.set(key, value)
      });
      secondFormMap.forEach((value:any, key:any) =>{
        this.filledUpFormData.set(key, value)
      });
  
      this.formData = this.filledUpFormData as Object;
    // }
    console.log("seee dataaaaa", this.filledUpFormData);
  }
}
