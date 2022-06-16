import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import html2canvas from 'html2canvas';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  noData:ApexNoData;
  plotOptions: ApexPlotOptions;
  legend:ApexLegend;
};

@Component({
  selector: 'app-pde-bid-average-visuals',
  templateUrl: './pde-bid-average-visuals.component.html',
  styleUrls: ['./pde-bid-average-visuals.component.scss']
})
export class PdeBidAverageVisualsComponent implements OnInit {

  @ViewChild("chartSolicitationsType") chartSolicitationsType: ChartComponent;
  public chartOptionsSolicitationsType: Partial<ChartOptions>;

  
  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl(this.financialYears[0]);
  downloading = false
  isLoading:boolean = false
  registeredProviders

  totalValueofPlannedContracts ;
  numberOfPlannedContracts;
  yearOfPlannedContracts ;
  numberOfRegisteredEntities  ;
  topTenHighestContracts

  cardValue1;
  cardValue2;
  cardValue3;
  cardValue4;
  cardValue5;
  isEmpty: boolean;

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) {

    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
    this.isEmpty= true
  }

  ngOnInit(): void {
    this.initCharts()
  }

  submit(data) {
    this.getSummaryStats('solicitation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('solicitations-by-method',data?.selectedFinancialYear,data?.selectedPDE)   
  }
  
  reset(data){
     this.getSummaryStats('solicitation-summary',data?.selectedFinancialYear,data?.selectedPDE)
     this.getVisualisation('solicitations-by-method',data?.selectedFinancialYear,data?.selectedPDE)      
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue1 = 0
    this.cardValue2 = 0
    this.cardValue3 = 0

    
    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data[0]
        console.log(data)
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfBids?sanitizeCurrencyToString(data.numberOfBids):0
          this.cardValue2 = data.numberOfBidsRespondedTo?sanitizeCurrencyToString(data.numberOfBidsRespondedTo):0
          this.cardValue3 = data.numberOfProvidersThatResponded?parseInt(data.numberOfProvidersThatResponded):0
          // this.cardValue3 = '2,000,000,000'
        }

        this.isLoading = false;
        },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
      }
    )

  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.chartSolicitationsType?.updateOptions({
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
        text: 'Loading Data ...'
      } 
    })

    console.log(`Visualistion ${reportName} + ${financialYear} + ${procuringEntity}`,)

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
          switch (reportName) {
            case'solicitations-by-method':
              console.log(`Report Name ${reportName}`,data)

              this.chartSolicitationsType?.updateOptions({
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
                  text: 'No Data Available...'
                } 
              })

            break;
          }

        this.isLoading = false
        },
      (error) => {
        console.log(error)
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });    
        this.chartSolicitationsType?.updateOptions({
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
            text: 'Error Loading Data ...'
          } 
        })
        this.isLoading = false
      }
    )

  } 

 

   getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptionsSolicitationsType ={
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
        fontFamily: 'Trebuchet MS',
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 2
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Solicitations by Procurement Method"
      },
      dataLabels: {
        enabled: false,
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
              colors: [
                "#008FFB",
              ],
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
      fill: {
        opacity: 1
      },
      // tooltip: {
      //   y: {
      //     formatter: function(val) {
      //       return "UGX " + NumberSuffix(val,2) ;
      //     }
      //   }
      // },
      noData: {
        text: 'Loading Data'
      }
    };
  }
}



