import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationFormComponent } from './application-form.component';
import { StarterRoutes } from './starter.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilledFormComponent } from './components/filled-form/filled-form.component';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [ApplicationFormComponent, FilledFormComponent]
})
export class StarterModule {}
