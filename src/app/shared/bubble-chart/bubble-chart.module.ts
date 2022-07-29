import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartComponent } from './bubble-chart.component';



@NgModule({
  declarations: [
    BubbleChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BubbleChartComponent
  ]
})
export class BubbleChartModule { }
