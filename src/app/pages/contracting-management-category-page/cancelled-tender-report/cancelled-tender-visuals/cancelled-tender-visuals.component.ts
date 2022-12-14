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
import { capitalizeFirstLetter, NumberSuffix, sanitizeCurrencyToString, sortTable, sortArrayBy } from 'src/app/utils/helpers';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: ApexGrid;
  colors: any;
  toolbar: any;  
  plotOptions: ApexPlotOptions;  
  legend: ApexLegend;
  noData:ApexNoData
};

@Component({
  selector: 'app-cancelled-tender-visuals',
  templateUrl: './cancelled-tender-visuals.component.html',
  styleUrls: ['./cancelled-tender-visuals.component.scss']
})
export class CancelledTenderVisualsComponent implements OnInit {
 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  topCancelledContracts: any;
  sortTable = sortTable
  dir = 'asc'

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
    this.getSummaryStats('cancelled-tender-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-cancelled-tender-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('cancelled-tender-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-cancelled-tender-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
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
          this.cardValue1 = data.noOfCancelledTenders?sanitizeCurrencyToString(data.noOfCancelledTenders):0
          this.cardValue2 = data.totalContractValue?sanitizeCurrencyToString(data.totalContractValue):0
          //this.allEvavluatedBidders = data.total_evaluated_bidders
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
    this.topCancelledContracts = []

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
          case 'top-cancelled-tender-list-summary':           
            console.log("top-cancelled-tender-list-summary", data)

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

            this.topCancelledContracts =sortArrayBy(data,'contractValue')

            //var sortedTender = sortArrayBy(this.topCancelledContracts,contractValue)
            
            data.forEach(element => {
              console.log(element)
              var valueC = (element?.contractValue)?(element?.contractValue.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              contractValue.push(valueD)
              // actualAmount.push(valueF)
            });


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
        text: 'Loading Data ...'
      },
      title: {
        text: "Cancelled Tenders with Highest Contract Values",
        style:{
          fontSize:'14px'
        }
      },
    };
  }

}
