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
  openStep: string = "0";
  requestStatus: string = "requesting"
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  displayedColumns = [ 'name', 'email', 'actions'];
 
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
          [ 'name', 'email', 'actions'] :
          [ 'name', 'email', 'actions'];
  });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.formStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sharedService.loadSpinner = true

    console.log("see dashboard", this.userDetailsService.userDetails)



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
      if(response.formStatus != undefined){
        if(response.formStatus.length != 0){
          this.requestStatus = response.formStatus.status;
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
        status: "pending"
      }
      if(this.requestStatus != "requesting"){
        this.store.dispatch(fromStatusActions.requestAddFormStatusACTION({payload: formStatusData}))
        alert("Leave Application Request Sent!")
      }else{
        alert("Leave Application Request is Already in Process!")
      }
      
      // this.requestStatus = "pending";
      // this.openStep = "1";

      this.formStatusSubscription = this.store.select(selectFormStatus).subscribe((response)=>{
        if(response.formStatus != undefined){
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

export interface Element {
  name: string;
  email: number;
  actions: string;
}

const ELEMENT_DATA: Element[] = [
  { name: 'Hydrogen', email: 1.0079, actions: 'H' },
  { name: 'Helium', email: 4.0026, actions: 'He' },
  { name: 'Lithium', email: 6.941, actions: 'Li' },
  { name: 'Beryllium', email: 9.0122, actions: 'Be' },
  { name: 'Boron', email: 10.811, actions: 'B' },
  { name: 'Carbon', email: 12.0107,actions: 'C' },
  { name: 'Nitrogen', email: 14.0067,actions: 'N' },
  { name: 'Oxygen', email: 15.9994,actions: 'O' },
  { name: 'Fluorine', email: 18.9984,actions: 'F' },
  { name: 'Neon', email: 20.1797,actions: 'Ne' },
  { name: 'Sodium', email: 22.9897,actions: 'Na' },
  { name: 'Magnesium', email: 24.305, actions: 'Mg' },
  { name: 'Aluminum', email: 26.9815,actions: 'Al' },
  { name: 'Silicon', email: 28.0855,actions: 'Si' },
  { name: 'Phosphorus', email: 30.9738,actions: 'P' },
  { name: 'Sulfur', email: 32.065, actions: 'S' },
  { name: 'Chlorine', email: 35.453, actions: 'Cl' },
  { name: 'Argon', email: 39.948, actions: 'Ar' },
  { name: 'Potassium', email: 39.0983,actions: 'K' },
  { name: 'Calcium', email: 40.078, actions: 'Ca' },
];
