import { ContractingManagementCategoryPageModule } from './pages/contracting-management-category-page/contracting-management-category-page.module';
import { ContractingCategoryPageModule } from './pages/contracting-category-page/contracting-category-page.module';
import { EvaluationCategoryPageModule } from './pages/evaluation-category-page/evaluation-category-page.module';
import { ContractingManagementCategoryPageComponent } from './pages/contracting-management-category-page/contracting-management-category-page.component';
import { ContractingCategoryPageComponent } from './pages/contracting-category-page/contracting-category-page.component';
import { EvaluationCategoryPageComponent } from './pages/evaluation-category-page/evaluation-category-page.component';
import { PlanningCategoryPageComponent } from './pages/planning-category-page/planning-category-page.component';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
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
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { PlanningCategoryPageModule } from './pages/planning-category-page/planning-category-page.module';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // PlanningCategoryPageComponent,
    // EvaluationCategoryPageComponent,
    // ContractingCategoryPageComponent,
    // ContractingManagementCategoryPageComponent   
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
    ContractingManagementCategoryPageModule
    // MatFormFieldModule,
    // FormsModule,
    // MatSelectModule,
    // ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
