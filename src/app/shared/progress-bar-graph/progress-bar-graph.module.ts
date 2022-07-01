import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarGraphComponent } from './progress-bar-graph.component';



@NgModule({
  declarations: [
    ProgressBarGraphComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports:[
    ProgressBarGraphComponent
  ]
})
export class ProgressBarGraphModule { }
