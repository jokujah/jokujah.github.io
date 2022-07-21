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
  ApexGrid
} from "ng-apexcharts";
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, visualisationMessages, sortArrayBy } from 'src/app/utils/helpers';
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
  grid:ApexGrid
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
  

  topTenHighestContracts = []
  highestContractValue: any;
  contractManagerOfHighestContractValue: any;
  highestContractValueByMethod: any;
  procurementMethodOfHighestContractValue: any;
  


  constructor(
    private _service: AwardedContractReportService
    ) {  }

  ngOnInit(): void {}



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

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data[0]
        
        this.cardValue1 = data.numberOfContracts?sanitizeCurrencyToString(data.numberOfContracts):0
        this.cardValue2 = data.contractAmount?sanitizeCurrencyToString(data.contractAmount):0
       
        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.highestContractValue = 0
    this.contractManagerOfHighestContractValue=''
    this.topTenHighestContracts = []


    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let estimatedAmount = []
        let actualAmount = []       

        switch (reportName) {
          case 'top-contracts-at-management-list-summary':
            console.log("top-contracts-at-management-list-summary", data)
            if (response.data.length > 0) {
              data.forEach(element => {
                var valueC = (element?.contractAmount) ? element?.contractAmount.split(',') : ['0']
                var valueD = parseInt(valueC.join(''))
                subjectOfProcurement.push(capitalizeFirstLetter(element.contractManager))
                estimatedAmount.push(valueD)
              });

              this.topTenHighestContracts = data.map((element)=>{
                let valueC = (element?.contractAmount) ? element?.contractAmount.split(',') : ['0']
                let valueD = parseInt(valueC.join(''))
                return {
                  ...element,
                  contractAmount:valueD
                }
              })
              this.highestContractValue = estimatedAmount[0]
              this.contractManagerOfHighestContractValue = subjectOfProcurement[0]

              this.initChartContractManagers(
                [
                  {
                    name: "Estimated Amount",
                    data: estimatedAmount
                  }
                ],
                subjectOfProcurement
              )
            }else{
              this.initChartContractManagers([],[])
            }
            break;
          case 'contract-management-by-procurement-method':
            console.log("contract-management-by-procurement-method", data)
            if (response.data.length > 0) {
              let sortedArray = sortArrayBy(data, 'contractAmount')
              sortedArray.forEach(element => {
                var valueC = (element?.contractAmount) ? element?.contractAmount.split(',') : ['0']
                var valueD = parseInt(valueC.join(''))
                var valueE = element?.numberOfContracts
                subjectOfProcurement.push(capitalizeFirstLetter(element.procurementMethod))
                estimatedAmount.push(valueD)
                actualAmount.push(parseInt(valueE))
              });

              this.highestContractValueByMethod = estimatedAmount[0]
              this.procurementMethodOfHighestContractValue = subjectOfProcurement[0]

              this.initChartProcurementMethod(
                [
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
                subjectOfProcurement
              )
            } else {
              this.initChartProcurementMethod([], [])
            }
            break;
          }         
          this.isLoading = false
        },
      (error) => {
        this.initChartContractManagers([],[]) 
        this.initChartProcurementMethod([],[])
        this.isLoading = false    
        throw error
      }
    )
  }

 

  initChartProcurementMethod(series?:any,labels?:any,noDataMessage?:any){
    this.chartOptionsProcurementMethod = {
      series: series,
      chart: {
        fontFamily:'Trebuchet Ms',
        height: 450,
        type: "line"
      },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Contract Management by Procurement Methods",
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
          },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      xaxis: {
        floating:labels.length > 0 ? false:true,
        axisTicks: {
          show: labels.length > 0 ? true:false,
          // color: '#940033',
        },
        axisBorder: {
          show: labels.length > 0 ? true:false,
          //color: '#940033',
        },
        categories: labels,
        labels: {
          show: labels.length > 0 ? true:false,
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
          show:labels.length > 0 ? true:false,
          floating:labels.length > 0 ? false:true,
          axisTicks: {
            show: labels.length > 0 ? true:false,
            //color: '#940033',
          },
          axisBorder: {
            show: labels.length > 0 ? true:false,
            //color: '#940033',
          },
          labels: {
            show: labels.length > 0 ? true:false,
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
          },
          show:labels.length > 0 ? true:false,
          floating:labels.length > 0 ? false:true,
          axisTicks: {
            show: labels.length > 0 ? true:false,
            //color: '#ff9600',
          },
          axisBorder: {
            show: labels.length > 0 ? true:false,
            //color: '#ff9600',
          },
          labels: {
            show: labels.length > 0 ? true:false,
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
        text: noDataMessage?noDataMessage:visualisationMessages('empty')
      },
      grid: {
        show: labels.length > 0 ? true : false,
        xaxis: {
          lines: {
            show:  false,
          }
        },
        yaxis: {
          lines: {
            show: labels.length > 0 ? true : false,
          }
        }
      }
    };
  }

  initChartContractManagers(series?:any,labels?:any,noDataMessage?:any){
    this.chartOptions = {
      series: series,
      chart: {
        type: "bar",
        height: '450px',
        fontFamily:'Trebuchet Ms'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "95%",
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
        floating:labels.length > 0 ? false:true,
        axisTicks: {
          show: labels.length > 0 ? true:false
        },
        axisBorder: {
          show: labels.length > 0 ? true:false
        },
        categories: labels,
        title: {
          text: 'Contract Value(UGX)'
        },
        labels: {
          show: labels.length > 0 ? true:false,
          style: {
            fontSize: "12px"
          },
          formatter: function (val) {
            return NumberSuffix(val, 0)
          }
        }
      },
      yaxis: {
        title: {
          text: "Contract Manager "
        },
        floating:labels.length > 0 ? false:true,
        axisTicks: {
          show: labels.length > 0 ? true:false
        },
        axisBorder: {
          show: labels.length > 0 ? true:false
        },
        labels: {
          show: labels.length > 0 ? true:false,
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
        text: noDataMessage?noDataMessage:visualisationMessages('empty')
      },
      title: {
        text: "Contract Managers with Highest Contract Values",
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            //color: '#1286f3'
          },
      },
      grid: {
        show: labels.length > 0 ? true : false,
        xaxis: {
          lines: {
            show:  false,
          }
        },
        yaxis: {
          lines: {
            show: labels.length > 0 ? true : false,
          }
        }
      }
    };
  }


}