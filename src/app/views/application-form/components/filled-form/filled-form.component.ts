import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as formDataActions from '../../../store/leave-application-form/leave-application-form.actions';
import * as formStatusActions from '../../../store/form-status/form-status.actions';
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
import { FormStatus } from 'src/app/models/form-status.model';

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
  formStatus!: FormStatus;
  formSubscription!:Subscription; 
  formStatusSubscription!: Subscription;
  formDataSubscription!: Subscription;
  userRole: string = ""
 

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private userDetailService: UserDetailsService,
    ) {
    this.signatureForm1 = this.formBuilder.group({
     signature: new FormControl([''])
    });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe()
    this.formStatusSubscription.unsubscribe()
  }

  ngOnInit(): void {
    const detail:any = this.userDetailService.userDetails;
    console.log("=== see", this.formData)
    console.log("daaaaaaata", detail[0].userRole)
    this.formSubscription = this.store.select(selectUserDetails).subscribe((response: any)=>{
      // console.log("resssssssss", response)
      if(response.userDetails!= undefined){
        this.userRole = response.userDetails[0].userRole;
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
            this.hasSignatureAccessIndira = true;
            break;
        }
      }
    })
    this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
      if(response.formStatus != undefined){
        const currentFormStatus =  response.formStatus.filter((form:any)=>{
          // console.log( form.uid, "==" ,localStorage.getItem("uid"))
          return  form.uid == localStorage.getItem("uid")
        })
        // console.log("look for", currentFormStatus)
        this.formStatus = currentFormStatus[0];
      }
    })

    // this.formDataSubscription = this.store.select(selectFormData).subscribe((response)=>{
    //   // console.log("look for form target", response)
    // })
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
      const applicantStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "taha-approval",
        uid: this.userDetailService.userDetails.uid,
        formId: "",
        id: this.formStatus.id!
      } 
      this.store.dispatch(formDataActions.requestAddFormDataACTION({payload: this.mapToObject(), formStatus: applicantStatusData}))

      // this.store.select(selectFormData).subscribe()
      // this.store.dispatch(formStatusActions.requestUpdateFormStatusACTION({id: this.formStatus.id!, payload: applicantStatusData}))
      break;
      case 'signature2':
      this.tahaSignature = base64ImageData;
      formDataMap.set("tahaSignature", this.tahaSignature)
      const tahaStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "redondo-approval",
        uid: this.userDetailService.userDetails.uid,
        formId: ""
      } 
      this.store.dispatch(formStatusActions.requestUpdateFormStatusACTION({id: this.formStatus.id!, payload: tahaStatusData}))
      break;
      case 'signature3':
      this.redondoSignature= base64ImageData;
      formDataMap.set("redondoSignature", this.redondoSignature)
      const redondoStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "indira-approval",
        uid: this.userDetailService.userDetails.uid,
        formId: ""
      } 
      this.store.dispatch(formStatusActions.requestUpdateFormStatusACTION({id: this.formStatus.id!, payload: redondoStatusData}))
      break;
      case 'signature4':
      this.indiraSignature = base64ImageData;
      formDataMap.set("indiraSignature", this.indiraSignature)
      const indiraStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "done",
        uid: this.userDetailService.userDetails.uid,
        formId: ""
      } 
      this.store.dispatch(formStatusActions.requestUpdateFormStatusACTION({id: this.formStatus.id!, payload: indiraStatusData}))
      break;
    }

    

  

    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.formData}))
  }

  
  mapToObject():Object{
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

    return filledFormData;
  }
  
}
