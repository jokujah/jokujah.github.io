import { DisposalCategoryPageModule } from './pages/disposal-category-page/disposal-category-page.module';
import { RevenueSourcesCategoryPageModule } from './pages/revenue-sources-category-page/revenue-sources-category-page.module';
import { SupplierPortalCategoryPageModule } from './pages/supplier-portal-category-page/supplier-portal-category-page.module';
import { SolicitationCategoryPageModule } from './pages/solicitation-category-page/solicitation-category-page.module';
import { InitiationCategoryPageModule } from './pages/initiation-category-page/initiation-category-page.module';
import { ReportPageModule } from './pages/report-page/report-page.module';
import { ContractingManagementCategoryPageModule } from './pages/contracting-management-category-page/contracting-management-category-page.module';
import { ContractingCategoryPageModule } from './pages/contracting-category-page/contracting-category-page.module';
import { EvaluationCategoryPageModule } from './pages/evaluation-category-page/evaluation-category-page.module';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { SAVER, getSaver } from './utils/saver.provider';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { EmptyStateComponent } from './shared/empty-state/empty-state.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './utils/global-error-handler.provider';
//import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar/snack-bar';
//import { AnimatedDigitComponent } from './shared/animated-digit/animated-digit.component';

@NgModule({
  declarations: [
    AppComponent,
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
    InitiationCategoryPageModule,
    SolicitationCategoryPageModule,
    EvaluationCategoryPageModule,
    SupplierPortalCategoryPageModule,
    ContractingCategoryPageModule,
    ContractingManagementCategoryPageModule,
    RevenueSourcesCategoryPageModule,
    DisposalCategoryPageModule,
    GoogleChartsModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    ReportPageModule,
    LoginPageModule,


  ],
  providers: [    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    },
    { 
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: SAVER, 
      useFactory: getSaver
    },
    // {
    //   provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
    //   useValue: {duration: 5000}
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
