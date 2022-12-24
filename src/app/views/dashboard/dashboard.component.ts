import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { emptyForm } from './empty-form';
import { Store } from '@ngrx/store';
import { selectFormData } from '../store/leave-application-form/leave-application-form.selectors';
import { Subscription } from 'rxjs';
import { selectUserDetails } from '../store/user-details/user-details.selectors';
import * as fromStatusActions from '../store/form-status/form-status.actions';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../shared/form-questions';
import { FormStatus } from 'src/app/models/form-status.model';
import { selectFormStatus } from '../store/form-status/form-status.selectors';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // leaveApplicationForm: FormGroup = Object.create(null);
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
  applicantRole: boolean = false;  
  tahaRole: boolean = false;
  redondoRole: boolean = false;
  indiraRole: boolean = false;
  openStep: string = "0";
  requestStatus: string = "requesting"
  @ViewChild('pdfTable') pdfTable!: ElementRef;
 
  constructor(
    private router: Router, 
    private store: Store,
    private _formBuilder: FormBuilder
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    

  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.formStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.requestStatus = "not-accepted"
    this.formSubscription = this.store.select(selectFormData).subscribe((response)=>{
      const data = response.selectedFormData;
      if(data != undefined){
        this.formData = data;
        this.applicantSignature = data.get("applicantSignature") != "" ? data.get("applicantSignature"): this.noSinatureAccess;
        this.tahaSignature = data.get("tahaSignature") != "" ? data.get("tahaSignature"): this.noSinatureAccess;
        this.redondoSignature = data.get("redondoSignature") != "" ? data.get("redondoSignature"): this.noSinatureAccess;
        this.indiraSignature = data.get("indiraSignature") != "" ? data.get("indiraSignature"): this.noSinatureAccess;
      }
    })

    this.requestForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

    this .userDetailsSubscription = this.store.select(selectUserDetails).subscribe((response)=>{
      if(response.userDetails != undefined){
        console.log("--", response.userDetails)
        this.userName = response.userDetails[0].name
        switch(response.userDetails[0].userRole){
          case "applicant":
            this.applicantRole = true;
            break;
          case "admin-taha":
            this.tahaRole = true;
            break;
          case "admin-redondo":
            this.redondoRole = true;
            break;
          case "admin-indira":
            this.indiraRole = true;
            break;
        }
      }
    })

    this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
      console.log("see response == formstatus ==",response.formStatus)
      if(response.formStatus != undefined){
        console.log("suppose to execute")
        this.requestStatus = response.formStatus.status;
      }
    })

  }

  formAction(){
    this.router.navigate(['/application-form'])
  }

  showForm(isShow: boolean){
    this.isShowForm = isShow;
  }

  downloadAsPDF(){
    let DATA: any = document.getElementById('pdfTable');
    html2canvas(DATA).then((canvas) => {
    console.log("see canvaas", canvas)
      let fileWidth = 208;
      let fileHeight = ((canvas.height * fileWidth) / canvas.width) - 50 ;
      console.log("file height", fileHeight)
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Leave Application Form.pdf');
    });
  }

  sendReuqest(){
    if(this.requestForm.valid){
      const statusData = this.requestForm.value;
      const formStatusData: FormStatus = {
        name: statusData.name,
        email: statusData.email,
        status: "pending"
      }
      this.store.dispatch(fromStatusActions.requestAddFormStatusACTION({payload: formStatusData}))
      alert("Leave Application Request Sent!")
      // this.requestStatus = "pending";
      // this.openStep = "1";

      this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
        console.log("see response == formstatus ==",response)
        console.log("request status", this.requestStatus)
        if(response.formStatus != undefined){
          console.log("suppose to execute")
          this.requestStatus = response.formStatus.status;
        }
      })
    }else{
      alert("Invalid name or email")
    }
  }
  resendRequest(){
    this.requestStatus = "requesting";
  }
}
