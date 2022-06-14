import { element } from 'protractor';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,

} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import html2canvas from 'html2canvas';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';

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
  noData:ApexNoData
};

export type ChartOptionsBudgetStatus = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  noData:ApexNoData;
  labels: string[];
  stroke:ApexStroke
  
};


export type ChartOptionsProcurementTypes = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme:ApexTheme;
  noData:ApexNoData;
};

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],

})
export class VisualsComponent implements OnInit {

  @ViewChild("chartEducationStatus")
  chartEducationStatus!: ChartComponent;
  chartOptionsEducationStatus: Partial<ChartOptionsEducationStatus> | any;

  @ViewChild("chartBudgetStatus") chartBudgetStatus: ChartComponent;
  public chartOptionsBudgetStatus: Partial<ChartOptionsBudgetStatus>;

  @ViewChild("chartProcurementTypes") chartProcurementTypes: ChartComponent;
  public chartOptionsProcurementTypes: Partial<ChartOptionsProcurementTypes>;

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');
  downloading = false
  isLoading:boolean = false
  registeredProviders

  totalValueofPlannedContracts ;
  numberOfPlannedContracts;
  yearOfPlannedContracts ;
  numberOfRegisteredEntities  ;
  topTenHighestContracts

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) {

    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    this.initCharts()
    
  }

  submit(data) {
    this.getSummaryStatsWithPDE('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getSummaryStatsBudget('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)
    this.getSummaryStatsProcurementType('plan-by-procurement-type',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsWithPDE('plan-by-funding-source',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsWithPDE('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)    
  }
  
  reset(data){
     //for changing stats at the top and the highest procurement budgets graph
     this.getSummaryStatsWithPDE('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)

     //for budget graph
     this.getSummaryStatsBudget('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)
 
     //procurement graph
     this.getSummaryStatsProcurementType('plan-by-procurement-type',data?.selectedFinancialYear,data?.selectedPDE) 
  }


  getSummaryStatsWithPDE(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.numberOfPlannedContracts = 0
    this.totalValueofPlannedContracts = 0
    this.yearOfPlannedContracts = 0
    this.numberOfRegisteredEntities = 0

    this.chartEducationStatus?.updateOptions({

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

    console.log(`getSummaryStatsWithPDE ${reportName} + ${financialYear} + ${procuringEntity}`,)

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        let  providersInSelectedYear = []

        console.log('getSummaryStatsWithPDE' ,data )
        var e =( data.length > 0)
        console.log('getSummaryStatsWithPDE' ,e)
        if (data.length > 0) {
          data.forEach(element => {
            //if (element.financialYear == financialYear) {
              x.push(parseInt(element?.noOfPlanItems))
              var e = element?.estimatedAmount.split(',')
              y.push(parseInt(e.join('')))
              providersInSelectedYear.push(element?.pdeName)
            // }
          });

          this.topTenHighestContracts = data.sort(function (a, b) {
            var nameA = a?.estimatedAmount.split(',')
            var nameB = b?.estimatedAmount.split(',')
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

          let categories = []
          let categoryValues = []


          this.topTenHighestContracts.slice(0, 10).forEach(element => {

            var valueC = element?.estimatedAmount.split(',')
            var valueD = parseInt(valueC.join(''))
            categories.push(element.pdeName)
            categoryValues.push(valueD)
          });



          this.chartEducationStatus?.updateOptions({

            series: [{
              name: "PDEs",
              data: categoryValues
            }],

            xaxis: {
              categories: categories,
              labels: {
                style: {
                  fontSize: "12px"
                },
                formatter: function (val) {
                  return NumberSuffix(val, 2)
                }
              }
            },
          })
          
          this.numberOfPlannedContracts = addArrayValues(x)
          this.totalValueofPlannedContracts = NumberSuffix(addArrayValues(y),2)
          this.yearOfPlannedContracts = financialYear
          //this.numberOfRegisteredEntities = data[0].noOfRegisteredPdes
          this.numberOfRegisteredEntities = procuringEntity?1:data[0].noOfRegisteredPdes
          this.isLoading = false
        }
        else{
          this.numberOfPlannedContracts = 0
          this.totalValueofPlannedContracts = 0
          this.yearOfPlannedContracts = 0
          this.numberOfRegisteredEntities = 0
          this.isLoading = false
        }
        },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
      }
    )

  }

  // getSummaryStatsWithPDE(reportName,financialYear,procuringEntity){
  //   this.isLoading=true

  //   this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
  //     (response )=>{
  //       let data = response.data
  //       let  x = []
  //       let  y = []

  //       console.log(data)

  //         this.isLoading = false
  //       },
  //     (error) => {
  //       this.isLoading = false;
  //       this.toastr.error("Something Went Wrong", '', {
  //         progressBar: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       this.isLoading = false
  //     }
  //   )
  // }

  getSummaryStatsBudget(reportName,financialYear,procuringEntity){
    this.isLoading=true


    this.chartBudgetStatus?.updateOptions({
      series: [],
      labels: [],
      noData: {
        text: 'Loading Data ...'
      } 
    })

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        let  seriesData = []
        let  seriesObject = []
        let budgetSpentPercentage = []
        let labelName = []

        let  pdePercentage = []
        

        var sortedData=[]

        console.log("BUDGET",data)

        //labelName.push(procuringEntity == ""?"All":procuringEntity)
        console.log("BUDGET LENGTH",data.length)
        if (data.length > 0) {
          if (procuringEntity == "") {
            // var totalplanned = data[0]?.totalBudgetPlannedAmount.split(',')
            // var totalSpent = data[0]?.totalSpentAmount.split(',')

            // var percentage = parseInt(totalSpent.join('')) / parseInt(totalplanned.join('')) * 100
            // budgetSpentPercentage.push(Math.round(percentage))

            this.chartBudgetStatus?.updateOptions({
              series: [],
              labels: [],
              noData: {
                text: 'Loading Data ...'
              } 
            })

            data.forEach(element => {
              

              x.push(element?.noOfPlanItems)

              var planned = element?.budgetPlannedAmount.split(',')

              var totalplanned = element?.totalBudgetPlannedAmount.split(',')

              var spent = element?.spentAmount.split(',')

              var percentage = parseInt(spent.join('')) / parseInt(planned.join('')) * 100

              var percentagePlanned = parseInt(planned.join('')) / parseInt(totalplanned.join('')) * 100

              var oneSerieData = [(parseInt(spent.join('')) / 1000000000000), (parseInt(planned.join('')) / 1000000000000), percentage]

              var oneSerieObject = {
                x: element?.pdeName,
                // "budgetSpent":spent,
                // "planned":planned,
                y: Math.round(percentage),

              }

              budgetSpentPercentage.push(Math.round(percentage))
              seriesData.push(oneSerieData)
              seriesObject.push(oneSerieObject)
              //labelName.push(element?.pdeName)

            });

            sortedData = seriesObject.sort(function (a, b) {
              // var nameA = a?.estimatedAmount.split(',')
              // var nameB = b?.estimatedAmount.split(',')
              // var valueA = parseInt(nameA.join(''))
              // var valueB = parseInt(nameB.join(''))
  
              if (a.y > b.y) {
                return -1;
              }
              if (a.y < b.y) {
                return 1;
              }
              return 0;
            })

            sortedData.forEach(element => {
              labelName.push(element.x)
              pdePercentage.push(element.y)
            })

            this.chartBudgetStatus?.updateOptions(
              {
                series: [
                  {
                    name: "Percentage of Budget Spent",
                    data: pdePercentage,
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
                plotOptions: {
                  bar: {
                    columnWidth: "35%",
                    distributed: false,
                    horizontal:true
                  }
                },
                dataLabels: {
                  enabled: false,
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
                  categories: labelName,
                  title: {
                    text: "Percentage of Budget Spent"
                  },
                  labels: {
                    style: {
                      fontSize: "12px"
                    },
                    formatter: function(val) {
                      return val}
                  }            
                },
                tooltip: {
                  enabled: true,
                  fillSeriesColor: false,
                  y: {
                    formatter: function(val) {
                      return  val+'%' ;
                    }
                  }
                },
                yaxis: {
                  title: {
                    text: "Procuring and Disposal Entities"
                  }
                },
                noData: {
                  text: 'No Data Available ...'
                },
                title: {
                  text: "PDEs by Percentage of Budget Spent "
                },
              })

          } else {
            data.forEach(element => {

              x.push(element?.noOfPlanItems)

              var planned = element?.budgetPlannedAmount.split(',')

              var totalplanned = element?.totalBudgetPlannedAmount.split(',')

              var spent = element?.spentAmount.split(',')

              var percentage = parseInt(spent.join('')) / parseInt(planned.join('')) * 100

              var percentagePlanned = parseInt(planned.join('')) / parseInt(totalplanned.join('')) * 100

              var oneSerieData = [(parseInt(spent.join('')) / 1000000000000), (parseInt(planned.join('')) / 1000000000000), percentage]

              var oneSerieObject = {
                x: element?.pdeName,
                // "budgetSpent":spent,
                // "planned":planned,
                y: Math.round(percentage),

              }
              budgetSpentPercentage.push(Math.round(percentage))
              seriesData.push(oneSerieData)
              seriesObject.push(oneSerieObject)

            });
            labelName.push(procuringEntity)
            console.log(` ${labelName  }  ${budgetSpentPercentage}`)

            this.chartBudgetStatus?.updateOptions({
              series: budgetSpentPercentage,
              chart: {
                height: 350,
                fontFamily: 'Trebuchet MS',
                type: "radialBar"
              },
              title: {
                text: "PDEs by Percentage of Budget Spent "
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    margin: 15,
                    size: "70%"
                  },         
                  dataLabels: {
                    show: true,
                    name: {
                      offsetY: -10,
                      show: true,
                      color: "#888",
                      fontSize: "13px"
                    },
                    value: {
                      color: "#111",
                      fontSize: "30px",
                      show: true
                    }
                  }
                }
              },
              tooltip: {
                enabled: true,
                // y: {
                //   formatter: function(value) {
                //     return `${value}%`
                //   }
                // }
              },
              stroke: {
                lineCap: "round",
              },
              noData: {
                text: 'No Data Available...'
              } ,
              labels: labelName
            })   
          }
        }else{
          this.chartBudgetStatus?.updateOptions({
            series: [],
            chart: {
              height: 350,
              fontFamily: 'Trebuchet MS',
              type: "radialBar"
            },
            title: {
              text: "PDEs by Percentage of Budget Spent "
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 15,
                  size: "70%"
                },         
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: "#888",
                    fontSize: "13px"
                  },
                  value: {
                    color: "#111",
                    fontSize: "30px",
                    show: true
                  }
                }
              }
            },
            tooltip: {
              y: {
                formatter: function(value) {
                  return `${value}%`
                }
              }
            },
            stroke: {
              lineCap: "round",
            },
            noData: {
              text: 'No Data Available...'
            } ,
            labels: []
          })
        } 
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.chartBudgetStatus?.updateOptions({
          series: [],
          chart: {
            height: 350,
            fontFamily: 'Trebuchet MS',
            type: "radialBar"
          },
          title: {
            text: "PDEs by Percentage of Budget Spent "
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "70%"
              },         
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#888",
                  fontSize: "13px"
                },
                value: {
                  color: "#111",
                  fontSize: "30px",
                  show: true
                }
              }
            }
          },
          tooltip: {
            y: {
              formatter: function(value) {
                return `${value}%`
              }
            }
          },
          stroke: {
            lineCap: "round",
          },
          noData: {
            text: 'Error Loading Data...'
          } ,
          labels: []
        })
        this.isLoading = false
      }
    )
  }

  getSummaryStatsProcurementType(reportName,financialYear,procuringEntity){
    this.isLoading=true

    this.chartProcurementTypes?.updateOptions({

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
      noData:{
        text:'Loading Data'
      }
    })

    
    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        var sortedTypes

        console.log("Procurment Types",data)

        sortedTypes = data.sort(function(a, b) {
          var nameA = a?.marketPrice.split(',')
          var nameB = b?.marketPrice.split(',')
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


        let categories=[]
        let categoryValues=[]


        sortedTypes.forEach(element => {

          var valueC = element?.marketPrice.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.procurementType)
          categoryValues.push(valueD)
        });

        this.chartProcurementTypes?.updateOptions({

          series: [{
            name: "Values",
            data: categoryValues
          }],
    
          xaxis: {
            categories:categories,
            labels: {
              style: {
                fontSize: "12px"
              },
              formatter: function(val) {
                return NumberSuffix(val,2)}
            }            
          },
          noData:{
            text:'No Data Available'
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
        this.chartProcurementTypes?.updateOptions({

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
          noData:{
            text:"Error Loading Data"
          }
        })
        this.isLoading = false
        console.log(error)
      }
    )
  }

   getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptionsEducationStatus = {
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
      plotOptions: {
        bar: {
          columnWidth: "35%",
          distributed: false,
          horizontal:true
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val+'%'
        },
        textAnchor:'end'
      },
      legend: {
        show: false
      },
      grid: {
        show: true
      },
      xaxis: {
        categories: [],
        title: {
          text: "Value of Plans"
        },
        labels: {
          style: {
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,2)}
        }            
      },
      title: {
        text: "Top 10 Highest PDE Plans By Value"
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "UGX " + NumberSuffix(val,2) ;
          }
        }
      },
      yaxis: {
        title: {
          text: "Procuring and Disposal Entities"
        }
      },
      noData: {
        text: 'No Data Available ...'
      }
    };

    this.chartOptionsBudgetStatus  = {
      series: [],
      chart: {
        height: 350,
        fontFamily: 'Trebuchet MS',
        type: "radialBar",
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }        
      },
      title: {
        text: "PDEs by Percentage of Budget Spent "
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },         
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      tooltip: {
        enabled:true,
        y: {
          formatter: function(value) {
            return `${value}%`
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      noData: {
        text: 'Loading Data ...'
      } ,
      labels: []
    };

    // this.chartOptionsBudgetStatus  = {
    //   series: [],

    //   chart: {
    //     height: 350,
    //     fontFamily: 'Trebuchet MS',
    //     type: "treemap"
    //   },
    //   title: {
    //     text: "PDEs by Percentage of Budget Spent "
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function(value) {
    //         return `${value}%`
    //       }
    //     }
    //   },
    //   noData: {
    //     text: 'No Data Available ...'
    //   }      
    // };


    this.chartOptionsProcurementTypes = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        fontFamily: 'Trebuchet MS',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [],
        title: {
          text: "Contract Value "
        },
        labels: {
          style: {
            fontSize: "12px"
          },
          formatter: function (val) {
            return NumberSuffix(val, 2)
          }
        }
      },
      yaxis: {
        title: {
          text: "Procurement Types"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "UGX " + NumberSuffix(val, 2);
          }
        }
      },
      title: {
        text: "Budget Value by Procurement Types"
      },
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      noData: {
        text: 'Loading Data ...'
      }
    };
  }
}




