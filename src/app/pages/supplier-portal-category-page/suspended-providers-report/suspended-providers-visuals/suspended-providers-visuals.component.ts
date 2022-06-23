import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, sortTable } from 'src/app/utils/helpers';

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
  percentageOfSuspendedProviders: number;

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) {

  }

  ngOnInit(): void {
    this.initCharts()
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
        console.log(data)

        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfProvidersNotSuspended?parseInt(data.numberOfProvidersNotSuspended):0
          this.cardValue2 = data.numberOfSuspendedProviders?parseInt(data.numberOfSuspendedProviders):0  
          this.cardValue3 = 97      
          this.percentageOfSuspendedProviders = Math.floor((this.cardValue2/(this.cardValue1+this.cardValue2))*100 ) 
        }

        var suspendedValues = [this.cardValue2 ,this.cardValue1]

        // this.chartPercentageSuspended.updateOptions({
        //   series: suspendedValues,          
        //   //labels: ["Suspended","Not Suspended"],          
        // })
        
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

    this.chartSuspendedProviders?.updateOptions({

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
      noData: {
        text: 'Loading Data ...'
      } 
    })

    console.log(`Visualistion ${reportName} + ${financialYear} + ${procuringEntity}`,)

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
          switch (reportName) {
            case'suspended-suppliers-list-summary':
              console.log(`Report Name ${reportName}`)
              console.log('Report Data',data)
              let providers = []
              let suspensionDaysLeft = []

              this.suspendedProviders = data
              data.forEach(element => {
                providers.push(element?.providerName)
                //calculate days here
                //suspensionDaysLeft.push(suspensionEndDate - suspensionStartDate)
                
              });
              this.chartSuspendedProviders?.updateOptions({

                series: [
                  {
                    name: "Days of Suspension Left",
                    data: [100, 250]
                  }
                ],
          
                xaxis: {
                  categories:providers,                            
                },
                noData: {
                  text: 'No Data Available...'
                } 
              })
            break;
          }

        this.isLoading = false
        },
      (error) => {
        console.log(error)
        this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        
        this.chartSuspendedProviders?.updateOptions({
    
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
          noData: {
            text: 'Error Loading Data ...'
          } 
        })
        this.isLoading = false
        throw error
      }
    )

  } 

   getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    // this.chartOptionsSuspendedProviders = {
    //   series: [
    //     {
    //       name: "Contract Award Value",
    //       type: "column",
    //       data: []
    //     }
    //   ],
    //   chart: {
    //     fontFamily: 'Trebuchet MS',
    //     height: 350,
    //     type: "bar"
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //       columnWidth: "35%",
    //       borderRadius: 2
    //     }
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ["transparent"]
    //   },
    //   title: {
    //     text: "Suspended Suppliers by Period of Suspension",
    //     style: {
    //       fontSize:  '14px',
    //       fontWeight:  'bold',
    //       color:  '#263238'
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     enabledOnSeries: [1]
    //   },

    //   xaxis: {
    //     categories: [],
    //     labels: {
    //       style: {
    //         fontSize: "12px"
    //       }
    //     }
    //   },
    //   yaxis: [
    //     {
    //       title: {
    //         text: "Procurement Method"
    //       },
    //       labels: {
    //         style: {             
    //           fontSize: "12px"
    //         },
    //         formatter: function (val) {
    //           return NumberSuffix(val, 2)
    //         }
    //       }
    //     }
    //   ],
    //   noData: {
    //     text: 'Loading Data...'
    //   }
    // };

    this.chartOptionsSuspendedProviders = {
      series: [],
      chart: {
        fontFamily: 'Trebuchet MS',
        type: "bar",
        height: 350,
      },
      title: {
        text: "Suspended Suppliers by Period of Suspension Left",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1286f3'
        },
      },
      annotations: {
        xaxis: [
          {
            x: 500,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396"
              },
              text: "X annotation"
            }
          }
        ],
        yaxis: [
          {
            y: "July",
            y2: "September",
            label: {
              text: "Y annotation"
            }
          }
        ]
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 2,
          // columnWidth: '10%',
          barHeight: '35%',
          dataLabels: {
            position: 'bottom'
          }
        }
      },
    //   dataLabels: {
    //     position: 'top',
    //     maxItems: 100,
    //     hideOverflowingLabels: true,
    //     orientation: horizontal
    // }
    //   dataLabels: {
    //     enabled: true
    //   },
    dataLabels: {
      enabled: true,
      style: {
          colors: ['#333']
      },
      offsetX: -30
    },
      xaxis: {
        title:{
          text:'Days of Suspension Left'
        },
        categories: []
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: {
        reversed: true,
        axisTicks: {
          show: true
        },
        title:{
          text:'Suppliers'
        }
      },
      noData: {
        text: 'Loading Data ...'
      }
    };

    this.chartOptionsPercentageSuspended = {
      series: [],
      title: {
        text: "% of Suspended Suppliers ",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1286f3'
        },
      },
      chart: {
        type: "donut",
        height: 350,
      },
      labels: ["Suspended","Not Suspended"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
