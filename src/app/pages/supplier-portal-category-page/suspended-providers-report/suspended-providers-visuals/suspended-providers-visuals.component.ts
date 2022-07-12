import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, sortTable, visualisationMessages } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import html2canvas from 'html2canvas';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  noData:ApexNoData;
  plotOptions: ApexPlotOptions;
  legend:ApexLegend;
  annotations: any; //ApexAnnotations;
  grid: ApexGrid;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-suspended-providers-visuals',
  templateUrl: './suspended-providers-visuals.component.html',
  styleUrls: ['./suspended-providers-visuals.component.scss']
})
export class SuspendedProvidersVisualsComponent implements OnInit {

  @ViewChild("chartSuspendedProviders") chartSuspendedProviders: ChartComponent;
  public chartOptionsSuspendedProviders: Partial<ChartOptions>; 

  @ViewChild("chartPercentageSuspended") chartPercentageSuspended: ChartComponent;
  public chartOptionsPercentageSuspended: Partial<ChartOptions>; 

  downloading = false
  isLoading:boolean = false

  dir
  sortTable = sortTable


  cardValue1 ;
  cardValue2 ;
  cardValue3 ;
  suspendedProviders: any;
  percentageOfSuspendedProviders: any;

  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService) {

  }

  ngOnInit(): void {
    this.getSummaryStats('suspended-providers-summary',null,null)
    this.getVisualisation('suspended-suppliers-list-summary',null,null) 
  }

  submit(data) {
    this.getSummaryStats('suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('suspended-suppliers-list-summary',data?.selectedFinancialYear,data?.selectedPDE)    
  }
  
  reset(data){
    this.getSummaryStats('suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('suspended-suppliers-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName, financialYear, procuringEntity) {
    this.isLoading = true
    this.cardValue1 = 0
    this.cardValue2 = 0
    this.cardValue3 = 0

    this._planingCategoryService.getSummaryStatsWithPDE(reportName, financialYear, procuringEntity).subscribe(
      (response) => {
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfProvidersNotSuspended?parseInt(data.numberOfProvidersNotSuspended):0
          this.cardValue2 = data.numberOfSuspendedProviders?parseInt(data.numberOfSuspendedProviders):0  

          this.percentageOfSuspendedProviders = ((this.cardValue2/(this.cardValue1+this.cardValue2))*100).toFixed(2) 
        }        
        this.isLoading = false;
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true   

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
          switch (reportName) {
            case'suspended-suppliers-list-summary':
              this.suspendedProviders = data  
            break;
          }

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;        
        throw error
      }
    )
  } 

}
