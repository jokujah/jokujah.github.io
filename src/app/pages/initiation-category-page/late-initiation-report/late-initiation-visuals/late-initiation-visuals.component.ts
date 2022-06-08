import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import html2canvas from 'html2canvas';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';

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
  noData:ApexNoData;
  plotOptions: ApexPlotOptions;
  legend:ApexLegend;
};

export type ChartOptionsLateInitiationsTopTen  = {
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
  noData:ApexNoData
};

@Component({
  selector: 'app-late-initiation-visuals',
  templateUrl: './late-initiation-visuals.component.html',
  styleUrls: ['./late-initiation-visuals.component.scss']
})
export class LateInitiationVisualsComponent implements OnInit {

  @ViewChild("chartLateInitiationsType") chartLateInitiationsType: ChartComponent;
  public chartOptionsLateInitiationsType: Partial<ChartOptions>;

  @ViewChild("chartLateInitiationsMethod") chartLateInitiationsMethod: ChartComponent;
  public chartOptionsLateInitiationsMethod: Partial<ChartOptions>;

  // @ViewChild("chartLateInitiationsTopTen") chartLateInitiationsTopTen!: ChartComponent;
  // public chartOptionsLateInitiationsTopTen: Partial<ChartOptions> | any;

  @ViewChild("chartLateInitiationsTopTen")
  chartLateInitiationsTopTen!: ChartComponent;
  chartOptionsLateInitiationsTopTen: Partial<ChartOptionsLateInitiationsTopTen> | any;


  downloading = false
  isLoading:boolean = false


  marketPrice ;
  numberOfRequisitions ;
  requisitionEstimatedAmount ;

  constructor(
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) {

  }

  ngOnInit(): void {
    this.initCharts()
  }

  submit(data) {
    this.getSummaryStats('late-initiations-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('late-initiations-by-method',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('late-initiations-by-type',data?.selectedFinancialYear,data?.selectedPDE)
  }
  
  reset(data){     
     this.getSummaryStats('late-initiations-summary',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('late-initiations-by-method',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('late-initiations-by-type',data?.selectedFinancialYear,data?.selectedPDE)
      
  }


  getSummaryStats(reportName, financialYear, procuringEntity) {
    this.isLoading = true
    this.marketPrice = 0
    this.numberOfRequisitions = 0
    this.requisitionEstimatedAmount = 0

    this._planingCategoryService.getSummaryStatsWithPDE(reportName, financialYear, procuringEntity).subscribe(
      (response) => {
        let data = response.data[0]
        console.log(data)

        if (response.data.length > 0) {
          this.marketPrice = data.marketPrice?data.marketPrice:0
          this.numberOfRequisitions = data.numberOfRequisitions?data.numberOfRequisitions:0
          this.requisitionEstimatedAmount = data.requisitionEstimatedAmount?data.requisitionEstimatedAmount:0
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true   

    this.chartLateInitiationsTopTen?.updateOptions({
      series: [],
      xaxis: {
        categories:[],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#D10CE8",
            ],
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

    this.chartLateInitiationsMethod?.updateOptions({

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

    this.chartLateInitiationsType?.updateOptions({
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
            case'late-initiations-by-type':
              console.log(`Report Name ${reportName} , Data ${data}`)
              this.chartLateInitiationsType?.updateOptions({
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
                  text: 'No Data Available...'
                } 
              })
            break;
            case'late-initiations-by-method':
              console.log(`Report Name ${reportName} , Data ${data}`)
              this.chartLateInitiationsMethod?.updateOptions({

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
                  text: 'No Data Available...'
                } 
              })
            break;
            case'top-late-initiations':
              console.log(`Report Name ${reportName} , Data ${data}`)
              this.chartLateInitiationsMethod?.updateOptions({
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
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.chartLateInitiationsTopTen?.updateOptions({
          series: [],
          xaxis: {
            categories:[],
            labels: {
              style: {
                colors: [
                  "#008FFB",
                  "#D10CE8",
                ],
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
    
        this.chartLateInitiationsMethod?.updateOptions({
    
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
    
        this.chartLateInitiationsType?.updateOptions({
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
      }
    )

  } 

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptionsLateInitiationsMethod = {
      series: [
        {
          name: "Contract Award Value",
          type: "column",
          data: []
        }
      ],
      chart: {
        fontFamily: 'Trebuchet MS',
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "35%",
          borderRadius: 2
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Late Initiations by Method and Value"
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
            text: "Procurement Method"
          },
          labels: {
            style: {             
              fontSize: "12px"
            },
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
          }
        }
      ],
      noData: {
        text: 'Loading Data...'
      }
    };

    this.chartOptionsLateInitiationsType ={
      series: [
        {
          name: "Contract Award Value",
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
        fontFamily: 'Trebuchet MS',
        height: 350,
        type: "bar"
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
        text: "Late Initiations by Procurement Type"
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
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
          }
        },
        {
          opposite: true,
          title: {
            text: "Number of Contracts"
          }
        }
      ],
      fill: {
        opacity: 1
      },
      // tooltip: {
      //   y: {
      //     formatter: function(val) {
      //       return "UGX " + NumberSuffix(val,2) ;
      //     }
      //   }
      // },
      noData: {
        text: 'Loading Data'
      }
    };   

    this.chartOptionsLateInitiationsTopTen = {
      series: [
        {
          name: "Planned Contract Value",
          data: [],
          fontSize: "12px"
        }
      ],
      chart: {
        fontFamily: 'Trebuchet MS',
        height: 'auto',
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        },
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
      }

      },
      colors: [
        "#008FFB"
      ],
      plotOptions: {
        bar: {
          columnWidth: "35%",
          distributed: false,
          horizontal:true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return NumberSuffix(val,2)
      },
      },
      legend: {
        show: false
      },
      grid: {
        show: true
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#D10CE8",
            ],
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,2)}
        }            
      },
      title: {
        text: "Top 10 Highest Late Initiations By Value"
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "UGX " + NumberSuffix(val,2) ;
          }
        }
      },
      noData: {
        text: 'Loading Data ...'
      }
    };
  }
}





