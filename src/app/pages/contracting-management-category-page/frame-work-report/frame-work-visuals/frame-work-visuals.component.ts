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
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortTable, addArrayValues } from 'src/app/utils/helpers';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';

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
  noData:ApexNoData,
  labels: string[];
};


@Component({
  selector: 'app-frame-work-visuals',
  templateUrl: './frame-work-visuals.component.html',
  styleUrls: ['./frame-work-visuals.component.scss']
})
export class FrameWorkVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartProcurementMethod") chartProcurementMethod: ChartComponent;
  public chartOptionsProcurementMethod: Partial<ChartOptions>;

  @ViewChild("chartFundingSource") chartFundingSource: ChartComponent;
  public chartOptionsFundingSource: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue1;
  cardValue2
  sortTable = sortTable
  dir = 'asc'
  

  topTenHighestContracts = []
  highestFrameWorkContractValue
  

  isEmpty:boolean = false

  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {  }

  ngOnInit(): void {
    this.initCharts()
  }



  submit(data) {
    //this.getSummaryStats('framework-contract-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('framework-contract-by-funding-source-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-framework-contract-list',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    //this.getSummaryStats('framework-contract-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('framework-contract-by-funding-source-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-framework-contract-list',data?.selectedFinancialYear,data?.selectedPDE)
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue1 = 0
    this.cardValue2 = 0
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.cardValue1 = data.numberOfContracts?data.numberOfContracts:0
        this.cardValue2 = data.contractAmount?sanitizeCurrencyToString(data.contractAmount):0
        //this.allEvavluatedBidders = data.total_evaluated_bidders

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
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
        let categories = []
        let categorieValues = []
        let numOfBids = []

        

        switch (reportName) {
          case 'top-framework-contract-list':
            console.log("top-framework-contract-list", data)

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

            this.topTenHighestContracts = data
            this.highestFrameWorkContractValue = data[0]?.contractValue?sanitizeCurrencyToString(data[0]?.contractValue):0

            data.forEach(element => {
              var valueC = (element?.contractValue)?element?.contractValue.split(','):['0']
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subject_of_procurement))
              estimatedAmount.push(valueD)
              // actualAmount.push(valueF)
            });

            this.cardValue1 = data.length
            this.cardValue2 = addArrayValues(estimatedAmount)

            this.chart?.updateOptions({
              series: [
                {
                  name: "Estimated Amount",
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
            break;
          case 'framework-contract-by-funding-source-summary':
            console.log("framework-contract-by-funding-source-summary", data)

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

            data.forEach(element => {
              var valueC = (element?.contractAmount)?element?.contractAmount.split(','):['0']              
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.numberOfContracts
              // var valueF = parseInt(valueE.join(''))

              subjectOfProcurement.push(capitalizeFirstLetter(element.procurementMethod))
              estimatedAmount.push(valueD)
              actualAmount.push(parseInt(valueE))
            });
            this.chartFundingSource?.updateOptions({
              series: [
                {
                  name: "Contract Value",
                  type: "column",
                  data: estimatedAmount
                },
                {
                  name: "Number Of Contracts",
                  type: "line",
                  data: actualAmount
                }
              ],
              xaxis: {
                categories: subjectOfProcurement,
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
        categories: []
      },
      yaxis: {
        title: {
          text: "Contract Manager "
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
        text: "Contract Managers with Highest Contract Values"
      },
    };

    this.chartOptionsFundingSource = {
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
        fontFamily:'Trebuchet Ms',
        height: 500,
        type: "line"
      },
      // plotOptions: {
      //   bar: {
      //     horizontal: false,
      //     columnWidth: "35%",
      //     borderRadius: 2
      //   }
      // },


      // stroke: {
      //   show: true,
      //   width: 2,
      // },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Completed Contracts by Funding Source",
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


}