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
import { emptyForm } from './dashboard/empty-form';
import { selectFormData } from '../store/leave-application-form/leave-application-form.selectors';
import { Subscription } from 'rxjs';
import { selectUserDetails } from '../store/user-details/user-details.selectors';
import { UserDetailsService } from 'src/app/services/user-details.service';
 

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
  // userDetails: any = {};
  applicantAccess:boolean = false;
  tahaAccess:boolean = false;
  redondoAccess:boolean = false;
  indiraAccess:boolean = false;
  openStep:string = "0";
  isShowStepper:boolean = false;


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private userDetailService: UserDetailsService) { 
      // console.log("seeeeeeeeee",this.userDetailService.userDetails)
      // switch(this.userDetailService.userDetails.userRole){
      //   case "applicant":
      //     this.applicantAccess = true;
      //     break;
      //   case "admin-taha":
      //     this.openStep = "2"
      //     this.tahaAccess = true;
      //     break;
      //   case "admin-redondo":
      //     this.openStep = "2"  
      //     this.redondoAccess = true;
      //     break;
      //   case "admin-indira":
      //     this.openStep = "2"
      //     this.indiraAccess = true;
      //     break;
      // }
      // this.isShowStepper = true
    }
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

    this.formSubscription = this.store.select(selectUserDetails).subscribe((response: any)=>{
      // console.log("resssssssss", response)
      if(response.userDetails!= undefined){
        this.userDetailService.userDetails = response.userDetails
        switch(response.userDetails[0].userRole){
          case "applicant":
            this.applicantAccess = true;
            
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

            this.store.dispatch(formDataActions.requestFetchFormDataACTION())
            break;
          case "admin-taha":
            this.openStep = "2"
            this.tahaAccess = true;
            let tahaMap: Map<string, string> = new Map<string, string>() 
            const tahaData = new Map(Object.entries(this.userDetailService.selectedForm)) 
            tahaData.forEach((value:any,key:any)=>{
              tahaMap.set(key, value)
            })
            console.log("====", tahaMap)
            this.formData = tahaMap;
            break;
          case "admin-redondo":
            this.openStep = "2"  
            this.redondoAccess = true;
            let redondoMap: Map<string, string> = new Map<string, string>() 
            const redondoData = new Map(Object.entries(this.userDetailService.selectedForm)) 
            redondoData.forEach((value:any,key:any)=>{
              redondoMap.set(key, value)
            })
            console.log("====", redondoMap)
            this.formData = redondoMap;
            break;
          case "admin-indira":
            this.openStep = "2"
            this.indiraAccess = true;
            let indiraMap: Map<string, string> = new Map<string, string>() 
            const indiraData = new Map(Object.entries(this.userDetailService.selectedForm)) 
            indiraData.forEach((value:any,key:any)=>{
              indiraMap.set(key, value)
            })
            console.log("====", indiraMap)
            this.formData = indiraMap;
            break;
        }
        this.isShowStepper = true
      }
    })


    this.store.select(selectFormData).subscribe((response)=>{
      // console.log("see data", response)
    })


    if(this.applicantAccess){
       this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: emptyForm}))
    }
    
  }

  submitForm(){
    this.router.navigate(['/application/dashboard'])
    // location.reload()
  }

  firstStepSubmit(){
    if(this.firstStepForm.valid){
      // console.log(this.firstStepForm.getRawValue())
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
    // console.log("seee", this.formData)
    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.filledUpFormData}))
  }

  

  
}
