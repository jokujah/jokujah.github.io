import { element } from 'protractor';
import { ApexAxisChartSeries, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
} from "ng-apexcharts";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortArrayBy, visualisationMessages } from 'src/app/utils/helpers';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/utils/IChartOptions';
import _ from 'lodash';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   yaxis: ApexYAxis | ApexYAxis[];
//   title: ApexTitleSubtitle;
//   labels: string[];
//   stroke: any; // ApexStroke;
//   dataLabels: any; // ApexDataLabels;
//   fill: ApexFill;
//   tooltip: ApexTooltip;
//   noData:ApexNoData;
//   plotOptions: ApexPlotOptions;
//   legend:ApexLegend;
// };

@Component({
  selector: 'app-pde-bid-average-visuals',
  templateUrl: './pde-bid-average-visuals.component.html',
  styleUrls: ['./pde-bid-average-visuals.component.scss']
})
export class PdeBidAverageVisualsComponent implements OnInit, OnDestroy {

  @ViewChild("chartSolicitationsType") chartSolicitationsType: ChartComponent;
  public chartOptionsSolicitationsType: Partial<ChartOptions>;

  @ViewChild("chartInitiatedVPublished") chartInitiatedVPublished: ChartComponent;
  public chartOptionsInitiatedVPublished: Partial<ChartOptions>;

  @ViewChild('chartBidAverage') chartBidAverage: ChartComponent;
  public chartOptionsBidAverage: Partial<ChartOptions>;

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl(this.financialYears[0]);
  downloading = false
  registeredProviders

  totalValueofPlannedContracts ;
  numberOfPlannedContracts;
  yearOfPlannedContracts ;
  numberOfRegisteredEntities  ;
  topTenHighestContracts = []

  cardValue1: number;
  cardValue2;
  cardValue3;
  cardValue4;
  cardValue5;

  isLoading:boolean = false;
  isLoadingBidsSummary: boolean = false;

  private subscription: Subscription;
  numberOfContracts = [];
  totalValueofContracts = 0;
  highestNumberOfPublishedBids = 0;
  averageBidsByMethod = [];
  averageBidsData = [];

  

