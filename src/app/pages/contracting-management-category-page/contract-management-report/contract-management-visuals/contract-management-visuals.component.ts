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
  selector: 'app-contract-management-visuals',
  templateUrl: './contract-management-visuals.component.html',
  styleUrls: ['./contract-management-visuals.component.scss']
})
export class ContractManagementVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartProcurementMethod") chartProcurementMethod: ChartComponent;
  public chartOptionsProcurementMethod: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue1;
  cardValue2
  

  topTenHighestContracts 
  highestContractValue: any;
  contractManagerOfHighestContractValue: any;
  highestContractValueByMethod: any;
  procurementMethodOfHighestContractValue: any;
  


  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {  }

  ngOnInit(): void {
    this.initCharts()
  }



  submit(data) {
    this.getSummaryStats('contract-management-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contract-management-by-procurement-method',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-contracts-at-management-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('contract-management-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contract-management-by-procurement-method',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-contracts-at-management-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
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
          case 'top-contracts-at-management-list-summary':
            console.log("top-contracts-at-management-list-summary", data)
            data.forEach(element => {
              var valueC = (element?.contractAmount)?element?.contractAmount.split(','):['0']
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.contractManager))
              estimatedAmount.push(valueD)
              // actualAmount.push(valueF)
            });

            this.highestContractValue = estimatedAmount[0]
            this.contractManagerOfHighestContractValue = subjectOfProcurement[0]

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
                    return NumberSuffix(val, 0)
                  }
                }
              },
              
              noData: {
                text: 'No Results found,Try adjusting your search or filter to get results'
              }
            })
            // if((data.length <= 0)|| !data){
            //   this.chart.destroy()
            // }
            break;
          case 'contract-management-by-procurement-method':
            console.log("contract-management-by-procurement-method", data)
            data.forEach(element => {
              var valueC = (element?.contractAmount)?element?.contractAmount.split(','):['0']              
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.numberOfContracts
              // var valueF = parseInt(valueE.join(''))

              subjectOfProcurement.push(capitalizeFirstLetter(element.procurementMethod))
              estimatedAmount.push(valueD)
              actualAmount.push(parseInt(valueE))
            });

            this.highestContractValueByMethod = estimatedAmount[0]
            this.procurementMethodOfHighestContractValue = subjectOfProcurement[0]


            this.chartProcurementMethod?.updateOptions({
              series: [
                {
                  name: "Contract Value",
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
                    return NumberSuffix(val, 2)
                  }
                }
              },
              noData: {
                text: 'No Results found,Try adjusting your search or filter to get results'
              }
            })
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

        // this.chart.destroy()
        this.chartProcurementMethod.destroy()

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
        height: '350px',
        fontFamily:'Trebuchet Ms'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          borderRadius: 2,
          dataLabels: {
            position: 'top'
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
          return NumberSuffix(val,0)
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [],
        title:{
          text:'Contract Manager'
        }
      },
      yaxis: {
        title: {
          text: "Contract Value "
        },
        //showForNullSeries:false,
        labels: {
          style: {             
            fontSize: "12px"
          },
          minWidth: 0,
          maxWidth: 700,
          formatter: function (val) {
            return NumberSuffix(val, 0)
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "UGX " + NumberSuffix(val,0) ;
          }
        }
      },
      noData: {
        text: 'No Data Available ...'
      },
      title: {
        text: "Contract Managers with Highest Contract Values",
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            //color: '#1286f3'
          },
      },
    };

    this.chartOptionsProcurementMethod = {
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
        height: 350,
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
        text: "Contract Management by Procurement Methods",
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            //color: '#1286f3'
          },
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
          }
        },
        {
          opposite: true,
          title: {
            text: "Number of Contracts"
          }
        }
      ],
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