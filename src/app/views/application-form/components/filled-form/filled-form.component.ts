import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  @Input('formData') formData!: string;
  noSinatureAccess:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAA8AQ3AAAAAAXNSR0IArs4c6QAAAvxJREFUeF7t1MEJADAMA7Fm/4HzbKFbHCgTGDl4dvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoDAA9HwhYQ81I0ZAAAAAElFTkSuQmCC";
  hasSignatureAccessApplicant:boolean = true;
  hasSignatureAccessTaha:boolean = true;
  hasSignatureAccessRedondo:boolean = true;
  hasSignatureAccessIndira:boolean = true;
  signatureForm1!: FormGroup;
  signatureForm2!: FormGroup;
  signatureForm3!: FormGroup;
  choices1 = choicesA;
  choices2 = choicesB;
  choices3 = choicesC;
  choices4 = choicesD;
  signatureApplicant:any;
  signatureTaha:any;
  signatureRedondo:any;
  signatureIndira:any;
  points = [];
  signImage:any;

  constructor(private formBuilder: FormBuilder) {
    this.signatureForm1 = this.formBuilder.group({
     signature: new FormControl([''])
    });
  }

  ngOnInit(): void {
    console.log("see form data",this.formData)
  }

  signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 300,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(247,247,247)',
  };
  showImage(action: string, signature: any) {
    
    const base64ImageData = signature.toDataURL();
    console.log("signature", signature)
    console.log("base 64", base64ImageData)

    switch(action){
      case 'signature1':
      this.signatureApplicant = base64ImageData;
      break;
      case 'signature2':
      this.signatureTaha = base64ImageData;
      break;
      case 'signature3':
      this.signatureRedondo= base64ImageData;
      break;
      case 'signature4':
      this.signatureIndira = base64ImageData;
      break;
    }
  }
  display(){
    console.log("see form data",this.formData)
  }


}
