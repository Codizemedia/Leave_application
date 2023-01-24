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
import { Sms } from 'src/app/models/sms.model';
import { SendMessageService } from 'src/app/shared/send-message/send-message.service';

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
  formDataMap: Map<string, string> = new Map<string, string>();
  selectedFile!: File;
  image: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private userDetailService: UserDetailsService,
    private _formBuilder: FormBuilder,
    private sendMessageService: SendMessageService,
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
            return  form.formId == this.formData.get("id")
          }
        })
        this.formStatus = currentFormStatus[0];
      }
    })
     this.adminForms();
  }

  adminForms(){
    console.log("form dataaaa", this.formData)
    this.tahaForm = this._formBuilder.group({
      asOf: [this.formData.get("asOf")??""],
      vacationLeaveEarned: [this.formData.get("vacationLeaveEarned")??""],
      vacationLeaveBalance: [this.formData.get("vacationLeaveBalance")??""],
      sickLeaveEarned: [this.formData.get("sickLeaveEarned")??""],
      sickLeaveBalance: [this.formData.get("sickLeaveBalance")??""],
    });
    this.redondoForm = this._formBuilder.group({
      forApproval: [this.formData.get("forApproval")??""],
      forDisapproval: [this.formData.get("forDisapproval")??""],
      forDisappovalInput: [this.formData.get("forDisappovalInput")??""],
    })
    this.indiraForm = this._formBuilder.group({
      daysWithPay: [this.formData.get("daysWithPay")??""],
      daysWithoutPay: [this.formData.get("daysWithoutPay")??""],
      others: [this.formData.get("others")??""],
      disapprovedDueTo: [this.formData.get("disapprovedDueTo")??""],
    })
  }

  signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 300,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(247,247,247)',
  };
  showImage(action: string, signature: any, select = false, message = "" ) {

    const base64ImageData = select? signature: signature.toDataURL();

    switch(action){
      case 'signature1':
      this.signatureApplicant = base64ImageData;
      this.formData.set("applicantSignature", this.signatureApplicant)
      const applicantStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "taha-approval",
        number: this.formStatus.number,
        uid: this.userDetailService.userDetails.uid,
        formId: "",
        id: this.formStatus.id!
      } 
      console.log("excesss", this.mapToObject())
      this.store.dispatch(
        formDataActions.requestAddFormDataACTION(
          {payload: this.mapToObject(), formStatus: applicantStatusData}
        )
      )
      break;
      case 'signature2':
      this.tahaSignature = base64ImageData;
      const tahaValue = this.tahaForm.value;
      console.log('tahaValue', tahaValue)
      if(message != ""){
        this.sendMessage(message)
      }
      this.formData.set("tahaSignature", this.tahaSignature)
      this.formDataMap.set("asOf", tahaValue.asOf)
      this.formDataMap.set("vacationLeaveEarned", tahaValue.vacationLeaveEarned)
      this.formDataMap.set("vacationLeaveBalance", tahaValue.vacationLeaveBalance)
      this.formDataMap.set("sickLeaveEarned", tahaValue.sickLeaveEarned)
      this.formDataMap.set("sickLeaveBalance", tahaValue.sickLeaveBalance)
      this.submitTaha = true;
      const tahaStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "redondo-approval",
        number: this.formStatus.number,
        formId: this.formStatus.formId,
        uid: this.formStatus.uid,
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
      const redondoValue = this.redondoForm.value;
      if(message != ""){
        this.sendMessage(message)
      }
      this.formData.set("redondoSignature", this.redondoSignature)
      this.formDataMap.set("forApproval", redondoValue.forApproval)
      this.formDataMap.set("forDisapproval", redondoValue.forDisapproval)
      this.formDataMap.set("forDisappovalInput", redondoValue.forDisappovalInput)
      this.submitRedondo = true;
      const redondoStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        status: "indira-approval",
        number: this.formStatus.number,
        formId: this.formStatus.formId,
        uid: this.formStatus.uid,
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
      const indiraValue = this.indiraForm.value;
      if(message != ""){
        this.sendMessage(message)
      }
      this.formData.set("indiraSignature", this.indiraSignature)
      this.formDataMap.set("daysWithPay", indiraValue.daysWithPay)
      this.formDataMap.set("daysWithoutPay", indiraValue.daysWithoutPay)
      this.formDataMap.set("others", indiraValue.others)
      this.formDataMap.set("disapprovedDueTo", indiraValue.disapprovedDueTo)
      this.submitIndira = true;
      const indiraStatusData: FormStatus = {
        name: this.formStatus.name,
        email: this.formStatus.email,
        number: this.formStatus.number,
        status: "done",
        formId: this.formStatus.formId,
        uid: this.formStatus.uid,
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

  uploadSignature(event: any){
    // let me = this;
    // let file = event.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = function () {
    //   console.log(reader.result);
    // };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
  }

   onFileSelect(event: { target: { files: any[]; }; }, action: string) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    let bas64Image = "";
    reader.readAsDataURL(file);
    reader.onload =  ()=> {
      this.image = reader.result?.toString()!;
      // console.log(reader.result?.toString() )
      console.log(bas64Image)
      switch(action){
        case 'applicant':
          this.showImage("signature1", this.image, true)
          break;
        case 'taha':
          this.showImage("signature2", this.image, true)
          break;
        case 'redondo':
          this.showImage("signature3", this.image, true)
          break;
        case 'indira':
          this.showImage("signature4", this.image, true)
          break;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  
  mapToObject():any{
    console.log("%%%%5", this.formDataMap)
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

      forApproval: this.formDataMap.get("forApproval")?? this.formData.get("forApproval")?? "",
      forDisapproval: this.formDataMap.get("forDisapproval")?? this.formData.get("forDisapproval")?? "",
      forDisappovalInput: this.formDataMap.get("forDisappovalInput")?? this.formData.get("forDisappovalInput")?? "",
      asOf: this.formDataMap.get("asOf")?? this.formData.get("asOf")?? "",
      vacationLeaveEarned: this.formDataMap.get("vacationLeaveEarned")?? this.formData.get("vacationLeaveEarned")?? "",
      vacationLeaveBalance: this.formDataMap.get("vacationLeaveBalance")?? this.formData.get("vacationLeaveBalance")?? "",
      sickLeaveEarned: this.formDataMap.get("sickLeaveEarned")?? this.formData.get("sickLeaveEarned")?? "",
      sickLeaveBalance: this.formDataMap.get("sickLeaveBalance")?? this.formData.get("sickLeaveBalance")?? "",
      daysWithPay: this.formDataMap.get("daysWithPay")?? this.formData.get("daysWithPay")?? "",
      daysWithoutPay: this.formDataMap.get("daysWithoutPay")?? this.formData.get("daysWithoutPay")?? "",
      others: this.formDataMap.get("others")?? this.formData.get("others")?? "",
      disapprovedDueTo: this.formDataMap.get("disapprovedDueTo")?? this.formData.get("disapprovedDueTo")?? "",

      applicantSignature: this.formData.get("applicantSignature"),
      tahaSignature: this.formData.get("tahaSignature"),
      redondoSignature: this.formData.get("redondoSignature"),
      indiraSignature: this.formData.get("indiraSignature"),
      uid: this.formData.get("uid"),
    }
    return filledFormData;
  }

  sendMessage(message: string){
    const mess:Sms = {
      "mobile_number": this.formStatus.number,
      "message": message,
      "device": "448cd64520ad3e78",
      "device_sim": "2"
    } 
    this.sendMessageService.sendMessage(mess);
    alert("Disapproval message was sent to the employee.")
  }
  
}
