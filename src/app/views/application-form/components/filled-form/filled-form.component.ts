import { Component, OnInit, ViewChild } from '@angular/core';
import { AnyAaaaRecord } from 'dns';
// import { SignaturePadComponent } from '@almothafar/angular-signature-pad';
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
export class FilledFormComponent implements OnInit {

  // @ViewChild('signature') public signaturePad!: SignaturePadComponent;

  choices1 = choicesA;
  choices2 = choicesB;
  choices3 = choicesC;
  choices4 = choicesD;
  signatureImage:any;
  points = [];

  constructor() { 
    // this.signaturePad.set('minWidth', 5);
  }

  ngOnInit(): void {
  }

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 150
  };
  showImage(data: any) {
    console.log("data", data)
    this.signatureImage = data;
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    // console.log(this.signaturePad.toDataURL());
    this.signatureImage = event;
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

}
