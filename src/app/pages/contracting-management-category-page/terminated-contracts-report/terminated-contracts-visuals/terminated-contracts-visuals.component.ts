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
import { capitalizeFirstLetter, NumberSuffix, sanitizeCurrencyToString, visualisationMessages, emptyVisualisation, sortTable, emptyVisualisationNonAxis } from 'src/app/utils/helpers';


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

  dir
  sortTable = sortTable

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  cardValue3;
  topTenHighestContracts = [];
  highestCostResultingFromTermination: number;
  averageCostResultingFromTermination: number;



  constructor(
    private _service: PlaningAndForecastingReportService
  ) {}
   

  ngOnInit(): void {
    this.initCharts();
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
    this.cardValue3 = 0
    this.averageCostResultingFromTermination = 0

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.noOfTerminatedContracts ? sanitizeCurrencyToString(data.noOfTerminatedContracts) : 0
          this.cardValue2 = data.contractValue ? sanitizeCurrencyToString(data.contractValue) : 0
          this.cardValue3 = data.costResultingFromTermination ? sanitizeCurrencyToString(data.costResultingFromTermination) : 0
          if ((this.cardValue2 <= 0) && (this.cardValue3 <= 0)) {
            this.initChartTerminated([],[])
          } else {
            this.averageCostResultingFromTermination = (this.cardValue1 > 0) ? this.cardValue3 / this.cardValue1 : 0
            this.initChartTerminated([this.cardValue2, this.cardValue3],['Contract Value', 'Termination Cost'])
          }
        } else {
          this.initChartTerminated([],[])
        }
        this.isLoading = false
        },
      (error) => {
        this.initChartTerminated([],[])
        this.isLoading = false
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true  
    this.highestCostResultingFromTermination = 0
    this.topTenHighestContracts = [] 

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
            sortedData = data.sort(function (a, b) {
              var nameA = a?.costResultingFromTermination.split(',')
              var nameB = b?.costResultingFromTermination.split(',')
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

            this.topTenHighestContracts = sortedData
            
            sortedData.forEach(element => {
              var valueC = (element?.contractValue)?(element?.contractValue.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              var valueE = (element?.costResultingFromTermination)?(element?.costResultingFromTermination.split(',')):['0'];
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subject_of_procurement))
              contractValue.push(valueD)
              actualAmount.push(valueF)
            });
            this.highestCostResultingFromTermination = this.topTenHighestContracts[0]?.costResultingFromTermination ? sanitizeCurrencyToString(this.topTenHighestContracts[0]?.costResultingFromTermination):0
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
                text: visualisationMessages('empty')
              },
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
            text: visualisationMessages('error')
          },
        })
        throw error
      }
    )
  }


  initCharts() {
    this.chartOptions = {
      series: [],
      chart: {
        fontFamily: 'Trebuchet Ms',
        type: "bar",
        height: 450,
        stacked: true,
        // sparkline: {
        //   enabled: true
        // }
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
        enabledOnSeries: [0, 1],

        style: {
          colors: ['#fff'],
          fontWeight: 'bold',
          fontSize: '12px'
        },
        formatter: function (val) {
          return NumberSuffix(val, 2)
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
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 700
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        y: {
          formatter: function (val) {
            return "UGX " + NumberSuffix(val, 2);
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
          // color: '#1286f3'
        },
      },
    };
  }


  initChartTerminated(series?:any,labels?:any){
    this.chartOptionsTerminated = {
      series: series,
      title: {
        text: "% Value of Terminated Contracts",
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
        type: "donut",
        fontFamily:'Trebuchet Ms',
        width:'100%',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      }
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show:true,
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
      labels: labels,
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
        text:visualisationMessages('empty')
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
