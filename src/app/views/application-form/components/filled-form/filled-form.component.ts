import { Component, OnInit, ViewChild } from '@angular/core';
import { AnyAaaaRecord } from 'dns';
// import { SignaturePadComponent } from '@almothafar/angular-signature-pad';
// import { SignaturePad } from 'angular2-signaturepad/signature-pad';
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
  signImage:any;

  constructor() { 
    // this.signaturePad.set('minWidth', 5);
  }

  ngOnInit(): void {
  }

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 0.5,
    'canvasWidth': 300,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(247,247,247)',
  };
  showImage(data: any, signature: any) {
    // console.log("data", data)
    const base64ImageData = signature.toDataURL();
    this.signatureImage = base64ImageData;
    // this.signatureImage = data;
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
