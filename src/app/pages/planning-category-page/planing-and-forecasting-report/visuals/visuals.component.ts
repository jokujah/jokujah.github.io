import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexNoData,
  ApexPlotOptions,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NumberSuffix,
  addArrayValues,
  visualisationMessages,
  sortTable,
  convertNumberSuffixWithCommas,
  sortArrayBy,
  sanitizeCurrencyToString,
} from 'src/app/utils/helpers';

import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';
import { convertNumbersWithCommas } from '../../../../utils/helpers';
import { ChartOptions } from 'src/app/utils/IChartOptions';
import { initPolarChart, initColumnChart } from 'src/app/utils/chartsApex';

export type ChartOptionsBudgetStatus = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  noData: ApexNoData;
  labels: string[];
  stroke: ApexStroke;
};

export type ChartOptionsProcurementTypes = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  noData: ApexNoData;
};

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],
})
export class VisualsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @ViewChild('chartBudgetStatus') chartBudgetStatus!: ChartComponent;
  public chartOptionsBudgetStatus: Partial<ChartOptionsBudgetStatus> | any;

  @ViewChild('chartProcurementTypes') chartProcurementTypes: ChartComponent;
  public chartOptionsProcurementTypes: Partial<ChartOptionsProcurementTypes>;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsType: Partial<ChartOptions> | any;
  public chartOptionsMethod: Partial<ChartOptions> | any;
  public chartOptionsFundingSource: Partial<ChartOptions> | any;
  public chartOptionsFinancialYearBudget: Partial<ChartOptions> | any;
  public chartOptionsPlannedVsSpent: Partial<ChartOptions> | any;

  @ViewChild("chartFunding") chartFunding: ChartComponent;
  public chartFundingOptions: Partial<ChartOptions>;

  dir
  sortTable = sortTable 

  numbersuffixVal = '1';

  isLoading: boolean = false;
  registeredProviders;

  totalValueofPlannedContracts;
  totalValueofPlannedContractsTable
  numberOfPlannedContracts;
  noOfPlanCategories;
  yearOfPlannedContracts;
  numberOfRegisteredEntities;
  topTenHighestContracts;

  totalValueofContractsPM: any = 0;
  topTenHighestContractsPM: any = [];
  topTenHighestNumberOfContractsPM: any = [];
  totalNumberofContractsPM: any = 0;

  consolidatedPlanSummary: any = [];

  highestContractValue = 0;
  highestPercentage = 0;
  entityWithHighestProcurement = 'N/A';
  selectedFinancialYear;

  isLoadingBudgetSummary: boolean = false;
  isLoadingTypeSummary: boolean = false;
  isLoadingMethodSummary: boolean = false;
  plansByFundingSource = []

  checkIfSuperAdmin = localStorage.getItem('isSuperAdmin');

    roles = this.checkIfSuperAdmin == 'true' ? 'super-admin' : 'pde-admin'
  
    entityOrDept = (this.roles == 'super-admin')?'Entities':'Departments' 
  totalValueofContracts: number;
  totalFundingSourceValue: any;

  data = [
    {id: "flare.analytics.cluster.AgglomerativeCluster", value: 3938},
    {id: "flare.analytics.cluster.CommunityStructure", value: 3812},
    {id: "flare.analytics.cluster.HierarchicalCluster", value: 6714},
    {id: "flare.analytics.cluster.MergeEdge", value: 743},
    {id: "flare.analytics.graph.BetweennessCentrality", value: 3534},
    {id: "flare.analytics.graph.LinkDistance", value: 5731},
    {id: "flare.analytics.graph.MaxFlowMinCut", value: 7840},
    {id: "flare.analytics.graph.ShortestPaths", value: 5914},
    {id: "flare.analytics.graph.SpanningTree", value: 3416},
    {id: "flare.analytics.optimization.AspectRatioBanker", value: 7074},
    {id: "flare.animate.Easing", value: 17010},
    {id: "flare.animate.FunctionSequence", value: 5842}
  ]
    
    

  

  constructor(
    private toastr: ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService
  ) {
    (window as any).Apex = {
      theme: {
        palette: 'palette4',
      },
      colors: ['#01529d', '#775DD0', '#69D2E7', '#FF9800','#5d62b5'],
    };
    

  }

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initCharts();
  }

  submit(data) {
    this.selectedFinancialYear = data?.selectedFinancialYear;
    this.getSummaryStatsWithPDE(
      'plan-summary',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );
    this.getSummaryStatsBudget(
      'plan-budget-status',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );
    this.getSummaryStatsProcurementType(
      'plan-by-procurement-type',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsByProcurementMethod(
      'plan-by-procurement-method',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsByFundingSource(
      'plan-by-funding-source',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getPlanBudgetStatusByFinancialYear(
      'plan-budget-status-by-financial-year',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getConsolidatedPlanSummary( 
      'consolidated-plan-summary',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );
  }

  reset(data) {
    this.selectedFinancialYear = data?.selectedFinancialYear;

    this.getSummaryStatsWithPDE(
      'plan-summary',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsBudget(
      'plan-budget-status',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsProcurementType(
      'plan-by-procurement-type',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsByProcurementMethod(
      'plan-by-procurement-method',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getSummaryStatsByFundingSource(
      'plan-by-funding-source',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getPlanBudgetStatusByFinancialYear(
      'plan-budget-status-by-financial-year',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );

    this.getConsolidatedPlanSummary( 
      'consolidated-plan-summary',
      data?.selectedFinancialYear,
      data?.selectedPDE
    );
  }

  getSummaryStatsWithPDE(reportName, financialYear, procuringEntity) {
    this.isLoading = true;
    this.numberOfPlannedContracts = 0;
    this.totalValueofPlannedContracts = 0;
    this.totalValueofPlannedContractsTable = 0;
    this.yearOfPlannedContracts = 0;
    this.numberOfRegisteredEntities = 0;
    

    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (response) => {
          let data = response.data;
          let x = [];
          let y = [];
          let providersInSelectedYear = [];
          let e = data.length > 0;
          if (data.length > 0) {
            // data.forEach((element) => {
            //   x.push(parseInt(element?.noOfPlanItems));
            //   let e = element?.estimatedAmount.split(',');
            //   y.push(parseInt(e.join('')));
            //   providersInSelectedYear.push(element?.pdeName);
            // });

            // this.topTenHighestContracts = data.sort(function (a, b) {
            //   let nameA = a?.estimatedAmount.split(',');
            //   let nameB = b?.estimatedAmount.split(',');
            //   let valueA = parseInt(nameA.join(''));
            //   let valueB = parseInt(nameB.join(''));

            //   if (valueA > valueB) {
            //     return -1;
            //   }
            //   if (valueA < valueB) {
            //     return 1;
            //   }
            //   return 0;
            // });

            // let categories = [];
            // let categoryValues = [];

            // this.topTenHighestContracts.slice(0, 10).forEach((element) => {
            //   let valueC = element?.estimatedAmount.split(',');
            //   let valueD = parseInt(valueC.join(''));
            //   categories.push(element.pdeName);
            //   categoryValues.push(valueD);
            // }); noOfPlanCategories: "1,800"

            this.numberOfPlannedContracts = data[0]?.noOfPlanItems ? sanitizeCurrencyToString(data[0]?.noOfPlanItems) : 0;
            this.totalValueofPlannedContracts = data[0]?.estimatedAmount ? sanitizeCurrencyToString(data[0]?.estimatedAmount) : 0;
            this.totalValueofPlannedContractsTable = convertNumbersWithCommas(this.totalValueofPlannedContracts)
            this.yearOfPlannedContracts = financialYear;
            this.numberOfRegisteredEntities = procuringEntity
              ? 1
              :( data[0]?.noOfRegisteredPdes ? parseInt(data[0]?.noOfRegisteredPdes): parseInt(data[0]?.noOfPdeDepartments));
            this.isLoading = false;
          } else {
            this.numberOfPlannedContracts = 0;
            this.totalValueofPlannedContracts = 0;
            this.yearOfPlannedContracts = 0;
            this.numberOfRegisteredEntities = 0;
            this.isLoading = false;
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('Error ', error);
          throw error
        }
      );
  }

  getSummaryStatsBudget(reportName, financialYear, procuringEntity) {
    this.isLoading = true;
    this.highestContractValue = 0
    this.highestPercentage = 0
    this.entityWithHighestProcurement = ''

    this.chartBudgetStatus?.updateOptions({
      series: [],
      labels: [],
      noData: {
        text: 'Loading Data ...',
      },
    });

    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (response) => {
          let data = response.data;
          let x = [];
          let y = [];
          let seriesData = [];
          let seriesObject = [];
          let budgetSpentPercentage = [];
          let labelName = [];
          let spentAmount = [];
          let pdePercentage = [];
          let sortedData = [];

          console.log("chartOptionsBudgetStatus",data)

          if (data.length > 0) {
            if (procuringEntity == '') {
              // this.chartBudgetStatus?.updateOptions({
              //   series: [],
              //   labels: [],
              //   noData: {
              //     text: 'Loading Data ...',
              //   },
              // });

              data.forEach((element) => {
                x.push(element?.noOfPlanItems);

                let planned = element?.budgetPlannedAmount.split(',');

                let totalplanned = element?.totalBudgetPlannedAmount.split(',');

                let spent = element?.spentAmount.split(',');

                let percentage =
                  (parseInt(spent.join('')) / parseInt(planned.join(''))) * 100;

                let percentagePlanned =
                  (parseInt(planned.join('')) /
                    parseInt(totalplanned.join(''))) *
                  100;

                let oneSerieData = [
                  parseInt(spent.join('')) / 1000000000000,
                  parseInt(planned.join('')) / 1000000000000,
                  percentage,
                ];

                let oneSerieObject = {
                  x: element?.pdeName,
                  budgetSpent: parseInt(spent.join('')),
                  planned: parseInt(planned.join('')),
                  y: Math.round(percentage),
                };

                budgetSpentPercentage.push(Math.round(percentage));
                seriesData.push(oneSerieData);
                seriesObject.push(oneSerieObject);
              });

              sortedData = seriesObject.sort(function (a, b) {
                if (a.y > b.y) {
                  return -1;
                }
                if (a.y < b.y) {
                  return 1;
                }
                return 0;
              });

              sortedData.forEach((element) => {
                labelName.push(element.x);
                pdePercentage.push(element.y);
                spentAmount.push(element.budgetSpent);
              });

              this.highestContractValue = spentAmount[0];
              this.highestPercentage = pdePercentage[0];
              this.entityWithHighestProcurement = labelName[0];

              this.chartBudgetStatus?.updateOptions({
                series: [
                  {
                    name: 'Percentage of Budget Spent',
                    data: pdePercentage,
                    // type: "column",
                  },
                ],
                chart: {
                  fontFamily: 'Trebuchet MS',
                  height: '450',
                  type: 'area',
                  events: {
                    click: function (chart, w, e) {
                      // console.log(chart, w, e)
                    },
                  },
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 2000,
                    animateGradually: {
                      enabled: true,
                      delay: 150,
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 450,
                    },
                  },
                },
                plotOptions: {
                  bar: {
                    columnWidth: '35%',
                    distributed: false,
                    horizontal: false,
                    // dataLabels: {
                    //   position: 'top'
                    // }
                  },
                },
                stroke: {
                  show: true,
                  width: 2,
                  // colors: ["transparent"]
                  curve: 'straight',
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    //colors: ['#fff'],
                    fontWeight: 'bold',
                    fontSize: '12px',
                  },
                  formatter: function (val) {
                    return NumberSuffix(val, 0) + '%';
                  },
                  hideOverflowingLabels: true,
                },
                legend: {
                  show: false,
                },
                grid: {
                  show: true,
                },
                xaxis: {
                  categories: labelName,
                  title: {
                    text: 'Procuring and Disposal Entities' ,
                  },
                  labels: {
                    style: {
                      fontSize: '12px',
                    },
                    formatter: function (val) {
                      return val;
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  fillSeriesColor: false,
                  y: {
                    formatter: function (val) {
                      return val + '%';
                    },
                  },
                },
                yaxis: {
                  title: {
                    text: '% of Budget Spent',
                  },
                  //max:100
                },
                noData: {
                  text: visualisationMessages('empty'),
                },
                title: {
                  text: 'PDEs by Percentage of Budget Spent',
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
              });
            } else {
              data.forEach((element) => {
                x.push(element?.noOfPlanItems);

                let planned = element?.budgetPlannedAmount.split(',');
                let totalplanned = element?.totalBudgetPlannedAmount.split(',');

                let spent = element?.spentAmount.split(',');
                let percentage =
                  (parseInt(spent.join('')) / parseInt(planned.join(''))) * 100;

                let percentagePlanned =
                  (parseInt(planned.join('')) /
                    parseInt(totalplanned.join(''))) *
                  100;

                let oneSerieData = [
                  parseInt(spent.join('')) / 1000000000000,
                  parseInt(planned.join('')) / 1000000000000,
                  percentage,
                ];

                let oneSerieObject = {
                  x: element?.pdeName,
                  y: Math.round(percentage),
                };
                budgetSpentPercentage.push(Math.round(percentage));
                seriesData.push(parseInt(spent.join('')));
                seriesObject.push(oneSerieObject);
              });
              labelName.push(procuringEntity);

              this.highestContractValue = seriesData[0];
              this.highestPercentage = budgetSpentPercentage[0];
              this.entityWithHighestProcurement = labelName[0];

              this.chartBudgetStatus?.updateOptions({
                series: budgetSpentPercentage,
                chart: {
                  height: 350,
                  fontFamily: 'Trebuchet MS',
                  type: 'radialBar',
                },
                title: {
                  text: 'PDEs by Percentage of Budget Spent ',
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      margin: 15,
                      size: '70%',
                    },
                    dataLabels: {
                      show: true,
                      name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '13px',
                      },
                      value: {
                        color: '#111',
                        fontSize: '30px',
                        show: true,
                      },
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  // y: {
                  //   formatter: function(value) {
                  //     return `${value}%`
                  //   }
                  // }
                },
                stroke: {
                  lineCap: 'round',
                },
                noData: {
                  text: visualisationMessages('empty'),
                },
                labels: labelName,
              });
            }
          } else {
            this.chartBudgetStatus?.updateOptions({
              series: [],
              chart: {
                height: 350,
                fontFamily: 'Trebuchet MS',
                type: 'radialBar',
              },
              title: {
                text: 'PDEs by Percentage of Budget Spent ',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    margin: 15,
                    size: '70%',
                  },
                  dataLabels: {
                    show: true,
                    name: {
                      offsetY: -10,
                      show: true,
                      color: '#888',
                      fontSize: '13px',
                    },
                    value: {
                      color: '#111',
                      fontSize: '30px',
                      show: true,
                    },
                  },
                },
              },
              tooltip: {
                y: {
                  formatter: function (value) {
                    return `${value}%`;
                  },
                },
              },
              stroke: {
                lineCap: 'round',
              },
              noData: {
                text: visualisationMessages('empty'),
              },
              labels: [],
            });
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          // this.toastr.error('Something Went Wrong', '', {
          //   progressBar: true,
          //   positionClass: 'toast-top-right',
          // });
          this.chartBudgetStatus?.updateOptions({
            series: [],
            chart: {
              height: 350,
              fontFamily: 'Trebuchet MS',
              type: 'radialBar',
            },
            title: {
              text: 'PDEs by Percentage of Budget Spent ',
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 15,
                  size: '70%',
                },
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '13px',
                  },
                  value: {
                    color: '#111',
                    fontSize: '30px',
                    show: true,
                  },
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (value) {
                  return `${value}%`;
                },
              },
            },
            stroke: {
              lineCap: 'round',
            },
            noData: {
              text: visualisationMessages('error'),
            },
            labels: [],
          });
          this.isLoading = false;
          throw error
        }
      );
  }

  getSummaryStatsProcurementType(reportName, financialYear, procuringEntity) {
    this.isLoadingTypeSummary = true;

    this.chartProcurementTypes?.updateOptions({
      series: [],

      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: '12px',
          },
          formatter: function (val) {
            return NumberSuffix(val, 2);
          },
        },
      },
      noData: {
        text: visualisationMessages('loading'),
      },
    });

    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (response) => {
          this.isLoadingTypeSummary = false;

          let data = response.data;
          if (response.data.length > 0) {
            let sortedTypes;

            sortedTypes = data.sort(function (a, b) {
              let nameA = a?.marketPrice.split(',');
              let nameB = b?.marketPrice.split(',');
              let valueA = parseInt(nameA.join(''));
              let valueB = parseInt(nameB.join(''));

              if (valueA > valueB) {
                return -1;
              }
              if (valueA < valueB) {
                return 1;
              }
              return 0;
            });

            const categories = [];
            const planItems = [];
            const categoryValues = [];

            sortedTypes.forEach((element) => {
              let marketPrice = parseInt(
                element?.marketPrice.split(',').join('')
              );
              let noOfPlanItems = parseInt(
                element?.noOfPlanItems.split(',').join('')
              );
              categories.push(element.procurementType);
              categoryValues.push(marketPrice);
              planItems.push(noOfPlanItems);
            });

            this.chartProcurementTypes?.updateOptions({
              series: [
                {
                  name: 'Values',
                  data: categoryValues,
                },
              ],

              xaxis: {
                categories: categories,
                labels: {
                  style: {
                    fontSize: '12px',
                  },
                  formatter: function (val) {
                    return NumberSuffix(val, 2);
                  },
                },
              },
              noData: {
                text: 'No Data Available',
              },
            });

            this.initDonutChart(categoryValues, categories);
            this.chartOptionsMethod = initPolarChart(planItems, categories, 'Plan Items  by Procurement Type')
          } else {
            this.initDonutChart([], []);
            this.chartOptionsMethod = initPolarChart([], [], 'Plan Items  by Procurement Type')
          }
        },
        (error) => {
          this.initDonutChart([], []);
          this.chartOptionsMethod = initPolarChart([],[],'Plan Items  by Procurement Type')
          this.isLoadingTypeSummary = false;
          throw error
        }
      );
  }

  getSummaryStatsByProcurementMethod(
    reportName,
    financialYear,
    procuringEntity
  ) {
    this.isLoadingMethodSummary = true;
    this.topTenHighestContracts = [] 
    this.totalValueofContracts = 0
    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (res) => {
          this.isLoadingMethodSummary = false;
          let procurementsByMethod = res.data;
          let contractValue = []
          let actualAmount = []

          const planAmounts = [];
          const planMethods = [];

          this.topTenHighestContractsPM = procurementsByMethod.sort(function (a, b) {
            var nameA = a?.marketPrice.split(',')
            var nameB = b?.marketPrice.split(',')
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

          this.topTenHighestContractsPM.forEach(element => {
            var valueC = (element?.marketPrice)?(element?.marketPrice.split(',')):['0'];
            var valueD = parseInt(valueC.join(''))
            contractValue.push(valueD)
          });

          this.topTenHighestNumberOfContractsPM = res.data.map((element)=>element).sort(function (a, b) {
            var nameA = a?.noOfPlanItems.split(',')
            var nameB = b?.noOfPlanItems.split(',')
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

          this.topTenHighestNumberOfContractsPM.forEach(element => {
            var valueC = (element?.noOfPlanItems)?(element?.noOfPlanItems.split(',')):['0'];
            var valueD = parseInt(valueC.join(''))
            //subjectOfProcurement.push(capitalizeFirstLetter(element?.procurement_method))
            actualAmount.push(valueD)
          });

          this.totalValueofContractsPM = addArrayValues(contractValue)
          this.totalNumberofContractsPM = addArrayValues(actualAmount)
        },
        (error) => {
          this.isLoadingMethodSummary = false;
        }
      );
  }
  getSummaryStatsByFundingSource(reportName, financialYear, procuringEntity) {
    this.isLoading = true;
    this.totalFundingSourceValue = 0
    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (res) => {
          this.isLoading = false;
          let plansByFundingSource = res.data;

          this.plansByFundingSource = sortArrayBy(plansByFundingSource,'noOfPlanItems') 

          

          console.log("Funding Source",res.data)

          const fundingSourceData = [];
          const fundingSources = [];

          plansByFundingSource.forEach((item: any) => {
            fundingSourceData.push(
              parseInt(item?.marketPrice.split(',').join(''))
            );
            fundingSources.push(item?.fundingSource?item?.fundingSource:'Unknown');
          });
          this.initRadialChart(fundingSourceData,fundingSources)

          if(plansByFundingSource > 7){
            this.plansByFundingSource = plansByFundingSource.sort(function (a, b) {
                let nameA = a?.marketPrice.split(',');
                let nameB = b?.marketPrice.split(',');
                let valueA = parseInt(nameA.join(''));
                let valueB = parseInt(nameB.join(''));
  
                if (valueA > valueB) {
                  return -1;
                }
                if (valueA < valueB) {
                  return 1;
                }
                return 0;
              });
          }
          
        },
        (error) => {
          this.isLoading = false;
          throw error
        }
      );
  }

  getPlanBudgetStatusByFinancialYear(
    reportName,
    financialYear,
    procuringEntity
  ) {
    this.isLoadingBudgetSummary = true;
    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (res) => {
          this.isLoadingBudgetSummary = false;
          let planBudgetStatus = res.data;

          const financialYears = [];
          const plannedAmounts = [];
          const spentAmounts = [];

          let percentage: Array<number> = [];
          let calculatedPercentage: any;

          planBudgetStatus.forEach((budget: any) => {
            financialYears.push(budget?.financialYear);
            plannedAmounts.push(
              parseInt(budget?.plannedBudgetAmount.split(',').join(''))
            );
            spentAmounts.push(
              parseInt(budget?.amountSpent.split(',').join(''))
            );
          });

          calculatedPercentage =
            (spentAmounts.reduce((a, b) => a + b, 0) /
              plannedAmounts.reduce((a, b) => a + b, 0)) *
            100;

          percentage.push(parseFloat(calculatedPercentage.toFixed(2)));

          if (plannedAmounts && spentAmounts) {
            !isNaN(percentage[0])
              ? this.initSemiCircleGaugeChartBudgetStatus(percentage)
              : this.initSemiCircleGaugeChartBudgetStatus([0]);

            this.initStackedBarGraphBudgetPlannedVsSpent(
              plannedAmounts,
              spentAmounts,
              financialYears
            );
          }
        },
        (error) => {
          this.isLoadingBudgetSummary = false;
          throw error
        }
      );
  }


  getConsolidatedPlanSummary(reportName, financialYear, procuringEntity) {
    this.isLoading = true;
    this.consolidatedPlanSummary = []
    this.noOfPlanCategories = 0

    this.subscription = this._planingCategoryService
      .getSummaryStatsWithPDE(reportName, financialYear, procuringEntity)
      .subscribe(
        (response) => {
          let data = response.data;
          console.log("CONSOLE",data)
         
          if (data.length > 0) { 
            this.consolidatedPlanSummary = data
            this.noOfPlanCategories = this.consolidatedPlanSummary.length
          } 
        },
        (error) => {
          this.isLoading = false;
          console.log('Error ', error);
          throw error
        }
      );
  }

  
  initCharts() {
    this.initChartBudgetStatus();
  }

  public initChartBudgetStatus() {
    this.chartOptionsBudgetStatus = {
      series: [],
      chart: {
        height: 350,
        fontFamily: 'Trebuchet MS',
        type: 'radialBar',
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
        },
      },
      title: {
        text: 'PDEs by Percentage of Budget Spent ',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '70%',
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '13px',
            },
            value: {
              color: '#111',
              fontSize: '30px',
              show: true,
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (value) {
            return `${value}%`;
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      noData: {
        text: visualisationMessages('loading'),
      },
      labels: [],
    };
  }

  public initChartProcurementType() {
    this.chartOptionsProcurementTypes = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Trebuchet MS',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Contract Value ',
        },
        labels: {
          style: {
            fontSize: '12px',
          },
          formatter: function (val) {
            return NumberSuffix(val, 2);
          },
        },
      },
      yaxis: {
        title: {
          text: 'Procurement Types',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'UGX ' + NumberSuffix(val, 2);
          },
        },
      },
      title: {
        text: 'Budget Value by Procurement Types',
      },
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      noData: {
        text: visualisationMessages('loading'),
      },
    };
  }

  public initDonutChart(marketPrice?: Array<any>, types?: Array<any>): void {
    this.chartOptionsType = {
      series: marketPrice,
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val) {
            return 'UGX ' + convertNumberSuffixWithCommas(NumberSuffix(val,2));
          },
        },
      },
      title: {
        text: 'Estimated Amount by Procurement Type',
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
        fontFamily: 'Trebuchet MS',
        type: 'donut',
        width: '100%',
        height: 350,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 0,
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: 'bold',
              },
              value: {
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: (val) => `UGX ${convertNumberSuffixWithCommas(NumberSuffix(val,2))}`,
              },
              total: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: function (w) {
                  return `UGX ${convertNumbersWithCommas (
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
      labels: types,      
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

  public initTreeMapChartMethod(
    planAmounts?: Array<any>,
    methods?: Array<string>
  ) {
    this.chartOptionsMethod = {
      series: [
        {
          data: methods,
        },
      ],
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
        text: 'Planned Procurements by Method',
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
        fontFamily: 'Trebuchet MS',
        type: 'treemap',
        width: '100%',
        height: 350,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
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
        text: 'No Data Available',
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

  public initSemiCircleGaugeChartBudgetStatus(percentage?: Array<number>) {
    this.chartOptionsFinancialYearBudget = {
      series: percentage,
      chart: {
        fontFamily: 'Trebuchet MS',
        type: 'radialBar',
        width: '100%',
        height: 380,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 2,
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              show: true,
              offsetY: -50,
              fontSize: '22px',
              fontFamily: 'Trebuchet MS',
            },
          },
        },
      },
      title: {
        text: 'Percentage of Budget Spent',
        align: 'center',
        margin: 1,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Trebuchet MS',
        },
      },
      labels: ['% of Budget Spent'],
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
        text: 'No Data Available',
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

  public initStackedBarGraphBudgetPlannedVsSpent(
    planBudgetAmount?: Array<number>,
    actualBudgetAmount?: Array<number>,
    financialYears?: Array<string>
  ) {
    this.chartOptionsPlannedVsSpent = {
      series: [
        {
          name: 'Planned Budget',
          data: planBudgetAmount,
        },
        {
          name: 'Actual Spent',
          data: actualBudgetAmount,
        },
      ],
      title: {
        text: 'Planned Vs Spent by Financial Year',
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
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val: any) {
            return 'UGX ' + convertNumbersWithCommas(val);
          },
        },
      },
      chart: {
        fontFamily: 'Trebuchet MS',
        type: 'bar',
        height: 380,
        width: '100%',
        stacked: true,
        // stackType: "100%",
        toolbar: {
          show: true,
          offsetY: 20,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: financialYears,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          formatter: (val: any) => `${val / 1000000000000} T`,
        },
        title: {
          text: 'Budget Values (UGX)',
        },
      },
      dataLabels: {
        enabled: true,
        // textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },
        formatter: (val, opt) => `${(val / 1000000000000).toFixed(2)} T`,
        offsetX: 0,
        dropShadow: {
          enabled: false,
        },
      },
      legend: {
        position: 'bottom',
        // offsetY: 10
      },
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
        text: 'No Data Available',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
      },
      // fill: {
      //   opacity: 1
      // }
    };
  }

  initRadialChart(series?, categories?) {
    this.chartFundingOptions = {
      series: series,
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Trebuchet MS',
        },
        y: {
          formatter: function (val) {
            return 'UGX ' + convertNumberSuffixWithCommas(NumberSuffix(val,2));
          },
        },
      },
      title: {
        text: "Estimated Amount By Funding Source ",
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
        fontFamily: 'Trebuchet MS',
        type: 'donut',
        width: '100%',
        height: 350,
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
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: 'bold',
              },
              value: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: (val) => `UGX ${convertNumberSuffixWithCommas(NumberSuffix(val,2))}`,
              },
              total: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Trebuchet MS',
                fontWeight: '500',
                formatter: function (w) {
                  return `UGX ${convertNumbersWithCommas(
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0)
                  )}`;
                },
              },
            }
          }
        }
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
      labels: categories,
      dataLabels:{
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
      },    
     
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      },
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
      }
    };
  }  
}


