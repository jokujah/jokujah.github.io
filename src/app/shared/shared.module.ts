import { LoadingPulseModule } from './loading-pulse/loading-pulse.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { LoadingIconModule } from './loading-icon/loading-icon.module';
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

import { GoogleChartsModule } from 'angular-google-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    NumberSuffixPipe,
  ],
  imports: [
    CommonModule,
    FusionChartsModule,
    GoogleChartsModule
  ],
  exports:[
    FusionChartsModule,
    NumberSuffixPipe,
    GoogleChartsModule,
    NgApexchartsModule,
    LoadingIconModule,
    ErrorPageModule,
    LoadingPulseModule
  ]
})
export class SharedModule { }
