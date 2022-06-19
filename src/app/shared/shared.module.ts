// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as excel from "fusioncharts/fusioncharts.excelexport";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnimatedDigitComponent } from "./animated-digit/animated-digit.component";
import { CommonModule } from '@angular/common';
import { EmptyPageModule } from './empty-page/empty-page.module';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ErrorPageModule } from './error-page/error-page.module';
import { FilterModule } from './../features/filter/filter.module';
import { FusionChartsModule } from "angular-fusioncharts";
import {GoTopButtonModule} from 'ng-go-top-button';
import { GoogleChartsModule } from 'angular-google-charts';
import { LoaderComponent } from './loader/loader.component';
import { LoadingIconModule } from './loading-icon/loading-icon.module';
import { LoadingPulseModule } from './loading-pulse/loading-pulse.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectSearchModule } from './mat-select-search/mat-select-search.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { NumberSuffixPipe } from '../utils/pipes';
import { VisualizationTableComponent } from './visualization-table/visualization-table.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,excel);




@NgModule({
  declarations: [
    NumberSuffixPipe,
    EmptyStateComponent,
    LoaderComponent,
    AnimatedDigitComponent,
    VisualizationTableComponent
  ],
  imports: [
  CommonModule,
    FusionChartsModule,
    GoogleChartsModule,
    FilterModule,
    MatSelectSearchModule,
  ],
  exports:[
    FusionChartsModule,
    NumberSuffixPipe,
    GoogleChartsModule,
    NgApexchartsModule,
    LoadingIconModule,
    ErrorPageModule,
    LoadingPulseModule,
    FilterModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectSearchModule,
    EmptyStateComponent,
    LoaderComponent,
    AnimatedDigitComponent,
    EmptyPageModule,
    GoTopButtonModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
