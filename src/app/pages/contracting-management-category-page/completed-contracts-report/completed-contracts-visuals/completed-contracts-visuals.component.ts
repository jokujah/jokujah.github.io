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
import { capitalizeFirstLetter, convertNumberSuffixWithCommas, convertNumbersWithCommas, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortArrayBy, sortTable, visualisationMessages } from 'src/app/utils/helpers';
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


  @ViewChild("chartFunding") chartFunding: ChartComponent;
  public chartFundingOptions: Partial<ChartOptions>;

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
  plansByFundingSource = []
  


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
          this.cardValue1 = data.numberOfContracts ? sanitizeCurrencyToString(data.numberOfContracts) : 0
          this.cardValue2 = data.totalActualCost ? sanitizeCurrencyToString(data.totalActualCost) : 0
          this.cardValue3 = data.noOfCompletedContracts ? sanitizeCurrencyToString(data.noOfCompletedContracts) : 0
          this.cardValue4 = data.totalValueOfCompletedContracts ? sanitizeCurrencyToString(data.totalValueOfCompletedContracts) : 0
          this.averageValueOfContracts = (data.noOfCompletedContracts > 0)?sanitizeCurrencyToString(data.totalValueOfCompletedContracts)/data.noOfCompletedContracts:0
        }

        this.isLoading = false
        },
      (error) => {
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
        text: visualisationMessages('loading')
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
        text:  visualisationMessages('loading')
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
        text:  visualisationMessages('loading')
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
            if (data.length > 0) {
              // let i;
              // for (i = 0; i < 6; i++) {
              //   var valueC = (data[i]?.value_of_completed_contracts) ? data[i]?.value_of_completed_contracts.split(',') : ['0']
              //   var valueD = parseInt(valueC.join(''))
              //   subjectOfProcurement.push(capitalizeFirstLetter(data[i]?.pde_name))
              //   estimatedAmount.push(valueD)
              // }

              this.topTenHighestContracts = data.slice(0, 10)
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
            let plansByFundingSource = response.data
            if (data.length > 0) {

              this.plansByFundingSource = sortArrayBy(data,'no_of_completed_contracts')

              const fundingSourceData = [];
              const fundingSources = [];

              console.log(plansByFundingSource.map(element =>element.number_of_contracts))

              plansByFundingSource.forEach((item: any) => {
                fundingSourceData.push(
                  parseInt(item?.total_value_of_completed_contracts.split(',').join(''))
                );
                fundingSources.push(item?.funding_source?item?.funding_source:'Unknown');
              });

              this.initRadialChart(fundingSourceData,fundingSources)


              if(plansByFundingSource.length > 7){
                this.plansByFundingSource = plansByFundingSource.sort(function (a, b) {
                    let nameA = a?.total_value_of_completed_contracts.split(',');
                    let nameB = b?.total_value_of_completed_contracts.split(',');
                    let valueA = parseInt(nameA.join(''));
                    let valueB = parseInt(nameB.join(''));
      
                    if (valueA > valueB) {
                      return -1;
                    }
                    if (valueA < valueB) {
                      return 1;
                    }
                    return 0;
                  });
              }
              this.contractsByFundingSource = data 
            }
            else{
              this.plansByFundingSource = []
              this.contractsByFundingSource = []
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
              var valueE = element?.no_of_completed_contracts
              // var valueF = parseInt(valueE.join(''))

              subjectOfProcurement.push(capitalizeFirstLetter(element.contract_type))
              estimatedAmount.push(valueD)
              actualAmount.push(parseInt(valueE))
              percentage.push(parseInt(element?.no_of_completed_contracts)/element?.no_of_completed_contracts)
            });


            this.completedByContractType = data

            console.log("actualAmount",actualAmount)

            this.chartProcurementType?.updateOptions({
              series: [
                {
                  name: "Completed Contracts Value",
                  type: "column",
                  data: estimatedAmount
                },
                {
                  name: "Completed Contracts",
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
                text:  visualisationMessages('empty')
              }
            })}
            break;
          }   
                
          this.isLoading = false
        },
      (error) => {
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
            text:  visualisationMessages('error')
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
            text: visualisationMessages('error')
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
            text:  visualisationMessages('error')
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

  initRadialChart(series?, categories?) {
    this.chartFundingOptions = {
      series: series,
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val) {
            return 'UGX ' + convertNumberSuffixWithCommas(NumberSuffix(val,2));
          },
        },
      },
      title: {
        text: "Completed Contracts Value By Funding Source ",
        align: 'center',
        margin: 2,
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
        fontFamily: 'Trebuchet MS',
        type: 'donut',
        width: '100%',
        height: 350,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 30,
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: 'bold',
              },
              value: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: (val) => `UGX ${convertNumberSuffixWithCommas(NumberSuffix(val,2))}`,
              },
              total: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: function (w) {
                  return `UGX ${convertNumbersWithCommas(
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  )}`;
                },
              },
            }
          }
        }
      },
      legend: {
        show: true,
        offsetX: 0,
        offsetY: 15,
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
      },
      labels: categories,
      dataLabels:{
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
      },    
     
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      },
      noData: {
        text: visualisationMessages('empty'),
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
      }
    };
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
        text:  visualisationMessages('loading')
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
        text:  visualisationMessages('loading')
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
          //showForNullSeries: false,
        },
        {
          opposite: true,
          title: {
            text: "Number of Contracts"
          },
          //showForNullSeries: false,
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
        text:  visualisationMessages('loading')
      }
    };
  }

}