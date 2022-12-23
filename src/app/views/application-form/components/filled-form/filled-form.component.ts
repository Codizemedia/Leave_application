import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as formDataActions from '../../../store/leave-application-form/leave-application-form.actions';
import { 
  choicesA, 
  choicesB,
  choicesC,
  choicesD } from '../../../../shared/form-questions';
import { selectFormData } from 'src/app/views/store/leave-application-form/leave-application-form.selectors';

@Component({
  selector: 'app-filled-form',
  templateUrl: './filled-form.component.html',
  styleUrls: ['./filled-form.component.scss']
})
export class FilledFormComponent implements OnInit {

  @Input('formData') formData: any = {};
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
  signatureApplicant:string = "";
  tahaSignature:string = "";
  redondoSignature:string = "";
  indiraSignature:string = "";
  points = [];
  signImage:any;
 

  constructor(
    private formBuilder: FormBuilder,
    private store: Store) {
    this.signatureForm1 = this.formBuilder.group({
     signature: new FormControl([''])
    });
  }

  ngOnInit(): void {
  }

  signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 300,
    'canvasHeight': 100,
    'backgroundColor': 'rgb(247,247,247)',
  };
  showImage(action: string, signature: any) {
    
    const base64ImageData = signature.toDataURL();
    let formDataMap = this.formData

    switch(action){
      case 'signature1':
      this.signatureApplicant = base64ImageData;
      formDataMap.set("applicantSignature", this.signatureApplicant)
      break;
      case 'signature2':
      this.tahaSignature = base64ImageData;
      formDataMap.set("tahaSignature", this.tahaSignature)
      break;
      case 'signature3':
      this.redondoSignature= base64ImageData;
      formDataMap.set("redondoSignature", this.redondoSignature)
      break;
      case 'signature4':
      this.indiraSignature = base64ImageData;
      formDataMap.set("indiraSignature", this.indiraSignature)
      break;
    }

     
    
    

    this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: this.formData}))
  }
  display(){
    console.log("see form data",this.formData)
    console.log("other data ==== ", this.formData.get("officeOrDepartment"))
    // this.store.dispatch(formDataActions.requestSelectFormDataACTION({payload: }))
    // this.store.select(selectFormData).subscribe((response: any)=>{
    //   console.log("see reponse", response)
    // })
    let formDataMap = this.formData
    formDataMap.set("signatureApplicant", this.signatureApplicant)
    console.log("see type === ", typeof(this.formData))
  }
}
