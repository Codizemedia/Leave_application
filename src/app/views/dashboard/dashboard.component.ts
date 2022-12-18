import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router} from '@angular/router';
import { choicesA, choicesB } from '../../shared/form-questions';
import jsPDF from 'jspdf';
// import pdfMake from "pdfmake";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

declare var require: any;

const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  choices1 = choicesA;
  choices2 = choicesB;
  isOptional = false;
  isEditable = false;
  isShowForm = false;
  // applicationFormAction="Submit Request";
  applicationFormAction="Fill-up Form";
  @ViewChild('pdfTable') pdfTable!: ElementRef;
 


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router 
  ) { 
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  formAction(){
    this.router.navigate(['/application-form'])
  }

  showForm(isShow: boolean){
    this.isShowForm = isShow;
  }

  downloadAsPDF(){
    // window.print();
    //  const doc = new jsPDF();
    // const elementHTML = document.querySelector('#printContent') as HTMLElement;
    // //  doc.text('Hello world!', 20, 20);
    // //  doc.text('This is client-side Javascript to generate a PDF.', 20, 30);

    // const doc = new jsPDF({
    //   unit: 'px',
    //   format: [842, 1191]// this.pdfOptions.value.pageFormat === 'A4' ? [595, 842] : [842, 1191]
    // });

    // // doc.html(elementHTML, {
    // //   callback: function(doc){
    // //     doc.save('document-html.pdf');
    // //   },
    // //   // margin: [10, 10, 10, 10],
    // //   // autoPaging: 'text',
    // //   // x: 0,
    // //   // y: 0,
    // //   // width: 190, 
    // //   // windowWidth: 675
    // // },
    // // )
    //  const pages = document.querySelector('.all-pages') as HTMLElement;
    // // this.workspaceService.exportAllToPDF(pages);
    //  doc.html(pages, {
    //   callback: (doc: jsPDF) => {
    //     doc.deletePage(doc.getNumberOfPages());
    //     doc.save('pdf-export');
    //   }
    // });

    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 

    //  doc.save("table.pdf");

    
  }


}
