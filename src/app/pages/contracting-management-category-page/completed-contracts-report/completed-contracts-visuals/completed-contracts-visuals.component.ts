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
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortTable } from 'src/app/utils/helpers';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';
import { initRadarChart, initRadialChart } from 'src/app/utils/chartsApex';
import { ChartOptions } from 'src/app/utils/IChartOptions';

// export type ChartOptions = {
//   series: ApexAxisChartSeries | ApexNonAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   yaxis: ApexYAxis | ApexYAxis[];
//   xaxis: ApexXAxis;
//   fill: ApexFill;
//   tooltip: ApexTooltip;
//   stroke: ApexStroke;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle,
//   noData:ApexNoData,
//   labels: string[];
//   colors : any
// };


@Component({
  selector: 'app-completed-contracts-visuals',
  templateUrl: './completed-contracts-visuals.component.html',
  styleUrls: ['./completed-contracts-visuals.component.scss']
})
export class CompletedContractsVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartFundingSource") chartFundingSource: ChartComponent;
  public chartOptionsFundingSource: Partial<ChartOptions>;

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;


  @ViewChild("chartRadarFundingSource") chartRadarFundingSource: ChartComponent;
  public chartOptionsRadarFundingSource: Partial<ChartOptions>;


  isLoading:boolean = false 
  cardValue1;
  cardValue2;
  cardValue3;
  cardValue4;

  dir
  sortTable = sortTable
  

  topTenHighestContracts 
  completedByContractType: any;
  averageValueOfContracts: number;
  highestContractValueofCompletedContracts: any;
  contractsByFundingSource: any;
  


  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {  }

  ngOnInit(): void {
    this.initCharts()
  }



  submit(data) {
    this.getSummaryStats('completed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('completed-contracts-by-funding-source-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('completed-contracts-by-contract-type-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-completed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('completed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('completed-contracts-by-funding-source-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('completed-contracts-by-contract-type-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-completed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue1 = 0
    this.cardValue2 = 0
    this.cardValue3 = 0
    this.cardValue4 = 0
    this.topTenHighestContracts = []
    this.completedByContractType = []
    this.averageValueOfContracts= 0;
    this.highestContractValueofCompletedContracts = 0
    this.contractsByFundingSource = []
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfContracts ? data.numberOfContracts : 0
          this.cardValue2 = data.totalActualCost ? sanitizeCurrencyToString(data.totalActualCost) : 0
          this.cardValue3 = data.noOfCompletedContracts ? data.noOfCompletedContracts : 0
          this.cardValue4 = data.totalValueOfCompletedContracts ? sanitizeCurrencyToString(data.totalValueOfCompletedContracts) : 0
          this.averageValueOfContracts = sanitizeCurrencyToString(data.totalValueOfCompletedContracts)/data.noOfCompletedContracts
        }

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
        throw error
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

    this.chartFundingSource?.updateOptions({

      series: [],

      xaxis: {
        categories:[],
        labels: {
          style: {
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,0)}
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
            return NumberSuffix(val,0)}
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
        let categories = []
        let categorieValues = []
        let numOfContracts = []
        let percentage = []

        switch (reportName) {
          case 'top-completed-contracts-summary':
            console.log("top-completed-contracts-summary", data)

            // sortedData = data.sort(function (a, b) {
            //   var nameA = a?.estimatedAmount.split(',')
            //   var nameB = b?.estimatedAmount.split(',')
            //   var valueA = parseInt(nameA.join(''))
            //   var valueB = parseInt(nameB.join(''))

            //   if (valueA > valueB) {
            //     return -1;
            //   }
            //   if (valueA < valueB) {
            //     return 1;
            //   }
            //   return 0;
            // })

            if (data.length > 0) {
              let i;
              for (i = 0; i < 6; i++) {
                var valueC = (data[i]?.value_of_completed_contracts) ? data[i]?.value_of_completed_contracts.split(',') : ['0']
                var valueD = parseInt(valueC.join(''))
                // var valueE = element?.actualCost.split(',')
                // var valueF = parseInt(valueE.join(''))
                subjectOfProcurement.push(capitalizeFirstLetter(data[i]?.pde_name))
                estimatedAmount.push(valueD)
                // actualAmount.push(valueF)
              }
              this.topTenHighestContracts = data.slice(0, 9)
              this.highestContractValueofCompletedContracts = sanitizeCurrencyToString(data[0].value_of_completed_contracts)
              // data.forEach(element => {
              //   var valueC = (element?.contractAmount)?element?.contractAmount.split(','):['0']
              //   var valueD = parseInt(valueC.join(''))
              //    var valueE = element?.actualCost.split(',')
              //   var valueF = parseInt(valueE.join(''))
              //   subjectOfProcurement.push(capitalizeFirstLetter(element.contractManager))
              //   estimatedAmount.push(valueD)
              //    actualAmount.push(valueF)
              // });

              this.chart?.updateOptions({
                series: [
                  {
                    name: "Value Of Completed Contracts",
                    data: estimatedAmount
                  },
                  // {
                  //   name: "Actual Amount",
                  //   type: "line",
                  //   data: actualAmount
                  // }
                ],
                xaxis: {
                  categories: subjectOfProcurement,
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
            }
            break;
          case 'completed-contracts-by-funding-source-summary':
            console.log("completed-contracts-by-funding-source-summary", data)

            // sortedData = data.sort(function (a, b) {
            //   var nameA = a?.estimatedAmount.split(',')
            //   var nameB = b?.estimatedAmount.split(',')
            //   var valueA = parseInt(nameA.join(''))
            //   var valueB = parseInt(nameB.join(''))

            //   if (valueA > valueB) {
            //     return -1;
            //   }
            //   if (valueA < valueB) {
            //     return 1;
            //   }
            //   return 0;
            // })

            if (data.length > 0) {
              data.forEach(element => {
                var valueC = (element?.total_actual_cost) ? element?.total_actual_cost.split(',') : ['0']
                var valueD = parseInt(valueC.join(''))
                var valueE = sanitizeCurrencyToString(element?.total_value_of_completed_contracts)
                // var valueF = parseInt(valueE.join(''))

                numOfContracts.push(parseInt(element?.no_of_completed_contracts))
                subjectOfProcurement.push(capitalizeFirstLetter(element.funding_source))
                estimatedAmount.push(valueD)
                actualAmount.push(valueE)
                percentage.push(Math.floor((parseInt(element?.no_of_completed_contracts) / parseInt(element?.number_of_contracts)) * 100))
              });

              this.contractsByFundingSource = data

              this.chartOptionsFundingSource = initRadialChart(
                actualAmount, subjectOfProcurement, 'Completed Contracts by Funding Source'
              )

              let serieValue = [
                {
                  name: 'Number Of Completed Contracts',
                  data: numOfContracts
                }
              ]

              let categorieValue = subjectOfProcurement

              this.chartOptionsRadarFundingSource = initRadarChart(
                serieValue,
                categorieValue,
                'Number Of Completed Contracts by Funding Source'
              )
            }else{
              this.chartOptionsFundingSource = {}
            }
            break;
          case 'completed-contracts-by-contract-type-summary':
            console.log("completed-contracts-by-contract-type-summary", data)

            // sortedData = data.sort(function (a, b) {
            //   var nameA = a?.estimatedAmount.split(',')
            //   var nameB = b?.estimatedAmount.split(',')
            //   var valueA = parseInt(nameA.join(''))
            //   var valueB = parseInt(nameB.join(''))

            //   if (valueA > valueB) {
            //     return -1;
            //   }
            //   if (valueA < valueB) {
            //     return 1;
            //   }
            //   return 0;
            // })
            if(data.length > 0){
            data.forEach(element => {
              var valueC = (element?.total_value_of_completed_contracts)?element?.total_value_of_completed_contracts.split(','):['0']              
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.number_of_contracts
              // var valueF = parseInt(valueE.join(''))

              subjectOfProcurement.push(capitalizeFirstLetter(element.contract_type))
              estimatedAmount.push(valueD)
              actualAmount.push(parseInt(valueE))
              percentage.push(parseInt(element?.no_of_completed_contracts)/element?.number_of_contracts)
            });


            this.completedByContractType = data

            console.log("actualAmount",actualAmount)

            this.chartProcurementType?.updateOptions({
              series: [
                {
                  name: "Contracts",
                  type: "column",
                  data: estimatedAmount
                },
                {
                  name: "Number Of Contracts",
                  type: "area",
                  data: actualAmount
                }
              ],
              xaxis: {
                categories: subjectOfProcurement,
                labels: {
                  formatter: function (val) {
                    return val
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            })}
            break;
          }   
                
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
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
          noData: {
            text: 'Error Loading Data...'
          }
        })
    
        this.chartFundingSource?.updateOptions({
    
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
        throw error
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptions = {
      series: [],
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
        title:{
          text:'Value Of Completed Contracts'
        },
        categories: []
      },
      yaxis: {
        title: {
          text: "Procuring And Disposal Entities"
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
        text: 'Loading Data ...'
      },
      title: {
        text: "Completed Contracts by Highest Contract Values"
      },
    };

    this.chartOptionsFundingSource = {
      series: [],
      chart: {
        fontFamily:'Trebuchet Ms',
        type: "donut"
      },      
      noData: {
        text: 'Loading Data ...'
      }
    };

    this.chartOptionsProcurementType = {
      series: [],
      chart: {
        fontFamily:'Trebuchet Ms',
        height: 350,
        type: "line"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 2
        }
      },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Completed Contracts by Contract Type",
        style:{
          fontSize:"14px"
        }
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
            text: "Contract Value"
          },
          labels: {
            style: {
              fontSize: "12px"
            },
            formatter: function (val) {
              return NumberSuffix(val, 0)
            }
          },
          showForNullSeries: false,
        },
        {
          opposite: true,
          title: {
            text: "Number of Contracts"
          },
          showForNullSeries: false,
        }
      ],
      fill: {
        opacity: 1
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [
          {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return "UGX " + NumberSuffix(y, 0);
              }
              return y;
            }
          },
          {
            formatter: function (y) {
            if (typeof y !== "undefined") {
              return "" + y;
            }
            return y;
          }

          }
        ]
      },
      noData: {
        text: 'Loading Data ...'
      }
    };
  }

}