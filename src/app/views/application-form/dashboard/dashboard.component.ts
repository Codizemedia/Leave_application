import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { emptyForm } from './empty-form';
import { Store } from '@ngrx/store';
import { selectFormData } from '../../store/leave-application-form/leave-application-form.selectors';
import { Subscription } from 'rxjs';
import { selectUserDetails } from '../../store/user-details/user-details.selectors';
import * as fromStatusActions from '../../store/form-status/form-status.actions';
import * as formDataActions from '../../store/leave-application-form/leave-application-form.actions';
import { FormStatus } from 'src/app/models/form-status.model';
import { selectFormStatus } from '../../store/form-status/form-status.selectors';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../../shared/form-questions';
import { SendMessageService } from 'src/app/shared/send-message/send-message.service';
import { Sms } from 'src/app/models/sms.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('pdfTable') pdfTable!: ElementRef;
  requestForm: FormGroup = Object.create(null);
  choices1 = choicesA;
  choices2 = choicesB;
  choices3 = choicesC;
  choices4 = choicesD;
  isOptional = false;
  isEditable = false;
  isShowForm = false;
  applicationFormAction="Fill-up Form";
  noSinatureAccess:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAA8AQ3AAAAAAXNSR0IArs4c6QAAAvxJREFUeF7t1MEJADAMA7Fm/4HzbKFbHCgTGDl4dvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoDAA9HwhYQ81I0ZAAAAAElFTkSuQmCC";
  applicantSignature:string = this.noSinatureAccess;
  tahaSignature: string = this.noSinatureAccess;
  redondoSignature: string = this.noSinatureAccess;
  indiraSignature: string = this.noSinatureAccess;
  formSubscription!: Subscription;
  userDetailsSubscription!: Subscription;
  formStatusSubscription!: Subscription;
  userName: string = ""; 
  formData:Map<string, string> = emptyForm;
  adminRole: boolean = false;
  applicantRole: boolean = false;  
  tahaRole: boolean = false;
  redondoRole: boolean = false;
  indiraRole: boolean = false;
  isShowApprovalForm: boolean = false;
  openStep: string = "0";
  requestStatus: string = "requesting";
  formRequests: any[] = [];
  tahaForms: any[] = [];
  redondoForms: any[] = [];
  indiraForms: any[] = [];
  displayedColumns = [ 'name', 'email', 'status'];
  dataSource = new MatTableDataSource<any>(this.formRequests);
  currentFormStatus!: FormStatus;
 
  constructor(
    private router: Router, 
    private store: Store,
    private _formBuilder: FormBuilder,
    private userDetailsService: UserDetailsService,
    private sharedService: SharedService,
    private sendMessageService: SendMessageService,
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    this.requestForm = this._formBuilder.group({
      name: ['',],
      email: [''],
      number: ['+639'],
    });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.formStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.formSubscription = this.store.select(selectFormData).subscribe((response)=>{
      const selectedData = response.selectedForm;
      const data:any[] = response.formData
      if(data != undefined && data.length != 0){
        // console.log("see response", response)
        for(let formData of response.formData){
          // console.log("===========")
          formData.uid === localStorage.getItem("uid")
          // console.log(formData.uid, '===', localStorage.getItem("uid"))
          if(formData.uid === localStorage.getItem("uid")){
            this.formData = new Map(Object.entries(response.formData[0]));
          }
        }
        this.applicantSignature = this.formData.get("applicantSignature") != "" ? this.formData.get("applicantSignature")!: this.noSinatureAccess;
        this.tahaSignature = this.formData.get("tahaSignature") != "" ? this.formData.get("tahaSignature")!: this.noSinatureAccess;
        this.redondoSignature = this.formData.get("redondoSignature") != "" ? this.formData.get("redondoSignature")!: this.noSinatureAccess;
        this.indiraSignature = this.formData.get("indiraSignature") != "" ? this.formData.get("indiraSignature")!: this.noSinatureAccess;
      }
      if(selectedData != undefined){
        this.applicantSignature = selectedData.get("applicantSignature") != "" ? selectedData.get("applicantSignature"): this.noSinatureAccess;
        this.tahaSignature = selectedData.get("tahaSignature") != "" ? selectedData.get("tahaSignature"): this.noSinatureAccess;
        this.redondoSignature = selectedData.get("redondoSignature") != "" ? selectedData.get("redondoSignature"): this.noSinatureAccess;
        this.indiraSignature = selectedData.get("indiraSignature") != "" ? selectedData.get("indiraSignature"): this.noSinatureAccess;
      }
    })

    this .userDetailsSubscription = this.store.select(selectUserDetails).subscribe((response)=>{
      if(response.userDetails != undefined){
        this.userName = response.userDetails[0].name
        switch(this.userDetailsService.userDetails.userRole){
          case "applicant":
            this.applicantRole = true;
            break;
          case "admin":
            this.adminRole = true;
            break;
          case "admin-taha":
            this.tahaRole = true;
            this.openStep = "2"
            break;
          case "admin-redondo":
            this.redondoRole = true;
            this.openStep = "3"
            break;
          case "admin-indira":
            this.indiraRole = true;
            this.openStep = "4"
            break;
        }
      }
    })

    this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
      if(response.formStatus != undefined){
        if(response.formStatus.length != 0){
          const currentUserForm = response.formStatus.filter((data:any)=>{

              return data.uid == localStorage.getItem("uid")
          })
          switch(this.userDetailsService.userDetails.userRole){
            case "applicant":
              this.dataSource = new MatTableDataSource<any>(response.formStatus);
              break;
            case "admin":
              this.dataSource = new MatTableDataSource<any>(response.formStatus);
              break;
            case "admin-taha":
              this.tahaForms = response.formStatus.filter((data:any)=>{
                return data.status == "taha-approval"
              })
              this.dataSource = new MatTableDataSource<any>(this.tahaForms);
              break;
            case "admin-redondo":
              this.redondoForms = response.formStatus.filter((data:any)=>{
                return data.status == "redondo-approval"
              })
              
              this.dataSource = new MatTableDataSource<any>(this.redondoForms);
  
              break;
            case "admin-indira":
              this.indiraForms = response.formStatus.filter((data:any)=>{
                return data.status == "indira-approval"
              })
              this.dataSource = new MatTableDataSource<any>(this.indiraForms);
              break;
          }
          if(currentUserForm.length != 0 && this.applicantRole){
            
            switch(currentUserForm[0].status){
              case "pending":
                this.requestStatus = "pending";
                break;
              case "accepted":
                this.openStep = "1";
                break;
              case "declined":
                this.requestStatus = "declined";
                break;
              case "taha-approval":
                this.openStep = "2"
                break;
              case "redondo-approval":
                this.openStep = "3"
                break;
              case "indira-approval":
                this.openStep = "4"
                break;
              case "done":
                this.openStep = "5"
                this.currentFormStatus = currentUserForm[0];
                break;
            }
          }
        }
      }
    })
  }

  formAction(){
    this.router.navigate(['/application/form'])
  }

  showForm(isShow: boolean){
    this.isShowForm = isShow;
  }

  downloadAsPDF(){
    let DATA: any = document.getElementById('pdfTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = ((canvas.height * fileWidth) / canvas.width) - 50 ;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Leave Application Form.pdf');
    });
  }

  sendReuqest(){
    if(this.requestForm.value.name != "" && this.requestForm.value.email != "" ){
      console.log("requestign")
     try{
        if(this.formData.get("id") != undefined &&  this.currentFormStatus.id != undefined){
          this.store.dispatch(formDataActions.requestDeleteFormDataACTION({payload: this.formData.get("id")!}))
          this.store.dispatch(fromStatusActions.requestDeleteFormStatusACTION({payload: this.currentFormStatus.id!}))
        }
      }catch(e){
        console.log('see error', e)
        // alert("something went wrong");
      }
      const statusData = this.requestForm.value;
      const formStatusData: FormStatus = {
        name: statusData.name,
        email: statusData.email,
        number: statusData.number,
        status: "pending",
        uid: this.userDetailsService.userDetails.uid,
        formId: ""
      }
      if(this.requestStatus == "requesting"){
        this.store.dispatch(fromStatusActions.requestAddFormStatusACTION({payload: formStatusData}))
        alert("Leave Application Request Sent!")
      }else{
        alert("Leave Application Request is Already in Process!")
      }

    }else{
      alert("Invalid name or email")
    }
  }
  resendRequest(){
    this.requestStatus = "requesting";
  }

  decideFormRequest(action: string, formStatus: FormStatus){
    switch(action){
      case "accepted":
        const formAccepted = {
          name: formStatus.name,
          email: formStatus.email,
          number: formStatus.number,
          status: "accepted",
          formId: formStatus.formId
        }
        this.store.dispatch(fromStatusActions.requestUpdateFormStatusACTION({id: formStatus.id!, payload: formAccepted}))
        break;
      case "declined":
        const message:Sms = {
          "mobile_number": formStatus.number,
          "message": "Your request is not accepted",
          "device": "448cd64520ad3e78",
          "device_sim": "2"
        } 
        this.sendMessageService.sendMessage(message);
        const formDeclined = {
          name: formStatus.name,
          email: formStatus.email,
          number: formStatus.number,
          status: "declined",
          formId: formStatus.formId
        }
        this.store.dispatch(fromStatusActions.requestUpdateFormStatusACTION({id: formStatus.id!, payload: formDeclined}))
        break;
    }
  }

  processApproval(formStatus: any){
    this.store.select(selectFormData).subscribe((response)=>{
      const userForm = response.formData.filter((form:any)=>{
        return form.id == formStatus.formId
      })
      this.userDetailsService.selectedForm = userForm[0];
      this.router.navigate(['/application/form'])
    })
  }
  requestAnotherForm(){
    this.openStep = "0";
  }
}


