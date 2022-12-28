import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as formDataActions from '../../../store/leave-application-form/leave-application-form.actions';
import * as formStatusActions from '../../../store/form-status/form-status.actions';
import { selectFormData } from 'src/app/views/store/leave-application-form/leave-application-form.selectors';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Subscription } from 'rxjs';
import { selectUserDetails } from 'src/app/views/store/user-details/user-details.selectors';
import { selectFormStatus } from 'src/app/views/store/form-status/form-status.selectors';
import { FormStatus } from 'src/app/models/form-status.model';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../../../shared/form-questions';

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
  submitTaha:boolean = false;
  submitRedondo: boolean = false;
  submitIndira:boolean = false; 
  signatureForm1!: FormGroup;
  signatureForm2!: FormGroup;
  signatureForm3!: FormGroup;
  tahaForm!: FormGroup;
  redondoForm!: FormGroup;
  indiraForm!: FormGroup;
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
    private _formBuilder: FormBuilder,
    ) {
    this.signatureForm1 = this.formBuilder.group({
     signature: new FormControl([''])
    });
    this.adminForms();
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe()
    this.formStatusSubscription.unsubscribe()
  }

  ngOnInit(): void {
    const detail:any = this.userDetailService.userDetails;
    this.formSubscription = this.store.select(selectUserDetails).subscribe((response: any)=>{
      if(response.userDetails!= undefined){
        this.userRole = response.userDetails[0].userRole;
        switch(response.userDetails[0].userRole){
          case "applicant":
            this.hasSignatureAccessApplicant = true;
            break;
          case "admin-taha":
            this.hasSignatureAccessTaha = true;
            this.signatureApplicant = this.formData.get("applicantSignature")
            break;
          case "admin-redondo":
            this.hasSignatureAccessRedondo = true;
            this.signatureApplicant = this.formData.get("applicantSignature")
            this.tahaSignature = this.formData.get("tahaSignature")
            break;
          case "admin-indira":
            this.hasSignatureAccessIndira = true;
            this.signatureApplicant = this.formData.get("applicantSignature")
            this.tahaSignature = this.formData.get("tahaSignature")
            this.redondoSignature = this.formData.get("redondoSignature")
            break;
        }
      }
    })
    this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
      if(response.formStatus != undefined){
        const currentFormStatus =  response.formStatus.filter((form:any)=>{
          if(this.hasSignatureAccessApplicant){
            return  form.uid == localStorage.getItem("uid")
          }else{
            console.log("see form", form)
            console.log("compare diff", form.formId, "==", this.formData.get("id"))
            return  form.formId == this.formData.get("id")
          }
        })
        console.log("look for", currentFormStatus)
        this.formStatus = currentFormStatus[0];
      }
    })
  }

  adminForms(){
    this.tahaForm = this._formBuilder.group({
      asOf: ['',],
      vacationLeaveEarned: [''],
      vacationLeaveBalance: [''],
      sickLeaveEarned: [''],
      sickLeaveBalance: [''],
    });
    this.redondoForm = this._formBuilder.group({
      forApproval: [''],
      forDisapproval: [''],
      forDisappovalInput: ['']
    })
    this.indiraForm = this._formBuilder.group({
      daysWithPay: [''],
      daysWithoutPay: [''],
      others: [''],
      disapprovedDueTo: ['']
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
      const applicantStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "taha-approval",
        uid: this.userDetailService.userDetails.uid,
        formId: "",
        id: this.formStatus.id!
      } 
      this.store.dispatch(
        formDataActions.requestAddFormDataACTION(
          {payload: this.mapToObject(), formStatus: applicantStatusData}
        )
      )
      break;
      case 'signature2':
      this.tahaSignature = base64ImageData;
      formDataMap.set("tahaSignature", this.tahaSignature)
      this.submitTaha = true;
      const tahaStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "redondo-approval",
        formId: this.formStatus.formId
      } 
      this.store.dispatch(
        formStatusActions.requestUpdateFormStatusACTION(
          {id: this.formStatus.id!, payload: tahaStatusData}
        )
      )
      this.store.dispatch(
        formDataActions.requestUpdateFormDataACTION(
          {id: this.formData.get("id"), payload: this.mapToObject()}
        )
      )
      break;
      case 'signature3':
      this.redondoSignature= base64ImageData;
      formDataMap.set("redondoSignature", this.redondoSignature)
      this.submitRedondo = true;
      const redondoStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "indira-approval",
        formId: this.formStatus.formId
      } 
      this.store.dispatch(
        formStatusActions.requestUpdateFormStatusACTION(
          {id: this.formStatus.id!, payload: redondoStatusData}
        )
      )
      this.store.dispatch(
        formDataActions.requestUpdateFormDataACTION(
          {id: this.formData.get("id"), payload: this.mapToObject()}
        )
      )
      break;
      case 'signature4':
      this.indiraSignature = base64ImageData;
      formDataMap.set("indiraSignature", this.indiraSignature)
      this.submitIndira = true;
      const indiraStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "done",
        formId: this.formStatus.formId
      } 
      this.store.dispatch(
        formStatusActions.requestUpdateFormStatusACTION(
          {id: this.formStatus.id!, payload: indiraStatusData}
        )
      )
      this.store.dispatch(
        formDataActions.requestUpdateFormDataACTION(
          {id: this.formData.get("id"), payload: this.mapToObject()}
        )
      )
      break;
    }
    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.formData}))
  }

  
  mapToObject():any{
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
