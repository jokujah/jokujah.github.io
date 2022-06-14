import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNoData,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';
import { lineBreak } from 'html2canvas/dist/types/css/property-descriptors/line-break';

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
};


@Component({
  selector: 'app-provider-performance-visuals',
  templateUrl: './provider-performance-visuals.component.html',
  styleUrls: ['./provider-performance-visuals.component.scss']
})
export class ProviderPerformanceVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartProcurementMethod") chartProcurementMethod: ChartComponent;
  public chartOptionsProcurementMethod: Partial<ChartOptions>; 

  @ViewChild("chartProcurementMethodContractValue") chartProcurementMethodContractValue: ChartComponent;
  public chartOptionsProcurementMethodContractValue: Partial<ChartOptions>; 

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;


  isLoading:boolean = false 
  cardValue1;
  cardValue2
  
  

  topTenHighestContracts 
  


  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {  }

  ngOnInit(): void {
    this.initCharts()
  }



  submit(data) {
    this.getSummaryStats('provider-performance-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('provider-performance-contracts-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('provider-performance-contracts-by-type-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('provider-performance-contracts-by-method-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('provider-performance-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('provider-performance-contracts-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('provider-performance-contracts-by-type-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('provider-performance-contracts-by-method-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue2 = 0
    this.cardValue1 = 0
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfContracts ? data.numberOfContracts : 0
          this.cardValue2 = data.contractAmount ? sanitizeCurrencyToString(data.contractAmount) : 0
          //this.allEvavluatedBidders = data.total_evaluated_bidders
        }
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

    this.chart?.updateOptions({

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
        text: 'Loading Data...'
      }
    })

    this.chartProcurementMethod?.updateOptions({

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
        text: 'Loading Data...'
      }
    })
    this.chartProcurementMethodContractValue?.updateOptions({

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
        text: 'Loading Data...'
      }
    })

    this.chartProcurementType?.updateOptions({

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
        text: 'Loading Data...'
      }
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let estimatedAmount = []
        let actualAmount = []
        let sortedData = []
        //var value1,value2,labelName
        var value1 = [],value2 =[],value3 = [],value4 =[],labelName=[]

        switch (reportName) {
          case 'provider-performance-contracts-list-summary':           
            console.log("provider-performance-contracts-list-summary", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contractValue.split(',')
              var nameB = b?.contractValue.split(',')
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
            
            sortedData.forEach(element => {
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              labelName.push(capitalizeFirstLetter(element.contractType))
              value1.push(valueD)
              value2.push(parseInt(element?.numberOfContracts))
            });
            this.chart?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: value1
                },
                {
                  name: "Number of Bids",
                  type: "line",
                  data: value2
                }
              ],
              xaxis: {
                categories: labelName,
                labels: {
                  style: {
                    fontSize: "12px"
                  },
                  formatter: function (val) {
                    return NumberSuffix(val, 2)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            })

            break;
          case 'provider-performance-contracts-by-type-summary':           
           
            console.log("provider-performance-contracts-by-type-summary", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contractValue.split(',')
              var nameB = b?.contractValue.split(',')
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
            
            sortedData.forEach(element => {
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              labelName.push(capitalizeFirstLetter(element.procurementMethod))
              value1.push(valueD)
              value2.push(parseInt(element?.numberOfContracts))
            });

            this.chartProcurementMethod?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: value1
                }
              ],
              xaxis: {
                categories: labelName,
                labels: {
                  formatter: function (val) {
                    return NumberSuffix(val, 2)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            })

            this.chartProcurementMethodContractValue?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: value1
                }
              ],
              xaxis: {
                categories: labelName,
                labels: {
                  formatter: function (val) {
                    return NumberSuffix(val, 0)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            })

            break;
          case 'provider-performance-contracts-by-method-summary':           
           
            console.log("provider-performance-contracts-by-method-summary", data)

            sortedData = data.sort(function (a, b) {
              var valueA = parseInt(a?.numberOfContracts)
              var valueB = parseInt(b?.numberOfContracts)

              if (valueA > valueB) {
                return -1;
              }
              if (valueA < valueB) {
                return 1;
              }
              return 0;
            })
            
            sortedData.forEach(element => {
              labelName.push(capitalizeFirstLetter(element.procurementMethod))
              value1.push(parseInt(element?.numberOfContracts))
              value2.push(parseInt(element?.numberOfAmendments))

              value3.push(sanitizeCurrencyToString(element?.contractAmount))
              value4.push(sanitizeCurrencyToString(element?.amountAmended))
            });

            console.log("Label Name Contracats",labelName)
            console.log("Number Contracats",value1)
            console.log("Value Contracats",value3)
            console.log("Number Ammendments",value2)
            console.log("Value Ammendments",value4)

            this.chartProcurementMethod?.updateOptions({
              series: [                
                {
                  name: "Contracts",
                  data: value1
                },
                {
                  name: "Ammendments",
                  data: value2
                }
              ],
              xaxis: {
                categories: labelName,
                labels: {                  
                  formatter: function (val) {
                    return val
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            });
            this.chartProcurementMethodContractValue?.updateOptions({
              series: [
                {
                  name: "Contract Value",
                  data: value3
                },
                {
                  name: "Ammendments Value",
                  data: value4
                },
              ],
              xaxis: {
                categories: labelName,
                labels: {
                  formatter: function (val) {
                    return NumberSuffix(val,0)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            });
            break;
        }
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        this.chart?.updateOptions({

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
            text: 'Error Loading Data...'
          }
        })
    
        this.chartProcurementMethod?.updateOptions({
    
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
            text: 'Error Loading Data...'
          }
        })

        this.chartProcurementMethodContractValue?.updateOptions({
    
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
            text: 'Error Loading Data...'
          }
        })

        this.chartProcurementType?.updateOptions({
    
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
            text: 'Error Loading Data...'
          }
        })
        console.log(error)
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptions = {
      series: [ ],
      chart: {
        type: "bar",
        height: '500px'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          borderRadius: 2
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
        categories: []
      },
      yaxis: {
        title: {
          text: "Providers "
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "UGX " + NumberSuffix(val,2) ;
          }
        }
      },
      noData: {
        text: 'No Data Available ...'
      },
      title: {
        text: "Signed High Value Contracts"
      },
    };

    this.chartOptionsProcurementMethod = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 2
        }
      },
      xaxis: {
        categories:[]
      },
      // yaxis: {
      //   title: {
      //     text: "Points"
      //   }
      // },
      yaxis: [
        {
          title: {
            text: ""
          }
        }
      ],

      dataLabels: {
        enabled: true,
        // enabledOnSeries: [1,2]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      noData: {
        text: 'Loading Data ...'
      },
      title: {
        text: "Provider Performance By  Contracts and Ammendments"
      },
      stroke: {
        width: [0, 0, 2,2],
        curve: 'smooth',
        colors: ['transparency','transparency','#546E7A', '#E91E63']
      },
    };
    this.chartOptionsProcurementMethodContractValue = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 2
        }
      },
      xaxis: {
        categories:[]
      },
      yaxis: [
        {
          // title: {
          //   text: "Value"
          // },
          // labels: {
          //   style: {
          //     colors: [
          //       "#008FFB",
          //     ],
          //     fontSize: "12px"
          //   },
          //   formatter: function (val) {
          //     return NumberSuffix(val, 2)
          //   }
          // }
        }
      ],
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      noData: {
        text: 'Loading Data ...'
      },
      title: {
        text: "Provider Performance By Value of Contracts and Ammendments"
      },
      stroke: {
        width: [0, 0, 2,2],
        curve: 'smooth',
        colors: ['transparency','transparency','#546E7A', '#E91E63']
      },
    };
  }

}