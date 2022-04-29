import { PlaningReportsListComponent } from './planing-reports-list/planing-reports-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningCategoryPageComponent } from './planning-category-page.component';
import { VisualsComponent } from './planing-and-forecasting-report/visuals/visuals.component';
import { PlaningAndForecastingReportComponent } from './planing-and-forecasting-report/planing-and-forecasting-report.component';
import { ReportsComponent } from './planing-and-forecasting-report/reports/reports.component';


@NgModule({
  declarations: [
    PlanningCategoryPageComponent,
    PlaningAndForecastingReportComponent,
    PlaningReportsListComponent,
    VisualsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PlanningCategoryPageModule { }
