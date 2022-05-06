import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as excel from "fusioncharts/fusioncharts.excelexport";
import { NumberSuffixPipe } from '../utils/pipes';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,excel);



@NgModule({
  declarations: [
    NumberSuffixPipe,
  ],
  imports: [
    CommonModule,
    FusionChartsModule
  ],
  exports:[
    FusionChartsModule,
    NumberSuffixPipe
  ]
})
export class SharedModule { }
