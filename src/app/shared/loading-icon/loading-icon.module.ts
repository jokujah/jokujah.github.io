import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from './loading-icon.component';



@NgModule({
  declarations: [
    LoadingIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingIconComponent
  ]
})
export class LoadingIconModule { }
