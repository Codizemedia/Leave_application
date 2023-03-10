import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationFormComponent } from './application-form.component';
import { StarterRoutes } from './starter.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilledFormComponent } from './components/filled-form/filled-form.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    SignaturePadModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [
    ApplicationFormComponent, 
    FilledFormComponent,
    DashboardComponent
  ],
  exports: [RouterModule]
})
export class StarterModule {}
