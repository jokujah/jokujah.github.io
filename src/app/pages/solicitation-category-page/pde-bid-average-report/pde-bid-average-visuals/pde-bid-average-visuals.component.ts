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

  @ViewChild('chart') chart!: ChartComponent;
  public optionsProgress1: Partial<ChartOptions> | any;
  public optionsProgress2: Partial<ChartOptions> | any;
  public optionsProgress3: Partial<ChartOptions> | any;
  public optionsProgress4: Partial<ChartOptions> | any;
  public optionsProgress5: Partial<ChartOptions> | any;
  public optionsProgress6: Partial<ChartOptions> | any;
  public optionsProgress7: Partial<ChartOptions> | any;
  public optionsProgress8: Partial<ChartOptions> | any;
  public optionsProgress9: Partial<ChartOptions> | any;
  public optionsProgress10: Partial<ChartOptions> | any;
  public optionsProgress11: Partial<ChartOptions> | any;
  public optionsProgress12: Partial<ChartOptions> | any;
  public optionsProgress13: Partial<ChartOptions> | any;
  public optionsProgress14: Partial<ChartOptions> | any;
  public optionsProgress15: Partial<ChartOptions> | any;
  public optionsProgress16: Partial<ChartOptions> | any;


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
          this.cardValue1 = data.numberOfBids ? sanitizeCurrencyToString(data.numberOfBids) : 0;
          this.cardValue2 = data.numberOfBidsRespondedTo ? sanitizeCurrencyToString(data.numberOfBidsRespondedTo) : 0
          this.cardValue3 = data.numberOfProvidersThatResponded ? sanitizeCurrencyToString(data.numberOfProvidersThatResponded) : 0
          this.cardValue4 = data.noOfNoticeResponses ? sanitizeCurrencyToString(data.noOfNoticeResponses) : 0
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


            this.initAvgBidsChart1(data[0]?.procurementMethod ? data[0]?.procurementMethod : 'N/A', data[0]?.avgBids ? data[0]?.avgBids : 0);
            this.initAvgBidsChart2(data[1]?.procurementMethod ? data[1]?.procurementMethod : 'N/A', data[1]?.avgBids ? data[1]?.avgBids : 0);
            this.initAvgBidsChart3(data[2]?.procurementMethod ? data[2]?.procurementMethod : 'N/A', data[2]?.avgBids ? data[2]?.avgBids : 0);
            this.initAvgBidsChart4(data[3]?.procurementMethod ? data[3]?.procurementMethod : 'N/A', data[3]?.avgBids ? data[3]?.avgBids : 0);
            this.initAvgBidsChart5(data[4]?.procurementMethod ? data[4]?.procurementMethod : 'N/A', data[4]?.avgBids ? data[4]?.avgBids : 0);
            this.initAvgBidsChart6(data[5]?.procurementMethod ? data[5]?.procurementMethod : 'N/A', data[5]?.avgBids ? data[5]?.avgBids : 0);
            this.initAvgBidsChart7(data[6]?.procurementMethod ? data[6]?.procurementMethod : 'N/A', data[6]?.avgBids ? data[6]?.avgBids : 0);
            this.initAvgBidsChart8(data[7]?.procurementMethod ? data[7]?.procurementMethod : 'N/A', data[7]?.avgBids ? data[7]?.avgBids : 0);
            this.initAvgBidsChart9(data[8]?.procurementMethod ? data[8]?.procurementMethod : 'N/A', data[8]?.avgBids ? data[8]?.avgBids : 0);
            this.initAvgBidsChart10(data[9]?.procurementMethod ? data[9]?.procurementMethod : 'N/A', data[9]?.avgBids ? data[9]?.avgBids : 0);
            this.initAvgBidsChart11(data[10]?.procurementMethod ? data[10]?.procurementMethod : 'N/A', data[10]?.avgBids ? data[10]?.avgBids : 0);
            this.initAvgBidsChart12(data[11]?.procurementMethod ? data[11]?.procurementMethod : 'N/A', data[11]?.avgBids ? data[11]?.avgBids : 0);
            this.initAvgBidsChart13(data[12]?.procurementMethod ? data[12]?.procurementMethod : 'N/A', data[12]?.avgBids ? data[12]?.avgBids : 0);
            this.initAvgBidsChart14(data[13]?.procurementMethod ? data[13]?.procurementMethod : 'N/A', data[13]?.avgBids ? data[13]?.avgBids : 0);
            this.initAvgBidsChart15(data[14]?.procurementMethod ? data[14]?.procurementMethod : 'N/A', data[14]?.avgBids ? data[14]?.avgBids : 0);
            this.initAvgBidsChart16(data[15]?.procurementMethod ? data[15]?.procurementMethod : 'N/A', data[15]?.avgBids ? data[15]?.avgBids : 0);

            
            let methodCategories = []
            let numberOfRequisitions= []
            let numberOfPublishedBids = []

          sortArrayBy(this.averageBidsData.map(element=>element),'numberOfRequisitions').forEach(element=>{
              methodCategories?.push(element?.procurementMethod?element?.procurementMethod:'Unknown')
              numberOfRequisitions?.push(element?.numberOfRequisitions?sanitizeCurrencyToString(element?.numberOfRequisitions):0)
              numberOfPublishedBids?.push(element?.numberOfPublishedBids?sanitizeCurrencyToString(element?.numberOfPublishedBids)*(-1):0)
            })
            console.log(numberOfRequisitions)
            console.log(numberOfPublishedBids)
            console.log(methodCategories)


            this.initInitiatedVPublished(numberOfRequisitions,numberOfPublishedBids,methodCategories)
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
          name: "Requisitions",
          data: series1
        },
        {
          name: "Published",
          data: series2
        }
      ],
      title: {
        text: "Published Bids Versus Requisitions Made by Procurement Method",
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
        height: 450,
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
        offsetX:60,
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
        show: categories.length > 0 ? true : false,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        min: function(){
          let array1 = series1
          let array2 = series2.map(element=>element*(-1))
          return (_.first([...array1,...array2].sort(function (a, b) {            
            var valueA = parseInt(a)
            var valueB = parseInt(b)
        
            if (valueA > valueB) {
              return -1;
            }
            if (valueA < valueB) {
              return 1;
            }
            return 0;
          })))  * -1
        },
        max:function(){
          let array1 = series1
          let array2 = series2.map(element=>element*(-1))
          return _.first([...array1,...array2].sort(function (a, b) {            
            var valueA = parseInt(a)
            var valueB = parseInt(b)
        
            if (valueA > valueB) {
              return -1;
            }
            if (valueA < valueB) {
              return 1;
            }
            return 0;
          }))
        },
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

  

  public initAvgBidsChart1(title?: string, percentage?: number)
  {
    this.optionsProgress1 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title,
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
       responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ]
     };
  }

  public initAvgBidsChart2(title?: string, percentage?: number)
  {
    this.optionsProgress2 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart3(title?: string, percentage?: number)
  {
    this.optionsProgress3 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {        
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart4(title?: string, percentage?: number)
  {
    this.optionsProgress4 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart5(title?: string, percentage?: number)
  {
    this.optionsProgress5 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart6(title?: string, percentage?: number)
  {
    this.optionsProgress6 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart7(title?: string, percentage?: number)
  {
    this.optionsProgress7 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart8(title?: string, percentage?: number)
  {
    this.optionsProgress8 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart9(title?: string, percentage?: number)
  {
    this.optionsProgress9 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart10(title?: string, percentage?: number)
  {
    this.optionsProgress10 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart11(title?: string, percentage?: number)
  {
    this.optionsProgress11 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart12(title?: string, percentage?: number)
  {
    this.optionsProgress12 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart13(title?: string, percentage?: number)
  {
    this.optionsProgress13 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart14(title?: string, percentage?: number)
  {
    this.optionsProgress14 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart15(title?: string, percentage?: number)
  {
    this.optionsProgress15 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initAvgBidsChart16(title?: string, percentage?: number)
  {
    this.optionsProgress16 = {
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "12px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "12px"
              }
            },
          }
        },
        {
          breakpoint: 350,
          options: {
            title: {
              floating: true,
              offsetX: -10,
              offsetY: 5,
              text: title,
              style: {
                fontSize: "10px"
              }
            },
            subtitle: {
              floating: true,
              align: "right",
              offsetY: 0,
              text: `${!isNaN(percentage) ? percentage : 0}`,
              style: {
                fontSize: "10px"
              }
            },
          }
        }
      ],
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "15%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 50
       },
       fill: {
         opacity: 1
       },
     };
  }
}



