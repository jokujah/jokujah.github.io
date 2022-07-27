import { ToastrService } from 'ngx-toastr';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { addArrayValues, emptyVisualisation, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, visualisationMessages } from 'src/app/utils/helpers';
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

  totalValueofContractsPM: any = 0;
  topTenHighestContractsPM: any = [];
  topTenHighestNumberOfContractsPM: any = [];
  totalNumberofContractsPM: any = 0;

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
    
    let percentageUnderReview = 0

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data[0]
        if (response.data.length > 0) {
          this.numberOfContracts = data?.totalNoOfAwards ? sanitizeCurrencyToString(data?.totalNoOfAwards) : 0
          this.valueOfContracts = data?.totalEstimatedValueOfAwards ? sanitizeCurrencyToString(data?.totalEstimatedValueOfAwards) : 0
          this.numberOfReviewedContracts = data?.totalNoUnderReview ? sanitizeCurrencyToString(data?.totalNoUnderReview) : 0
          this.valueOfReviewedContracts = data?.totalAmountUnderReview ? sanitizeCurrencyToString(data?.totalAmountUnderReview):0

          if((parseInt(data?.totalNoUnderReview) > 0)  &&  (parseInt(data?.totalNoOfAwards) > 0)){
              percentageUnderReview = Math.floor((parseInt(data?.totalNoUnderReview)/parseInt(data?.totalNoOfAwards))*100)
          }else{
            percentageUnderReview = 0
          }
          
          let series = [percentageUnderReview?percentageUnderReview:0]

          if (series.length > 0) {
            this.initRadialBar(series)
          }else{
            this.initRadialBar([0])
          }

        }
        this.isLoading = false
        },
      (error) => {
        this.initRadialBar([0])
        this.isLoading = false
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.totalValueofContractsPM = 0; 
    this.topTenHighestContractsPM = [];
    this.topTenHighestNumberOfContractsPM = [];
    this.totalNumberofContractsPM = 0;

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response) => {
        let data = response.data
        let valueOfItems = []
        let numberOfItems = []

        if (data.length > 0) {
          this.topTenHighestContractsPM = data.map(element=>element).sort(function (a, b) {
            var nameA = a?.totalAmountUnderReview ? a?.totalAmountUnderReview.split(','):['0']
            var nameB = b?.totalAmountUnderReview ? b?.totalAmountUnderReview.split(','):['0']
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
          
          this.topTenHighestContractsPM.forEach(element => {
            var valueC = (element?.totalAmountUnderReview)?(element?.totalAmountUnderReview.split(',')):['0'];
            var valueD = parseInt(valueC.join(''))
            valueOfItems.push(valueD)
          });


          this.topTenHighestNumberOfContractsPM = data.map((element)=>element).sort(function (a, b) {
            var nameA = a?.totalNoUnderReview ? a?.totalNoUnderReview.split(','):['0']
            var nameB = b?.totalNoUnderReview ? b?.totalNoUnderReview.split(','):['0']
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
          
          this.topTenHighestNumberOfContractsPM.forEach(element => {
            var valueC = (element?.totalNoUnderReview)?(element?.totalNoUnderReview.split(',')):['0'];
            var valueD = parseInt(valueC.join(''))
            numberOfItems.push(valueD)
          });

          this.totalValueofContractsPM = addArrayValues(valueOfItems)
          this.totalNumberofContractsPM = addArrayValues(numberOfItems)          
        }
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        throw error
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
     this.chartOptions = {
      // series: [
      //   {
      //     name: "Contract Value",
      //     type: "column",
      //     data: []
      //   },
      //   {
      //     name: "Number of Contracts",
      //     type: "line",
      //     data: []
      //   }
      // ],
      series: [],
      chart: {
        height: 500,
        type: "bar",
        fontFamily:'Trebuchet Ms',
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
          //columnWidth: "55%",
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
          //showForNullSeries: false,
          labels: {
            style: {
              fontSize: "12px"
            },
            formatter: function(val) {
              return NumberSuffix(val,0)}
          }               
        },
        {
          opposite: true,
          //showForNullSeries: false,
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
