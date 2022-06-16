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
  ChartComponent,
  ApexResponsive,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { capitalizeFirstLetter, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';


export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels | any;
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
  noData:ApexNoData;
  labels: string[];
  responsive:ApexResponsive[],
};

@Component({
  selector: 'app-terminated-contracts-visuals',
  templateUrl: './terminated-contracts-visuals.component.html',
  styleUrls: ['./terminated-contracts-visuals.component.scss']
})
export class TerminatedContractsVisualsComponent implements OnInit {
 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  @ViewChild("chartTerminated") chartTerminated: ChartComponent;
  public chartOptionsTerminated: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  cardValue3;

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
    this.getSummaryStats('terminated-contract-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-terminated-contracts',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('terminated-contract-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-terminated-contracts',data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue2 = 0
    this.cardValue1 = 0
    

    console.log(reportName)

    this.chartTerminated?.updateOptions({
      series:[],
      labels: [],
      noData:{
        text:'Loading Data'
      }
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.noOfTerminatedContracts?data.noOfTerminatedContracts:0
          this.cardValue2 = data.contractValue?sanitizeCurrencyToString(data.contractValue):0
          this.cardValue3 = data.costResultingFromTermination?sanitizeCurrencyToString(data.costResultingFromTermination):0
          this.chartTerminated?.updateOptions({
            series:[this.cardValue2,this.cardValue3],
            labels: ['Contract Value','Termination Cost'],
            noData:{
              text:'No Data Available ...'
            }
          })
        }else{

        this.chartTerminated?.updateOptions({
          series:[],
          labels: [],
          noData:{
            text:'No Data Available ...'
          }
        })}
        

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.chartTerminated?.updateOptions({
          series: [],
          labels: [],
          noData:{
            text:'Error Loading Data ...'
          }
        })
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
        let actualAmount = []
        let sortedData = []

        switch (reportName) {
          case 'top-terminated-contracts':           
            console.log("top-terminated-contracts", data)

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
              var valueC = (element?.contractValue)?(element?.contractValue.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              var valueE = (element?.costResultingFromTermination)?(element?.costResultingFromTermination.split(',')):['0'];
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subject_of_procurement))
              contractValue.push(valueD)
              actualAmount.push(valueF)
            });
            this.chart?.updateOptions({
              series: [
                {
                  name: "Contract Value",
                  data: contractValue
                },
                {
                  name: "Cost Resulting From Termination",
                  type: "line",
                  data: actualAmount
                }
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
      }
    )
  }


  initCharts(){
    this.chartOptions = {
      series: [ ],
      chart: {
        fontFamily:'Trebuchet Ms',
        type: "bar",
        height: 450,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          borderRadius: 2,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries:[0,1],
       
        style: {
          colors: ['#fff'],
          fontWeight:'bold',
          fontSize:'12px'
        },
        formatter:function(val){
          return NumberSuffix(val,2)
        }
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
          text: "Subjects of Procurement "
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled:true,
        shared:true,
        intersect: false,
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
        text: "Top Terminated Contracts",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1286f3'
        },
      },
    };

    this.chartOptionsTerminated = {
      series: [],
      title: {
        text: "% Value of Terminated Contracts",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1286f3'
        },
      },
      chart: {
        type: "donut",
        fontFamily:'Trebuchet Ms',
        width:'100%'
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show:false,
              },
              value: {
                show: true,
                formatter: function (val) {
                  return 'UGX'+NumberSuffix(val,2)
                }
              }
            }
          }
        }
      },
      labels: [],
      dataLabels:{
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function(value) {
            return `${NumberSuffix(value,2)}` 
          }
        }
      },      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      noData:{
        text:'Loading Data'
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    };
  }

  

}
