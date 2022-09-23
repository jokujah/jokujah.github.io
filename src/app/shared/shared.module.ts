import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { ProgressBarGraphModule } from './progress-bar-graph/progress-bar-graph.module';
import { AnimatedDigitModule } from './animated-digit/animated-digit.module';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as excel from "fusioncharts/fusioncharts.excelexport";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ConvertNumbersWithCommasPipe, NumberSuffixPipe } from '../utils/pipes';
import { VisualizationTableComponent } from './visualization-table/visualization-table.component';
import { EmptyStateDetailedReportComponent } from "./empty-state-detailed-report/empty-state-detailed-report.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StatsCardModule } from "./stats-card/stats-card.module";

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,excel);




@NgModule({
  declarations: [
    NumberSuffixPipe,
    ConvertNumbersWithCommasPipe,
    EmptyStateComponent,
    LoaderComponent,
    VisualizationTableComponent,
    EmptyStateDetailedReportComponent
  ],
  imports: [
  CommonModule,
    FusionChartsModule,
    GoogleChartsModule,
    FilterModule,
    MatSelectSearchModule,
    StatsCardModule,
    AnimatedDigitModule
  ],
  exports:[
    FusionChartsModule,
    NumberSuffixPipe,
    ConvertNumbersWithCommasPipe,
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
    EmptyPageModule,
    GoTopButtonModule,
    EmptyStateDetailedReportComponent,
    MatSnackBarModule,
    StatsCardModule,
    AnimatedDigitModule,
    ProgressBarGraphModule,
    BubbleChartModule
  ]
})
export class SharedModule { }
