import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as formDataActions from '../../../store/leave-application-form/leave-application-form.actions';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../../../shared/form-questions';
import { selectFormData } from 'src/app/views/store/leave-application-form/leave-application-form.selectors';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Subscription } from 'rxjs';
import { selectUserDetails } from 'src/app/views/store/user-details/user-details.selectors';
import { selectFormStatus } from 'src/app/views/store/form-status/form-status.selectors';

@Component({
  selector: 'app-filled-form',
  templateUrl: './filled-form.component.html',
  styleUrls: ['./filled-form.component.scss']
})
export class FilledFormComponent implements OnInit, OnDestroy {

  @Input('formData') formData: any = {};
  noSinatureAccess:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAA8AQ3AAAAAAXNSR0IArs4c6QAAAvxJREFUeF7t1MEJADAMA7Fm/4HzbKFbHCgTGDl4dvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoDAA9HwhYQ81I0ZAAAAAElFTkSuQmCC";
  hasSignatureAccessApplicant:boolean = false;
  hasSignatureAccessTaha:boolean = false;
  hasSignatureAccessRedondo:boolean = false;
  hasSignatureAccessIndira:boolean = false;
  signatureForm1!: FormGroup;
  signatureForm2!: FormGroup;
  signatureForm3!: FormGroup;
  choices1 = choicesA;
  choices2 = choicesB;
  choices3 = choicesC;
  choices4 = choicesD;
  signatureApplicant:string = "";
  tahaSignature:string = "";
  redondoSignature:string = "";
  indiraSignature:string = "";
  points = [];
  signImage:any;
  formSubscription!:Subscription; 
 

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private userDetailService: UserDetailsService) {
    this.signatureForm1 = this.formBuilder.group({
     signature: new FormControl([''])
    });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.formSubscription = this.store.select(selectUserDetails).subscribe((response: any)=>{
      console.log("resssssssss", response)
      if(response.userDetails!= undefined){
        switch(response.userDetails[0].userRole){
          case "applicant":
            this.hasSignatureAccessApplicant = true;
            break;
          case "admin-taha":
            this.hasSignatureAccessTaha = true;
            break;
          case "admin-redondo":
            this.hasSignatureAccessRedondo = true;
            break;
          case "admin-indira":
            this.hasSignatureAccessTaha = true;
            break;
        }
      }
    })
  }

  signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 300,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(247,247,247)',
  };
  showImage(action: string, signature: any) {
    
    const base64ImageData = signature.toDataURL();
    let formDataMap = this.formData

    switch(action){
      case 'signature1':
      this.signatureApplicant = base64ImageData;
      formDataMap.set("applicantSignature", this.signatureApplicant)
      break;
      case 'signature2':
      this.tahaSignature = base64ImageData;
      formDataMap.set("tahaSignature", this.tahaSignature)
      break;
      case 'signature3':
      this.redondoSignature= base64ImageData;
      formDataMap.set("redondoSignature", this.redondoSignature)
      break;
      case 'signature4':
      this.indiraSignature = base64ImageData;
      formDataMap.set("indiraSignature", this.indiraSignature)
      break;
    }


    const filledFormData = {
      officeOrDepartment: this.formData.get("officeOrDepartment"),
      lastName: this.formData.get("lastName"), 
      firstName: this.formData.get("firstName"),
      middleName: this.formData.get("middleName"),
      dateOfFilling: this.formData.get("dateOfFilling"),
      position: this.formData.get("position"),
      salary: this.formData.get("salary"),
      vacationLeave: this.formData.get("vacationLeave"),
      mandatoryOrForceLeave: this.formData.get("mandatoryOrForceLeave"),
      sickLeave: this.formData.get("sickLeave"),
      maternityLeave: this.formData.get("maternityLeave"),
      paternityLeave: this.formData.get("paternityLeave"),
      specialPrivilege: this.formData.get("specialPrivilege"),
      soloParentLeave: this.formData.get("soloParentLeave"),
      studyLeave: this.formData.get("studyLeave"),
      tenDayVAWCLeave: this.formData.get("tenDayVAWCLeave"),
      rehabilitationPrivilege: this.formData.get("rehabilitationPrivilege"),
      specialLeaveBenefitsForWomen: this.formData.get("specialLeaveBenefitsForWomen"),
      specialEmergency: this.formData.get("specialEmergency"),
      adoptionLeave: this.formData.get("adoptionLeave"),
      withinThePhilippines: this.formData.get("withinThePhilippines"),
      withinThePhilippinesInput: this.formData.get("withinThePhilippinesInput"),
      abroad: this.formData.get("abroad"),
      abroadInput: this.formData.get("abroadInput"),
      inHospital: this.formData.get("inHospital"),
      inHospitalInput: this.formData.get("inHospitalInput"),
      outPatient: this.formData.get("outPatient"),
      outPatientInput: this.formData.get("outPatientInput"),
      incaseOfLeaveForWomen: this.formData.get("incaseOfLeaveForWomen"),
      completionOfMastersDegree: this.formData.get("completionOfMastersDegree"),
      barOrBoardExaminationReview: this.formData.get("barOrBoardExaminationReview"),
      monetizationOfLeaveCredits: this.formData.get("monetizationOfLeaveCredits"),
      terminalLeave: this.formData.get("terminalLeave"),
      numberOfWorkingDays: this.formData.get("numberOfWorkingDays"),
      inclusiveDates: this.formData.get("inclusiveDates"),
      notRequested: this.formData.get("notRequested"),
      requested: this.formData.get("requested"),
      applicantSignature: this.formData.get("applicantSignature"),
      tahaSignature: this.formData.get("tahaSignature"),
      redondoSignature: this.formData.get("redondoSignature"),
      indiraSignature: this.formData.get("indiraSignature"),
      uid: localStorage.getItem("uid")
    }
     
    this.store.dispatch(formDataActions.requestAddFormDataACTION({payload: filledFormData}))
    

    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.formData}))
  }

  

  display(){
    console.log("see form data",this.formData)
    console.log("other data ==== ", this.formData.get("officeOrDepartment"))
    // this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: }))
    // this.store.select(selectFormData).subscribe((response: any)=>{
    //   console.log("see reponse", response)
    // })
    let formDataMap = this.formData
    formDataMap.set("signatureApplicant", this.signatureApplicant)
    console.log("see type === ", typeof(this.formData))
  }
}
