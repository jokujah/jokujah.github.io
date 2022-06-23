import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedDigitComponent } from './animated-digit.component';



@NgModule({
  declarations: [
    AnimatedDigitComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AnimatedDigitComponent
  ]
})
export class AnimatedDigitModule { }
