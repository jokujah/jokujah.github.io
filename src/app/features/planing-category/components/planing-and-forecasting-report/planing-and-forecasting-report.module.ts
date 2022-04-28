import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaningAndForecastingReportRoutingModule } from './planing-and-forecasting-report-routing.module';
import { PlaningAndForecastingReportComponent } from './planing-and-forecasting-report.component';


@NgModule({
  declarations: [
    PlaningAndForecastingReportComponent
  ],
  imports: [
    CommonModule,
    PlaningAndForecastingReportRoutingModule
  ]
})
export class PlaningAndForecastingReportModule { }
