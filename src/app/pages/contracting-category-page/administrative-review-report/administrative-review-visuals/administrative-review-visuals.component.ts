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

  @ViewChild("chartRadialBar") chartRadialBar: ChartComponent;
  public chartOptionsRadialBar: Partial<ChartOptions> | any;

  isLoading:boolean = false 
  topTenHighestContracts: any;
  valueOfContracts: number;
  numberOfContracts: number;
  yearOfBids: number;
  numberOfReviewedContracts: number;
  valueOfReviewedContracts: number;
  methodWithHighestContractUnderReview: any = 0;
  highestContractUnderReview: any = 0;
  isEmpty: boolean = false;

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
    this.isEmpty = false
    this.numberOfContracts = 0
    this.valueOfContracts = 0
    this.numberOfReviewedContracts = 0
    this.valueOfReviewedContracts = 0
    this.yearOfBids = financialYear
    
    let percentageUnderReview = 0

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.numberOfContracts = data?.totalNoOfAwards ? data?.totalNoOfAwards : 0
          this.valueOfContracts = data?.totalEstimatedValueOfAwards ? sanitizeCurrencyToString(data?.totalEstimatedValueOfAwards) : 0
          this.numberOfReviewedContracts = data?.totalNoUnderReview ? data?.totalNoUnderReview : 0
          this.valueOfReviewedContracts = data?.totalAmountUnderReview ? sanitizeCurrencyToString(data?.totalAmountUnderReview):0


          console.log(data?.totalNoUnderReview)
          console.log(data?.totalNoOfAwards)
          console.log(Math.floor(parseInt(data?.totalNoUnderReview)/parseInt(data?.totalNoOfAwards))*100)

          percentageUnderReview = Math.floor((parseInt(data?.totalNoUnderReview)/parseInt(data?.totalNoOfAwards))*100)

          let series = [percentageUnderReview]

          console.log(series)

          this.initRadialBar(series)
        }else{
          this.isEmpty=true
        }
        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isEmpty=true
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
    this.isEmpty = false

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
      (response) => {
        let data = response.data
        let x = []
        let y = []

        let categories = []
        let categoryValues = []
        let numOfContracts = []

        console.log("REVIEW", data)

        if (data.length > 0) {

          this.topTenHighestContracts = data.sort(function (a, b) {
            var nameA = a?.totalAmountUnderReview.split(',')
            var nameB = b?.totalAmountUnderReview.split(',')
            var valueA = parseInt(nameA.join(''))
            var valueB = parseInt(nameB.join(''))

            if (valueA > valueB) {
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
            if (element.procurementMethod == null) return
            if (element.totalAmountUnderReview == null) return
            if (element.totalNoUnderReview == null) return
            var valueC = element?.totalAmountUnderReview.split(',')
            var valueD = parseInt(valueC.join(''))
            //var valueE = element.procurementMethod.split(' ')
            categories.push(element.procurementMethod)
            categoryValues.push(valueD)
            numOfContracts.push(parseInt(element?.totalNoUnderReview))
          });

          this.methodWithHighestContractUnderReview = categories[0]
          this.highestContractUnderReview = categoryValues[0]

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
        }else{
          this.isEmpty = true
        }
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isEmpty = true
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


  public initRadialBar(series?: any): void {
    this.chartOptionsRadialBar = {
      series: series,
      chart: {
        fontFamily:'Trebuchet MS',
      height: 250,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        } ,dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return `${value}%`;
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
     labels: ['Under Admin Review'],
    };

  }
}
