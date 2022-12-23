import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import { emptyForm } from './empty-form';
import { Store } from '@ngrx/store';
import { selectFormData } from '../store/leave-application-form/leave-application-form.selectors';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../shared/form-questions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  leaveApplicationForm: FormGroup = Object.create(null);
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
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  formData:Map<string, string> = emptyForm;
 
  constructor(
    private router: Router, 
    private store: Store,
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    

  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
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
}
