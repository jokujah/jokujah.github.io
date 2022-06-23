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
import { initColumnChart, initRadialChart } from 'src/app/utils/chartsApex';
import { ChartOptions } from 'src/app/utils/IChartOptions';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels|any;
//   plotOptions: ApexPlotOptions;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   fill: ApexFill;
//   tooltip: ApexTooltip;
//   stroke: ApexStroke;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle,
//   noData:ApexNoData
// };


@Component({
  selector: 'app-actual-vs-planned-procurement-visuals',
  templateUrl: './actual-vs-planned-procurement-visuals.component.html',
  styleUrls: ['./actual-vs-planned-procurement-visuals.component.scss']
})
export class ActualVsPlannedProcurementVisualsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  valueOfContracts;
  numberOfContracts;
  yearOfBids;
  allEvavluatedBidders;

  topTenHighestContracts 
  actualNumberOfContracts: number;
  plannedNumberOfContracts: number;
  actualValueOfContracts: any;
  plannedValueOfContracts: any;
  averagePlannedValueOfContracts: number;
  averageActualValueOfContracts: number;
  


  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {}

  ngOnInit(): void {
    //this.initCharts()
  }



  submit(data) {
    this.getSummaryStats('plan-vs-actual-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('top-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('plan-vs-actual-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('top-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)

  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response) => {
        console.log(response)
        if(response.data.length > 0){
        let data = {
          actualNumber: response.data[0]?.numberOfProcurementItems,
          actualValueOfContracts: response.data[0]?.marketPrice,
          plannedNumber: response.data[1]?.numberOfProcurementItems,
          plannedValueOfContracts: response.data[1]?.marketPrice
        }

        console.log('Datat in if',data)

        this.actualNumberOfContracts = (data?.actualNumber) ? sanitizeCurrencyToString(data.actualNumber) : 0
        this.actualValueOfContracts = (data?.actualValueOfContracts) ? sanitizeCurrencyToString(data?.actualValueOfContracts) : 0
        this.plannedNumberOfContracts = (data?.plannedNumber) ? sanitizeCurrencyToString(data.plannedNumber) : 0
        this.plannedValueOfContracts = (data?.plannedValueOfContracts) ? sanitizeCurrencyToString(data?.plannedValueOfContracts) : 0

        let averagePlanned = sanitizeCurrencyToString(data?.plannedValueOfContracts) / sanitizeCurrencyToString(data?.plannedNumber)
        let averageActual = sanitizeCurrencyToString(data?.actualValueOfContracts) / sanitizeCurrencyToString(data?.actualNumber)
        
        this.averagePlannedValueOfContracts = averagePlanned
        this.averageActualValueOfContracts = averageActual

          let series = [{
            name: "Actual",
            data: [sanitizeCurrencyToString(data?.actualValueOfContracts)]
          }, {
            name: "Planned",
            data: [sanitizeCurrencyToString(data?.plannedValueOfContracts)]
          }]        

        let seriesCategories = ['Actual Value','Planned Value']
       
        this.chartOptions = initColumnChart(
            series,
            seriesCategories,
            'Actual Vs Planned by Contract Value',
            'Contract Value(UGX)',
            'Subject Of Procurement'
          )
        }

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
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = 0

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
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let estimatedAmount = []
        let actualAmount = []
        let sortedData = []

        switch (reportName) {
          case 'top-contracts-summary':           
            console.log("AWARDED", data)

            sortedData = data.sort(function (a, b) {
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
            
            sortedData.forEach(element => {
              var valueC = element?.estimatedAmount.split(',')
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              estimatedAmount.push(valueD)
              // actualAmount.push(valueF)
            });
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
              noData: {
                text: 'No Data Available...'
              },
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
          },
        })
        console.log(error)
        throw error
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  // initCharts(){
  //   this.chartOptions = {
  //     series: [ ],
  //     chart: {
  //       type: "bar",
  //       height: '450px',
  //       fontFamily:'Trebuchet Ms'
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: true,
  //         columnWidth: "35%",
  //         borderRadius: 2,
  //         dataLabels: {
  //           position: 'top'
  //         }
  //       }
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ["transparent"]
  //     },
  //     xaxis: {
  //       categories: [],
  //       title: {
  //         text: "Contract Value"
  //       }
  //     },
  //     yaxis: {
  //       title: {
  //         text: "Subject of Procurement"
  //       }
  //     },
  //     fill: {
  //       opacity: 1
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function(val) {
  //           return "UGX " + NumberSuffix(val,2) ;
  //         }
  //       }
  //     },
  //     noData: {
  //       text: 'Loading Data ...'
  //     },
  //     title: {
  //       text: "Actual Vs Planned Procurements",
  //       style: {
  //         fontSize: '16px',
  //         fontWeight: 'bold',
  //         // color: '#1286f3'
  //       },
  //     },
  //     dataLabels: {
  //       enabled: true,
  //       style: {
  //         colors: ['#333'],
  //         fontWeight:'bold',
  //         fontSize:'12px'
  //       },
  //       offsetX:60,
  //       formatter:function(val){
  //         return NumberSuffix(val,2)
  //       }
  //     },
  //   };
  // }

}