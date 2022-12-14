import { actualRadialChart, initColumnChart, initRadialChart } from 'src/app/utils/chartsApex';
import { PlaningAndForecastingReportService } from './../../../../services/PlaningCategory/planing-and-forecasting-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend,
  ApexNoData,
  ApexChart,
  ApexGrid,
  ChartComponent
} from "ng-apexcharts";
import { capitalizeFirstLetter, getDays, NumberSuffix, sanitizeCurrencyToString, sortTable } from 'src/app/utils/helpers';
import { ChartOptions } from 'src/app/utils/IChartOptions';

@Component({
  selector: 'app-contracts-completed-on-time-visuals',
  templateUrl: './contracts-completed-on-time-visuals.component.html',
  styleUrls: ['./contracts-completed-on-time-visuals.component.scss']
})
export class ContractsCompletedOnTimeVisualsComponent implements OnInit {
 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartRadialBar") chartRadialBar: ChartComponent;
  public chartOptionsRadialBar: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  cardValue3;
  cardValue4;

  dir
  sortTable = sortTable

  isEmpty = true
  completedOnTime: any =[];

  constructor(
    private toastr: ToastrService,
    private _service: PlaningAndForecastingReportService
  ) {}
   

  ngOnInit(): void {
    this.initCharts();
  }

  getFontSize() {
    return Math.max(10, 12);
  }


  submit(data) {
    this.getSummaryStats('completed-contracts-on-time-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-completed-contracts-on-time-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('completed-contracts-on-time-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-completed-contracts-on-time-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue2 = 0
    this.cardValue1 = 0
    this.cardValue3 = 0
    this.cardValue4 = 0
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        // Late
        let data = response.data[0]
        // On Time
        let data2 = response.data[1]
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfContracts?sanitizeCurrencyToString(data.numberOfContracts):0
          this.cardValue2 = data.totalActualContractValue?sanitizeCurrencyToString(data.totalActualContractValue):0
          this.cardValue3 = data2.numberOfContracts?sanitizeCurrencyToString(data2.numberOfContracts):0
          this.cardValue4 = data2.totalActualContractValue?sanitizeCurrencyToString(data2.totalActualContractValue):0

          let series =[this.cardValue4,this.cardValue2]
          let categories = ['Completed On Time','Other Contracts']
          this.chartOptionsRadialBar = initColumnChart(series,categories,'% Completed On Time') 
          //actualRadialChart(series,categories,'% Completed On Time')
        }else{
          this.chartOptionsRadialBar = initColumnChart([],['Completed On Time','Other Contracts'],'% Completed On Time')
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
    this.completedOnTime = [];  

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
      },
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let contractValue = []
        // let actualAmount = []
        // let sortedData = []

        switch (reportName) {
          case 'top-completed-contracts-on-time-summary':           
            console.log("top-completed-contracts-on-time-summary", data)

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
            
           if(response.data.length>0){ data.forEach(element => {
              console.log(element)
              var valueC = (element?.contractAmount)?(element?.contractAmount.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              contractValue.push(valueD)
              // actualAmount.push(valueF)
            });

            this.completedOnTime = data.map((element)=>{
              if (element.subjectOfProcurement) {
                if (element?.plannedCompletionDate && element?.actualEndDate) {
                  return {
                    ...element,
                    daysLeft: getDays(element?.plannedCompletionDate, element?.actualEndDate)
                  }
                } else {
                  return {
                    ...element,
                    daysLeft: getDays(element?.plannedCompletionDate, element?.actualEndDate)
                  }
                }
              }
            }).sort(function (a, b) {
                var valueA = a?.daysLeft
                var valueB = b?.daysLeft
                let ds = {
                  A:valueA,
                  B:valueB
                }
                console.log(ds)
                if (valueA > valueB) {
                  return -1;
                }
                if (valueA < valueB) {
                  return 1;
                }
                return 0;
              }).filter((element)=>{return element.daysLeft >= 0})

            console.log(this.completedOnTime)
            this.chart?.updateOptions({
              series: [
                {
                  name: "Contract Value",
                  data: contractValue
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
              noData: {
                text: 'No Data Available...'
              },
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
            text: 'Error Loading Data...'
          },
        })
        console.log(error)
        throw error
      }
    )
  }


  initCharts(){
    this.chartOptions = {
      series: [ ],
      chart: {
        fontFamily:'Trebuchet Ms',
        type: "bar",
        height: '500px'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          borderRadius: 2,
          dataLabels:{
            position:'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        style:{
          colors:['#333']
        },
        offsetX:0,
        formatter:function(val){
          return NumberSuffix (val,0)
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
          text: 'Contract Value (UGX)'
        },
        // labels:{
        //   formatter:function(val){
        //     return NumberSuffix(val,0)
        //   }
        // }
      },
      yaxis: {
        title: {
          text: "Subject of Procurement "
        },
        labels:{
          minWidth:0,
          maxWidth:700
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
        text: 'Loading Data ...'
      },
      title: {
        text: "Completed Contracts on Time with Highest Contract Values",
        style:{
          fontSize:'14px'
        }
      },
    };
  }

}
