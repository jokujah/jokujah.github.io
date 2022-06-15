import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './empty-page.component';



@NgModule({
  declarations: [
    EmptyPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EmptyPageComponent
  ]
})
export class EmptyPageModule { }
