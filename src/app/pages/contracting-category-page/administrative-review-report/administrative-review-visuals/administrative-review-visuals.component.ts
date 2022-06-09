import { ToastrService } from 'ngx-toastr';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNoData, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';

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
  noData:ApexNoData
  plotOptions: ApexPlotOptions;  
  markers: ApexMarkers;  
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};


@Component({
  selector: 'app-administrative-review-visuals',
  templateUrl: './administrative-review-visuals.component.html',
  styleUrls: ['./administrative-review-visuals.component.scss']
})
export class AdministrativeReviewVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  topTenHighestContracts: any;
  valueOfContracts: number;
  numberOfContracts: number;
  yearOfBids: number;
  numberOfReviewedContracts: number;
  valueOfReviewedContracts: number;

  constructor(
    private toastr:ToastrService,
    private _service: AwardedContractReportService) {}

  ngOnInit(): void {
    this.initCharts()
  }

  submit(data) {
    this.getSummaryStats('awards-under-admin-review',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('admin-reviews-by-method',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('awards-under-admin-review',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('admin-reviews-by-method',data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.numberOfContracts = 0
    this.valueOfContracts = 0
    this.numberOfReviewedContracts = 0
    this.valueOfReviewedContracts = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.numberOfContracts =  data.totalNoOfAwards
        this.valueOfContracts = sanitizeCurrencyToString(data.totalEstimatedValueOfAwards)
        this.numberOfReviewedContracts =  data.totalNoUnderReview
        this.valueOfReviewedContracts =sanitizeCurrencyToString(data.totalAmountUnderReview)

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = 0

    this.chart?.updateOptions({

      series: [],

      xaxis: {
        categories:[],
        labels: {
          style: {            
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,2)}
        }            
      },
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categoryValues=[]
        let numOfContracts=[]

        console.log("AWARDED",data)
        // data.forEach(element => {
        //   if (element.financial_year == financialYear)
        //   {
        //     x.push(element?.number_of_plans)
        //     var e = element?.estimated_amount.split(',')
        //     y.push(parseInt(e.join('')))
        //   }
        // });

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.totalAmountUnderReview.split(',') 
          var nameB = b?.totalAmountUnderReview.split(',') 
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

          var valueC = element?.totalAmountUnderReview.split(',')
          var valueD = parseInt(valueC.join(''))
          var valueE = element.procurementMethod.split(' ')
          categories.push(element.procurementMethod)
          categoryValues.push(valueD)
          numOfContracts.push(parseInt(element?.totalNoUnderReview))
        });

        console.log(categories)

        this.chart?.updateOptions({
          series: [
            {
              name: "Contract Value",
              type: "column",
              data: categoryValues
            },
            {
              name: "Number of Contracts",
              type: "column",
              data: numOfContracts
            }
          ],

          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: "12px"
              },
            }
          }
        })

          
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
     this.chartOptions = {
      series: [
        {
          name: "Contract Value",
          type: "column",
          data: []
        },
        {
          name: "Number of Contracts",
          type: "line",
          data: []
        }
      ],
      chart: {
        height: 500,
        type: "bar",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 2000,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 450
          }
      },
      
        
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 2
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Contracts Under Administrative Review by Contract Method"
      },
      dataLabels: {
        enabled: false,
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
            text: "Contract Value"
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
            text: "Number of Contracts"
          }
        }
      ],
      noData: {
        text: 'Loading Data ...'
      }
    };
  }
}
