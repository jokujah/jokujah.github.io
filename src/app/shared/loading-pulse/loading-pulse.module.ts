import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPulseComponent } from './loading-pulse.component';



@NgModule({
  declarations: [
    LoadingPulseComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingPulseComponent
  ]
})
export class LoadingPulseModule { }