  constructor(
    private _planingCategoryService: PlaningAndForecastingReportService
    ) {
    (window as any).Apex = {
      theme: {
        palette: 'palette4',
      },
      colors: ['#01529d', '#775DD0', '#69D2E7', '#FF9800'],
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
  }

  submit(data) {
    this.getSummaryStats('solicitation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('avg-bids-by-method',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-entity-list',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
     this.getSummaryStats('solicitation-summary',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('avg-bids-by-method',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('bids-by-entity-list',data?.selectedFinancialYear,data?.selectedPDE)
  }


  getSummaryStats(reportName, financialYear, procuringEntity) {
    this.isLoading = true
    this.cardValue1 = 0
    this.cardValue2 = 0
    this.cardValue3 = 0
    this.cardValue4 = 0

    this.subscription = this._planingCategoryService.getSummaryStatsWithPDE(reportName, financialYear, procuringEntity).subscribe(
      (response) => {
        this.isLoading = false;
        let data = response.data[0];
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfBids ? data.numberOfBids : 0;
          this.cardValue2 = data.numberOfBidsRespondedTo ? data.numberOfBidsRespondedTo : 0
          this.cardValue3 = data.numberOfProvidersThatResponded ? data.numberOfProvidersThatResponded : 0
          this.cardValue4 = data.noOfNoticeResponses ? data.noOfNoticeResponses : 0
        }
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoadingBidsSummary = true
    this.averageBidsByMethod = []

    this.averageBidsData = []
    this.topTenHighestContracts = []

    this.subscription = this._planingCategoryService.getSummaryStatsWithPDE(reportName, financialYear, procuringEntity).subscribe(
      (response) => {
        this.isLoadingBidsSummary = false;
        let data = response.data;
        let sortedData = []
        
        switch (reportName) {
          case 'bids-by-entity-list':
            sortedData = data.sort(function (a, b) {
              var nameA = a?.numberOfBids.split(',')
              var nameB = b?.numberOfBids.split(',')
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
            this.topTenHighestContracts = sortedData
            this.highestNumberOfPublishedBids = this.topTenHighestContracts[0]?.numberOfBids
            break;

          case 'avg-bids-by-method':
            console.log("avg-bids-by-method", data)
            this.averageBidsData = response.data

            let avgProcurementMethod = []
            let avgBids = []

            this.averageBidsData.map(element => element).forEach(element=>{
              avgProcurementMethod.push(element?.procurementMethod ? element?.procurementMethod:'Unknown');
              avgBids.push(element?.average_no_of_bids ? element?.average_no_of_bids : 0);
            })

            this.initAvgBidsChart(avgBids,avgProcurementMethod)

            let methodCategories = []
            let numberOfBidsRespondedTo= []
            let numberOfBidsPublished = []

          sortArrayBy(this.averageBidsData.map(element=>element),'numberOfBidsRespondedTo').forEach(element=>{
              methodCategories?.push(element?.procurementMethod?element?.procurementMethod:'Unknown')
              numberOfBidsRespondedTo?.push(element?.numberOfBidsRespondedTo?sanitizeCurrencyToString(element?.numberOfBidsRespondedTo):0)
              numberOfBidsPublished?.push(element?.numberOfBids?sanitizeCurrencyToString(element?.numberOfBids)*(-1):0)
            })
            console.log(numberOfBidsRespondedTo)
            console.log(numberOfBidsPublished)
            console.log(methodCategories)


            this.initInitiatedVPublished(numberOfBidsRespondedTo,numberOfBidsPublished,methodCategories)
            break;
        }
        this.isLoading = false
      },
      (error) => {
        this.initInitiatedVPublished([],[],[])
        this.isLoadingBidsSummary = false;
      }
    )
  }





  public initInitiatedVPublished(series1?,series2?,categories?){
    this.chartOptionsInitiatedVPublished = {
      series: [
        {
          name: "Bids Published",
          data: series2
        },
        {
          name: "Bids Responded To",
          data: series1
        },
        
      ],
      title: {
        text: "Bids Responded To Versus Bids Published by Procurement Method",
        align: 'center',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      chart: {
        type: "bar",
        height: series1.length > 4 ? 450 : 250,
        stacked: true,
        fontFamily:'Trebuchet Ms'
      },
      // colors: ["#008FFB", "#FF4560"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
          dataLabels: {
            position: 'top',
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333'],
          fontWeight:'bold',
          fontSize:'12px'
        },
        offsetX:25,
        formatter:function(val){
          if(val < 0){
             return NumberSuffix((val * -1),0)
          }
          return NumberSuffix(val ,0)
        },
        distributed:true
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },

      grid: {       
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false,
            //show: categories.length > 0 ? true : false,
          }
        }
      },
      yaxis: {
        // min: function(){
        //   let array1 = series1
        //   let array2 = series2.map(element=>element*(-1))
        //   return (_.first([...array1,...array2].sort(function (a, b) {            
        //     var valueA = parseInt(a)
        //     var valueB = parseInt(b)
        
        //     if (valueA > valueB) {
        //       return -1;
        //     }
        //     if (valueA < valueB) {
        //       return 1;
        //     }
        //     return 0;
        //   })))  * -1
        // },
        // max:function(){
        //   let array1 = series1
        //   let array2 = series2.map(element=>element*(-1))
        //   return _.first([...array1,...array2].sort(function (a, b) {            
        //     var valueA = parseInt(a)
        //     var valueB = parseInt(b)
        
        //     if (valueA > valueB) {
        //       return -1;
        //     }
        //     if (valueA < valueB) {
        //       return 1;
        //     }
        //     return 0;
        //   }))
        // },
        title: {
          text: 'Procurement Methods',
        },
        floating:categories.length > 0 ? false:true,
        axisTicks: {
          show: categories.length > 0 ? true:false
        },
        axisBorder: {
          show: categories.length > 0 ? true:false
        },
        labels: {
          show: categories.length > 0 ? true:false,
          style: {             
            fontSize: "12px"
          },
          minWidth: 0,
          maxWidth: 400,
          offsetX: -8
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function(val) {
            return val.toString();
          }
        },
        y: {
          formatter: function(val) {
            return Math.abs(val) + "";
          }
        }
      },
      xaxis: {
        floating:categories.length > 0 ? false:true,
        axisTicks: {
          show: categories.length > 0 ? true:false
        },
        axisBorder: {
          show: categories.length > 0 ? true:false
        },
        categories: categories,
        title: {
          text: "Bids"
        },
        labels: {
          formatter: function(val) {
            return Math.abs(Math.round(parseInt(val, 10))) + "";
          }
        }
      },
      noData: {
        text: visualisationMessages('empty')
      },
    };
  }

  public initAvgBidsChart(series1?,categories?){
    this.chartOptionsBidAverage = {
      series: [
        {
          name: "Bid Average",
          data: series1
        }
      ],
      title: {
        text: "Bid Average By Procurement Method(Bids Published / Quotations Received)",
        align: 'center',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      chart: {
        type: "bar",
        height: series1.length > 4 ? 450 : 250,
        stacked: false,
        fontFamily:'Trebuchet Ms'
      },
      // colors: ["#008FFB", "#FF4560"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
          dataLabels: {
            position: 'top',
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333'],
          fontWeight:'bold',
          fontSize:'12px'
        },
        offsetX:40,
        formatter:function(val){
          if(val < 0){
             return NumberSuffix((val * -1),0)
          }
          return NumberSuffix(val ,0)
        },
        distributed:true
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },

      grid: {
        //show: categories.length > 0 ? true : false,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        title: {
          text: 'Procurement Methods',
        },
        floating:categories.length > 0 ? false:true,
        axisTicks: {
          show: categories.length > 0 ? true:false
        },
        axisBorder: {
          show: categories.length > 0 ? true:false
        },
        labels: {
          show: categories.length > 0 ? true:false,
          style: {             
            fontSize: "12px"
          },
          minWidth: 0,
          maxWidth: 400
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function(val) {
            return val.toString();
          }
        },
        y: {
          formatter: function(val) {
            return Math.abs(val) + "";
          }
        }
      },
      xaxis: {
        floating:categories.length > 0 ? false:true,
        axisTicks: {
          show: categories.length > 0 ? true:false
        },
        axisBorder: {
          show: categories.length > 0 ? true:false
        },
        categories: categories,
        title: {
          text: "Bid Average"
        },
        // labels: {
        //   formatter: function(val) {
        //     return val + "";
        //   }
        // }
      },
      noData: {
        text: visualisationMessages('empty')
      },
    };
  }
  
}



