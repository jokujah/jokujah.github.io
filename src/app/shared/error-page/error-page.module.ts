import { ErrorPageComponent } from './error-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';


@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    ErrorPageRoutingModule
  ],
  exports:[
    ErrorPageComponent
  ]
})
export class ErrorPageModule { }
