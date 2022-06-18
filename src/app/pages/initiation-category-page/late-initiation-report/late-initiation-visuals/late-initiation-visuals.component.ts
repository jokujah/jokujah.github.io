import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';

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

export type ChartOptionsLateInitiationsTopTen  = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  noData:ApexNoData
};

@Component({
  selector: 'app-late-initiation-visuals',
  templateUrl: './late-initiation-visuals.component.html',
  styleUrls: ['./late-initiation-visuals.component.scss']
})
export class LateInitiationVisualsComponent implements OnInit, OnDestroy {

  @ViewChild("chartLateInitiationsType") chartLateInitiationsType: ChartComponent;
  public chartOptionsLateInitiationsType: Partial<ChartOptions>;

  @ViewChild("chartLateInitiationsMethod") chartLateInitiationsMethod: ChartComponent;
  public chartOptionsLateInitiationsMethod: Partial<ChartOptions>;

  // @ViewChild("chartLateInitiationsTopTen") chartLateInitiationsTopTen!: ChartComponent;
  // public chartOptionsLateInitiationsTopTen: Partial<ChartOptions> | any;

  @ViewChild("chartLateInitiationsTopTen")
  chartLateInitiationsTopTen!: ChartComponent;
  chartOptionsLateInitiationsTopTen: Partial<ChartOptionsLateInitiationsTopTen> | any;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsPercentageLateInitiation: Partial<ChartOptions> | any;
  public chartOptionsPlannedVsActualLateInitiation: Partial<ChartOptions> | any;

  downloading = false
  isLoading:boolean = false

  marketPrice ;
  numberOfRequisitions;
  numberOfCancelledRequisitions;
  requisitionEstimatedAmount;
  cancelledRequisitionEstimatedAmount;


  isError: boolean;

  isLoadingSummary: boolean = false;
  isLoadingPercentageSummary: boolean = false;

  subscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) {
      (window as any).Apex = {
        theme: {
          palette: 'palette4',
        },
        colors: ['#01529d', '#775DD0', '#69D2E7', '#FF9800'],
      };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  submit(data) {
    this.getSummaryStats('late-initiations-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getPlannedVsActualLateInitiations('actual-vs-late-initiations-summary', data?.selectedFinancialYear,data?.selectedPDE);
    this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE)
    // this.getVisualisation('late-initiations-by-method',data?.selectedFinancialYear,data?.selectedPDE)
    // this.getVisualisation('late-initiations-by-type',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
     this.getSummaryStats('late-initiations-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //  this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE)
    //  this.getVisualisation('late-initiations-by-method',data?.selectedFinancialYear,data?.selectedPDE)
    //  this.getVisualisation('late-initiations-by-type',data?.selectedFinancialYear,data?.selectedPDE)

  }


  getSummaryStats(reportName, financialYear, procuringEntity) {
    this.isLoadingSummary = true

    this._planingCategoryService.getSummaryStatsWithPDE(reportName, financialYear, procuringEntity).subscribe(
      (response) => {
        this.isLoadingSummary = false;
        let data = response.data[0]

        if (response.data.length > 0) {
          this.marketPrice = data.marketPrice ? sanitizeCurrencyToString(data.marketPrice) : 0;
          this.numberOfRequisitions = data.numberOfRequisitions ? sanitizeCurrencyToString(data.numberOfRequisitions) : 0;
          this.numberOfCancelledRequisitions = data.numberOfCancelledRequisitions ? sanitizeCurrencyToString(data.numberOfCancelledRequisitions) : 0;
          this.requisitionEstimatedAmount = data.requisitionEstimatedAmount ?sanitizeCurrencyToString(data.requisitionEstimatedAmount) : 0;
          this.cancelledRequisitionEstimatedAmount = data.cancelledRequisitionEstimatedAmount ? sanitizeCurrencyToString(data.cancelledRequisitionEstimatedAmount) : 0;
        }

      },
      (error) => {
        this.isLoadingSummary = false;
        console.error('Error ', error);
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true

    this.chartLateInitiationsTopTen?.updateOptions({
      series: [],
      xaxis: {
        categories:[],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#D10CE8",
            ],
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

    this.chartLateInitiationsMethod?.updateOptions({

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

    this.chartLateInitiationsType?.updateOptions({
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

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
          switch (reportName) {
            case'late-initiations-by-type':
              this.chartLateInitiationsType?.updateOptions({
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
            case'late-initiations-by-method':
              this.chartLateInitiationsMethod?.updateOptions({

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
            case'top-late-initiations':
              this.chartLateInitiationsMethod?.updateOptions({
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
        this.isLoading = false;
        console.error('Error ', error)
        this.chartLateInitiationsTopTen?.updateOptions({
          series: [],
          xaxis: {
            categories:[],
            labels: {
              style: {
                colors: [
                  "#008FFB",
                  "#D10CE8",
                ],
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

        this.chartLateInitiationsMethod?.updateOptions({

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

        this.chartLateInitiationsType?.updateOptions({
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
      }
    )

  }

  getPlannedVsActualLateInitiations(reportName?: string, financialYear?: string, procuringEntity?: string) {
    this.isLoadingPercentageSummary = true;
    this.subscription = this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear, procuringEntity).subscribe(
      (res) => {
        this.isLoadingPercentageSummary = false;

        let plannedVsActualInitiations = res.data[0];
        const percentageOfInitiation = ((parseInt(plannedVsActualInitiations.numberOfLateRequisitions.split(',').join('')) / parseInt(plannedVsActualInitiations.numberOfRequisitions.split(',').join(''))) * 100).toFixed(2);
        const percentageData = [percentageOfInitiation];

        this.initPercentageInitiationChart(percentageData);
        console.log('percentageOfInitiation ', percentageOfInitiation);
        console.log('plannedVsActualInitiations', plannedVsActualInitiations[0]);
      },
      (error) => {
        this.isLoadingPercentageSummary = false;
        console.error(error);
      }
    );
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){

  }

  public initPercentageInitiationChart(percentageData?: Array<string>)
  {
    this.chartOptionsPercentageLateInitiation = {
      series: percentageData,
      chart: {
        fontFamily: 'Trebuchet MS',
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: 70
          }
        }
      },
      title: {
        text: 'Percentage of Late Initiations',
        align: 'center',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      labels: ["% of Late Initiations"]
    };
  }
}





