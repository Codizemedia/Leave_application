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
import { UserDetailsService } from 'src/app/services/user-details.service';
import { SpinnerComponent } from 'src/app/shared/spinner.component';
import { SharedService } from 'src/app/shared/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';


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
 
  constructor(
    private router: Router, 
    private store: Store,
    private _formBuilder: FormBuilder,
    private userDetailsService: UserDetailsService,
    private spinnerComponent: SpinnerComponent,
    private sharedService: SharedService,
    breakpointObserver: BreakpointObserver
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'name', 'email', 'status'] :
          [ 'name', 'email', 'status'];
  });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.formStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {

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
              return data.uid == this.userDetailsService.userDetails.uid
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
              console.log("see redondo forms", this.dataSource)
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
                console.log("this switch block executed")
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
                break;
            }
          }
        }
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
    if(this.requestForm.valid){
      const statusData = this.requestForm.value;
      const formStatusData: FormStatus = {
        name: statusData.name,
        email: statusData.email,
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

      // this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
      //   if(response.formStatus != undefined){
      //     console.log("see requests", response.formStatus)
      //     // this.formRequests = response.formStatus.status;

          
      //   }
      // })
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
          status: "accepted",
          formId: formStatus.formId
        }
        this.store.dispatch(fromStatusActions.requestUpdateFormStatusACTION({id: formStatus.id!, payload: formAccepted}))
        break;
      case "declined":
        const formDeclined = {
          name: formStatus.name,
          email: formStatus.email,
          status: "declined",
          formId: formStatus.formId
        }
        this.store.dispatch(fromStatusActions.requestUpdateFormStatusACTION({id: formStatus.id!, payload: formDeclined}))
        break;
    }
  }

  processApproval(){
    // this.applicantRole = false ;
    // this.tahaRole = false ;
    // this.redondoRole = false ;
    // this.indiraRole = false;
    // this.isShowApprovalForm = true;
   this.router.navigate(['/application-form'])
  }
}


