import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart
} from "ng-apexcharts";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { sanitizeCurrencyToString, convertNumbersWithCommas, visualisationMessages } from 'src/app/utils/helpers';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
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

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsPercentageLateInitiation: Partial<ChartOptions> | any;
  public chartOptionsPlannedVsActualLateInitiation: Partial<ChartOptions> | any;
  public chartOptionsLateInitiationBreakdown: Partial<ChartOptions> | any;
  public optionsProgressBreakdown: Partial<ChartOptions> | any;
  public optionsProgressBreakdown1: Partial<ChartOptions> | any;
  public optionsProgressBreakdown2: Partial<ChartOptions> | any;
  public optionsProgressBreakdown3: Partial<ChartOptions> | any;
  public optionsProgressBreakdown4: Partial<ChartOptions> | any;
  public optionsProgressBreakdown5: Partial<ChartOptions> | any;

  downloading = false
  isLoading:boolean = false

  marketPrice ;
  numberOfRequisitions;
  numberOfCancelledRequisitions;
  requisitionEstimatedAmount;
  cancelledRequisitionEstimatedAmount;

  initiationEstimatedAmount: number = 0;
  lateInitiationEstimateAmount: number = 0;
  percentageOfInitiation: number = 0;

  isError: boolean;

  isLoadingSummary: boolean = false;
  isLoadingPercentageSummary: boolean = false;

  subscription: Subscription;

  breakdownIndicators = [];
  breakdowns: any;
  topLateInitiations: any = [];

  constructor(
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
    this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE);
  }

  reset(data){
     this.getSummaryStats('late-initiations-summary',data?.selectedFinancialYear,data?.selectedPDE)
     this.getPlannedVsActualLateInitiations('actual-vs-late-initiations-summary', data?.selectedFinancialYear,data?.selectedPDE);
     this.getVisualisation('top-late-initiations',data?.selectedFinancialYear,data?.selectedPDE);
  }


  getSummaryStats(reportName, financialYear, procuringEntity) {
    this.isLoadingSummary = true
    this.marketPrice = 0 
    this.numberOfRequisitions= 0
    this.numberOfCancelledRequisitions= 0
    this.requisitionEstimatedAmount= 0
    this.cancelledRequisitionEstimatedAmount= 0

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
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.subscription = this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        this.isLoading = false
        let data = response.data
        this.topLateInitiations = data;
        },
      (error) => {
        this.isLoading = false;
        console.error('Error ', error);
      }
    )

  }

  getPlannedVsActualLateInitiations(reportName?: string, financialYear?: string, procuringEntity?: string) {
    this.isLoadingPercentageSummary = true;
    this.subscription = this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear, procuringEntity).subscribe(
      (res) => {
        this.isLoadingPercentageSummary = false;

        let data = res.data[0];

        if(res.data?.length > 0) {
          this.initiationEstimatedAmount = data?.requisitionEstimatedAmount ? sanitizeCurrencyToString(data?.requisitionEstimatedAmount) : 0;
          this.lateInitiationEstimateAmount = data?.lateRequisitionEstimatedAmount ? sanitizeCurrencyToString(data?.lateRequisitionEstimatedAmount) : 0;

          let numOfLateRequisitions = data?.numberOfLateRequisitions ? sanitizeCurrencyToString(data?.numberOfLateRequisitions) : 0;
          let numOfRequisitions = data?.numberOfRequisitions ? sanitizeCurrencyToString(data?.numberOfRequisitions) : 0;

          this.percentageOfInitiation = parseFloat(((numOfLateRequisitions / numOfRequisitions) * 100).toFixed(2));


          // this.initPercentageInitiationChart(this.percentageOfInitiation ? [this.percentageOfInitiation] : ['0']);
          this.initPercentageInitiationChart([numOfRequisitions,numOfLateRequisitions])
          this.initPlannedVsActualInitiationChart([this.initiationEstimatedAmount, this.lateInitiationEstimateAmount]);

          this.breakdowns = this.getBreakdownPercentages(data);

          this.initLateInitiationBreakdownChart1(this.breakdowns[0]?.title, this.breakdowns[0]?.percentage);
          this.initLateInitiationBreakdownChart2(this.breakdowns[1]?.title, this.breakdowns[1]?.percentage);
          this.initLateInitiationBreakdownChart3(this.breakdowns[2]?.title, this.breakdowns[2]?.percentage);
          this.initLateInitiationBreakdownChart4(this.breakdowns[3]?.title, this.breakdowns[3]?.percentage);
          this.initLateInitiationBreakdownChart5(this.breakdowns[4]?.title, this.breakdowns[4]?.percentage);
        }
      },
      (error) => {
        
        this.isLoadingPercentageSummary = false;
        this.initPercentageInitiationChart([]);

          this.initPlannedVsActualInitiationChart([]);
        console.error(error);
      }
    );
  }

  getBreakdownPercentages(data: any) {
    const noOfPlanItems = data?.numberOfPlanItems ? sanitizeCurrencyToString(data?.numberOfPlanItems) : 0;

    const noOfRequisitions = data?.numberOfRequisitions ? sanitizeCurrencyToString(data?.numberOfRequisitions) : 0;

    const noOfCancelledRequisitions = data?.numberOfCancelledRequisitions ? sanitizeCurrencyToString(data?.numberOfCancelledRequisitions) : 0;

    const noOfLateRequisitions = data?.numberOfLateRequisitions ? sanitizeCurrencyToString(data?.numberOfLateRequisitions) : 0;

    const noOfCancelledLateRequisitions = data?.numberOfLateCancelledRequisitions ? sanitizeCurrencyToString(data?.numberOfLateCancelledRequisitions) : 0;

    this.breakdownIndicators = [
      {
        'title': '% of Plan Items',
        'percentage': +((noOfPlanItems/noOfPlanItems) * 100).toFixed(2)
      },
      {
        'title': '% of Initiations Made',
        'percentage': +((noOfRequisitions/noOfPlanItems) * 100).toFixed(2)
      },
      {
        'title': '% of Cancelled Initiations',
        'percentage': +((noOfCancelledRequisitions/ noOfRequisitions) * 100).toFixed(2)
      },
      {
        'title': '% of Late Initiations',
        'percentage': +((noOfLateRequisitions/noOfRequisitions) * 100).toFixed(2)
      },
      {
        'title': '% of Cancelled Late Initiations',
        'percentage': +((noOfCancelledLateRequisitions/noOfCancelledRequisitions) * 100).toFixed(2)
      }
    ];

    return this.breakdownIndicators;
  }

  public initPercentageInitiationChart(percentageData?: Array<string | number>)
  {
    this.chartOptionsPercentageLateInitiation = {
      series: percentageData,
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val) {
            return  convertNumbersWithCommas(val);
          },
        },
      },
      title: {
        text: 'On Time Vs Late Initiations by Number',
        align: 'center',
        margin: 2,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      chart: {
        fontFamily: 'Trebuchet MS',
        type: 'donut',
        width: '100%',
        height: 380,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 30,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '10px',
                fontFamily: 'Trebuchet MS',
                fontWeight: 'bold',
              },
              value: {
                fontSize: '10px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: (val) => `${convertNumbersWithCommas(val)}`,
              },
              total: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Trebuchet MS',
                label:'Total Number',
                fontWeight: '500',
                formatter: function (w) {
                  return `${convertNumbersWithCommas(
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  )}`;
                },
              },
            },
          },
        },
        legend: {
          position: 'bottom',
        },
      },
      legend: {
        show: true,
        offsetX: 0,
        offsetY: 15,
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
      },
      labels: ['On Time', 'Late Initiation'],
      // responsive: [
      //   {
      //     breakpoint: 320,
      //     options: {
      //       chart: {
      //         width: 260,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 280,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //       title: {
      //         style: {
      //           fontSize: '12px',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 640,
      //     options: {
      //       chart: {
      //         width: 360,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //       title: {
      //         style: {
      //           fontSize: '15px',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 768,
      //     options: {
      //       chart: {
      //         width: 380,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1024,
      //     options: {
      //       chart: {
      //         width: 400,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1280,
      //     options: {
      //       chart: {
      //         width: 480,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
      noData: {
        text: visualisationMessages('empty'),
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
      },
    };
  }

  public initPlannedVsActualInitiationChart(estimatedPrice?: Array<number>) {
    this.chartOptionsPlannedVsActualLateInitiation = {
      series: estimatedPrice,
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val) {
            return 'UGX ' + convertNumbersWithCommas(val);
          },
        },
      },
      title: {
        text: 'On Time Vs Late Initiations by Value',
        align: 'center',
        margin: 2,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      chart: {
        fontFamily: 'Trebuchet MS',
        type: 'donut',
        width: '100%',
        height: 380,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 30,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '10px',
                fontFamily: 'Trebuchet MS',
                fontWeight: 'bold',
              },
              value: {
                fontSize: '9px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: (val) => `UGX ${convertNumbersWithCommas(val)}`,
              },
              total: {
                show: true,
                fontSize: '9px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                label:'Total Value',
                formatter: function (w) {
                  return `UGX ${convertNumbersWithCommas(
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  )}`;
                },
              },
            },
          },
        },
        legend: {
          position: 'bottom',
        },
      },
      legend: {
        show: true,
        offsetX: 0,
        offsetY: 15,
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
      },
      labels: ['On Time', 'Late Initiation'],
      // responsive: [
      //   {
      //     breakpoint: 320,
      //     options: {
      //       chart: {
      //         width: 260,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 280,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //       title: {
      //         style: {
      //           fontSize: '12px',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 640,
      //     options: {
      //       chart: {
      //         width: 360,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //       title: {
      //         style: {
      //           fontSize: '15px',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 768,
      //     options: {
      //       chart: {
      //         width: 380,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1024,
      //     options: {
      //       chart: {
      //         width: 400,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1280,
      //     options: {
      //       chart: {
      //         width: 480,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
      noData: {
        text: visualisationMessages('empty'),
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
      },
    };
  }

  public initLateInitiationBreakdownChart1(title?: string, percentage?: number)
  {
    this.optionsProgressBreakdown1 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "20%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         },
         {
          name: title,
          data: [!isNaN(percentage) ? percentage : 0]
        }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
      //  subtitle: {
      //    floating: true,
      //    align: "right",
      //    offsetY: 0,
      //    text: `${!isNaN(percentage) ? percentage : 0}%`,
      //    style: {
      //      fontSize: "20px"
      //    }
      //  },
       tooltip: {
         enabled: true
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 100
       },
       fill: {
         opacity: 1
       },
     };
  }

  public initLateInitiationBreakdownChart2(title?: string, percentage?: number)
  {
      this.optionsProgressBreakdown2 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "20%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}%`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 100
       },
       fill: {
         opacity: 1
       }
     };
  }

  public initLateInitiationBreakdownChart3(title?: string, percentage?: number)
  {
      this.optionsProgressBreakdown3 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "20%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}%`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 100
       },
       fill: {
         opacity: 1
       }
     };
  }

  public initLateInitiationBreakdownChart4(title?: string, percentage?: number)
  {
      this.optionsProgressBreakdown4 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "20%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}%`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 100
       },
       fill: {
         opacity: 1
       }
     };
  }

  public initLateInitiationBreakdownChart5(title?: string, percentage?: number)
  {
      this.optionsProgressBreakdown5 = {
       chart: {
         fontFamily: 'Trebuchet MS',
         height: 70,
         type: "bar",
         stacked: true,
         sparkline: {
           enabled: true
         }
       },
       plotOptions: {
         bar: {
           horizontal: true,
           barHeight: "20%",
           colors: {
             backgroundBarColors: ['rgb(241 245 249)']
           }
         }
       },
       stroke: {
         width: 0
       },
       series: [
         {
           name: title,
           data: [!isNaN(percentage) ? percentage : 0]
         }
       ],
       title: {
         floating: true,
         offsetX: -10,
         offsetY: 5,
         text: title
       },
       subtitle: {
         floating: true,
         align: "right",
         offsetY: 0,
         text: `${!isNaN(percentage) ? percentage : 0}%`,
         style: {
           fontSize: "20px"
         }
       },
       tooltip: {
         enabled: false
       },
       xaxis: {
         categories: [title]
       },
       yaxis: {
         max: 100
       },
       fill: {
         opacity: 1
       }
     };
  }
}





