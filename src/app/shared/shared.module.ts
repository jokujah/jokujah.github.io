import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FusionChartsModule
  ],
  exports:[
    FusionChartsModule
  ]
})
export class SharedModule { }
