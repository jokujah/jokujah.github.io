import { ReportPageModule } from './pages/report-page/report-page.module';
import { ContractingManagementCategoryPageModule } from './pages/contracting-management-category-page/contracting-management-category-page.module';
import { ContractingCategoryPageModule } from './pages/contracting-category-page/contracting-category-page.module';
import { EvaluationCategoryPageModule } from './pages/evaluation-category-page/evaluation-category-page.module';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FusionChartsModule } from "angular-fusioncharts";


// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as excel from "fusioncharts/fusioncharts.excelexport";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { PlanningCategoryPageModule } from './pages/planning-category-page/planning-category-page.module';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,excel);

import { GoogleChartsModule } from 'angular-google-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';
import { HttpServiceInterceptor } from './interceptors/HttpInterceptor/http-service.interceptor';


@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    FusionChartsModule,
    DashboardModule,
    PlanningCategoryPageModule,
    EvaluationCategoryPageModule,
    ContractingCategoryPageModule,
    ContractingManagementCategoryPageModule,
    GoogleChartsModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    ReportPageModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
