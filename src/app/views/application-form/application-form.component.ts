import { Component, OnDestroy, OnInit } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as formDataActions from '../store/leave-application-form/leave-application-form.actions';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../shared/form-questions';
import { emptyForm } from '../dashboard/empty-form';
import { selectFormData } from '../store/leave-application-form/leave-application-form.selectors';
import { Subscription } from 'rxjs';
 

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  isLinear = false;
  firstStepForm: FormGroup = Object.create(null);
  secondStepForm: FormGroup = Object.create(null);
  thirdFormGroup: FormGroup = Object.create(null);
  choices1 = choicesA
  choices2 = choicesB
  choices3 = choicesC
  choices4 = choicesD
  formData!: Object;
  formSubscription!: Subscription;
  filledUpFormData:Map<string, string> = new Map<string, string>()

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private store: Store) { }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

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

    const firstFormMap = new Map(Object.entries(this.firstStepForm.value))
    const secondFormMap = new Map(Object.entries(this.secondStepForm.value))
   
    firstFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });
    secondFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });

    this.filledUpFormData.set("applicantSignature", "")
    this.filledUpFormData.set("tahaSignature", "")
    this.filledUpFormData.set("redondoSignature", "")
    this.filledUpFormData.set("indiraSignature", "")
    this.formData =  this.filledUpFormData;
    
    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: emptyForm}))
    this.formSubscription = this.store.select(selectFormData).subscribe((response: any)=>{
      console.log("see response",response)
    })
  }

  submitForm(){
    this.router.navigate(['/dashboard'])
  }

  firstStepSubmit(){
    if(this.firstStepForm.valid){
      console.log(this.firstStepForm.getRawValue())
    }
  }

  secondStepSubmit(){
    const firstFormMap = new Map(Object.entries(this.firstStepForm.value))
    const secondFormMap = new Map(Object.entries(this.secondStepForm.value))
    firstFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });
    secondFormMap.forEach((value:any, key:any) =>{
      this.filledUpFormData.set(key, value)
    });

    this.formData = this.filledUpFormData as Object;
    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.filledUpFormData}))
  }
}
