import { DueDeligenceReportService } from './../../../../services/EvaluationCategory/due-deligence-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addArrayValues, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, ApexNoData } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptionsEducationStatus = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  noData: ApexNoData
};

@Component({
  selector: 'app-due-deligence-visuals',
  templateUrl: './due-deligence-visuals.component.html',
  styleUrls: ['./due-deligence-visuals.component.scss']
})
export class DueDeligenceVisualsComponent implements OnInit {
  isLoading:boolean = false 
  @ViewChild("chartEducationStatus")
  chartEducationStatus!: ChartComponent;
  chartOptionsEducationStatus: Partial<ChartOptionsEducationStatus> | any;

  @ViewChild("chartDueDeligence") chartDueDeligence: ChartComponent;
  public chartDueDeligenceOptions: Partial<ChartOptions>;

  


  valueOfBids;
  successfullEvaluatedBidders;
  yearOfBids;
  allEvaluatedBidders;

  topTenHighestContracts 

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');


  
 
  constructor(
    fb: FormBuilder,
    private _dueDeligenceReportService: DueDeligenceReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    this.initCharts()
    this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    //this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')
    

  }

  getFontSize() {
    return Math.max(10, 12);
  }


  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    //this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')

  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.allEvaluatedBidders = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._dueDeligenceReportService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.successfullEvaluatedBidders = data.successful_evaluated_bidders
        this.valueOfBids = sanitizeCurrencyToString(data.total_bid_estimate_value)
        this.allEvaluatedBidders = data.total_evaluated_bidders

        this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.yearOfBids = 0

    console.log(reportName)

    this.chartDueDeligence?.updateOptions({

      series: [],

      xaxis: {
        categories:[],
        labels: {
          style: {
            colors: [
              "#008FFB"
            ],
            fontSize: "12px"
          }
        }            
      },
    })

    this._dueDeligenceReportService.getEvaluationBidsByProvider(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categorieValues=[]
        let numOfBids=[]

        console.log("BIDS",data)
        // data.forEach(element => {
        //   if (element.financial_year == financialYear)
        //   {
        //     x.push(element?.number_of_plans)
        //     var e = element?.estimated_amount.split(',')
        //     y.push(parseInt(e.join('')))
        //   }
        // });

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.total_estimated_value.split(',') 
          var nameB = b?.total_estimated_value.split(',') 
          var valueA = parseInt(nameA.join(''))
          var valueB = parseInt(nameB.join(''))
          
          if (valueA >  valueB) {
            return -1;
          }
          if (valueA < valueB) {
            return 1;
          }
          return 0;
        })

        console.log(this.topTenHighestContracts)
        console.log(x)
        console.log(y)

       


        this.topTenHighestContracts.forEach(element => {
                       

          var valueC = element?.total_estimated_value.split(',')
          var valueD = parseInt(valueC.join(''))
          //if(element?.provider =='none') {categories.push('N/A')}
          categories.push(element.provider)
          categorieValues.push(valueD)
          numOfBids.push(parseInt(element?.number_of_bids_submitted))
        });

        console.log(categories)
        console.log(categorieValues)

        this.chartDueDeligence?.updateOptions({
          series: [
            {
              name: "Estimate Value",
              type: "column",
              data: categorieValues
            },
            {
              name: "Number of Bids",
              type: "line",
              data: numOfBids
            }
          ],
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: [
                  "#008FFB"
                ],
                fontSize: "12px"
              }
            }
          },
        })




          
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('evaluation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-provider',data?.selectedFinancialYear,data?.selectedPDE)
  }

  initCharts(){
    this.chartDueDeligenceOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Bid Providers and Bid Value "
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      
      xaxis: {
        categories: [],
        labels: {
          style: {                
            fontSize: "12px"
          }
        }            
      },
      yaxis: [
        {
          title: {
            text: "Estimated Value"
          },
          labels: {
            style: {
              colors: [
                "#008FFB",
              ],
              fontSize: "12px"
            },
            formatter: function(val) {
              return NumberSuffix(val,2)}
          }               
        },
        {
          opposite: true,
          title: {
            text: "Number of Bids"
          }
        }
      ],
      noData: {
        text: 'No Data...'
      }
      // tooltip: {
      //   y: {
      //     formatter: function(val) {
      //       return "UGX " + NumberSuffix(val,2) ;
      //     }
      //   }
      // }
    };
  }

}
