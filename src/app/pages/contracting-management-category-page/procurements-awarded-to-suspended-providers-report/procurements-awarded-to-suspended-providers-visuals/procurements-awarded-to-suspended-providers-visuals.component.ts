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
import { capitalizeFirstLetter, NumberSuffix, sanitizeCurrencyToString, sortTable } from 'src/app/utils/helpers';


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
  selector: 'app-procurements-awarded-to-suspended-providers-visuals',
  templateUrl: './procurements-awarded-to-suspended-providers-visuals.component.html',
  styleUrls: ['./procurements-awarded-to-suspended-providers-visuals.component.scss']
})
export class ProcurementsAwardedToSuspendedProvidersVisualsComponent implements OnInit {
 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  dir;
  sortTable = sortTable

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  topTenHighestContracts: any;
  highestValue: number;
  highestSubjectOfProcurement: any;
  highestProviderName: any;

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
    this.getSummaryStats('awarded-contracts-to-suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('list-awarded-contracts-to-suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('awarded-contracts-to-suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('list-awarded-contracts-to-suspended-providers-summary',data?.selectedFinancialYear,data?.selectedPDE)
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
          this.cardValue1 = data.noOfContracts?data.noOfContracts:0
          this.cardValue2 = data.contractAmount?sanitizeCurrencyToString(data.contractAmount):0
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
      
    this.topTenHighestContracts = []
    this.highestValue = null
    this.highestSubjectOfProcurement = null
    this.highestProviderName = null

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
          case 'list-awarded-contracts-to-suspended-providers-summary':           
            console.log("list-awarded-contracts-to-suspended-providers-summary", data)

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
              console.log(element)
              var valueC = (element?.contractAmount)?(element?.contractAmount.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              // var valueE = element?.actualCost.split(',')
              // var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              contractValue.push(valueD)
              // actualAmount.push(valueF)
            });

            this.topTenHighestContracts = data
            console.log(data[0]?.contractAmount)
            this.highestValue = sanitizeCurrencyToString((data[0]?.contractAmount)? (data[0]?.contractAmount):0)
            this.highestSubjectOfProcurement = data[0]?.subjectOfProcurement?data[0]?.subjectOfProcurement:'Unknown'
            this.highestProviderName = data[0]?.providerName?data[0]?.providerName:'Unknown'
            
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
        text: "Procurements with Highest Contract Values awarded to Suspended Providers",
        style:{
          fontSize:'14px'
        }
      },
    };
  }

}
