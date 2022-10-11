import { ToastrService } from 'ngx-toastr';
import { DueDeligenceReportService } from './../../../../services/EvaluationCategory/due-deligence-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addArrayValues, capitalizeFirstLetter, convertNumbersWithCommas, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortArrayBy } from 'src/app/utils/helpers';

import {ApexChart, ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, ApexNoData } from 'ng-apexcharts';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle,
  noData:ApexNoData
  labels: string[];
};

@Component({
  selector: 'app-due-deligence-visuals',
  templateUrl: './due-deligence-visuals.component.html',
  styleUrls: ['./due-deligence-visuals.component.scss']
})
export class DueDeligenceVisualsComponent implements OnInit {
  isLoading:boolean = false 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartBidsByFinancialYear")
  chartBidsByFinancialYear!: ChartComponent;
  chartOptionsBidsByFinancialYear: Partial<ChartOptions> | any;


  valueOfBids;
  successfullEvaluatedBidders;
  yearOfBids;
  allEvaluatedBidders;

  topTenHighestContracts = []

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');

  isEmpty=true

  constructor(
    private _service: PlaningAndForecastingReportService
  ){}

  ngOnInit(): void {}

  submit(data) {
     this.getSummaryStats('due-diligence-summary',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('due-diligence-list-summary',data?.selectedFinancialYear,data?.selectedPDE)    
  }


  reset(data){
    this.getSummaryStats('due-diligence-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('due-diligence-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.allEvaluatedBidders = 0
    this.yearOfBids = financialYear
    


    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log("Due Deligence Reports",response)
        let data = response.data[0]
        
        this.successfullEvaluatedBidders = data.numberOfProcurementsUnderPostQualification?data.numberOfProcurementsUnderPostQualification:0
        this.valueOfBids = data.estimateValue?sanitizeCurrencyToString(data.estimateValue):0
        //this.allEvaluatedBidders =  data.totalEvaluatedBidders?sanitizeCurrencyToString(data.totalEvaluatedBidders):0

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false
        console.log(error)
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true  
    this.topTenHighestContracts = []   

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 

        let data = response.data

        switch (reportName) {
        case 'due-diligence-list-summary':           
            console.log("due-diligence-list-summary", data)
            if (response.data.length > 0) {
              this.topTenHighestContracts = data.sort(function (a, b) {
                var valueA = a.evaluated_total
                var valueB = b.evaluated_total
            
                if (valueA > valueB) {
                  return -1;
                }
                if (valueA < valueB) {
                  return 1;
                }
                return 0;
              })
              .map((element)=>{
                return {
                  ...element,
                  estimated_amount:convertNumbersWithCommas(element?.evaluated_total)
                }
              })

              console.log(this.topTenHighestContracts)
            }else{
              this.topTenHighestContracts = []
            }
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
