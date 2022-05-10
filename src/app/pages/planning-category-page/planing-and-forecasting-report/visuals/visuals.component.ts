import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

import { ChartType } from 'angular-google-charts';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import html2canvas from 'html2canvas';

export type ChartOptionsEducationStatus = {
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
};

export type ChartOptionsBudgetStatus = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
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
};






@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],

})
export class VisualsComponent implements OnInit {

  @ViewChild("chartEducationStatus")
  chartEducationStatus!: ChartComponent;
  chartOptionsEducationStatus: Partial<ChartOptionsEducationStatus> | any;



  @ViewChild("chartBudgetStatus") chart: ChartComponent;
  public chartOptionsBudgetStatus: Partial<ChartOptionsBudgetStatus>;

  @ViewChild("chartProcurementTypes") chartProcurementTypes: ChartComponent;
  public chartOptionsProcurementTypes: Partial<ChartOptionsProcurementTypes>;

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  downloading = false

  isLoading:boolean = false

  //number_of_plans
  //estimated_amount
  number_of_plans_2020_2021
  estimated_amount_2020_2021
  number_of_plans_2019_2020
  estimated_amount_2019_2020
  number_of_plans_2018_2019
  estimated_amount_2018_2019


  registeredProviders


  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;
  numberOfRegisteredEntities = 0;

  topTenHighestContracts







  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });

  }

  ngOnInit(): void {
    this.getSummaryStats('plan-summary',this.financialYears[0],'Ministry of Finance')
    this.getSummaryStatsBudget('plan-budget-status','','')
    this.getSummaryStatsProcurementType('plan-by-procurement-type','','')   
    
    //this.getSummaryStats('plan-by-funding-source',this.financialYears[0],'Ministry of Finance')
    //this.getSummaryStats('plan-budget-status',this.financialYears[0],'Ministry of Finance')
    
    
    
  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.getSummaryStatsWithPDE('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getSummaryStatsBudget('plan-budget-status','','')
    this.getSummaryStatsProcurementType('plan-by-procurement-type','','') 

    //this.getSummaryStatsWithPDE('plan-by-funding-source',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsWithPDE('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)
  }




  getFontSize() {
    return Math.max(10, 12);
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.getSummaryStats('plan-summary',this.financialYears[0],'')
    this.getSummaryStats('plan-status',this.financialYears[0],'')
    this.getSummaryStats('plan-above',this.financialYears[0],'')
    this.getSummaryStats('plan-budget-allocation',this.financialYears[0],'')
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.numberOfPlannedContracts = 0
    this.totalValueofPlannedContracts = 0
    this.yearOfPlannedContracts = 0
    this.numberOfRegisteredEntities = 0

    this._planingCategoryService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        let  providersInSelectedYear = []

        console.log(data)
        data.forEach(element => {
          if (element.financial_year == financialYear)
          {
            x.push(element?.number_of_plans)
            var e = element?.estimated_amount.split(',')
            y.push(parseInt(e.join('')))
            providersInSelectedYear.push(element?.pde_name)
          }
        });

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.estimated_amount.split(',')
          var nameB = b?.estimated_amount.split(',')
          var valueA = parseInt(nameA.join(''))
          var valueB = parseInt(nameB.join(''))

          if (valueA >  valueB) {
            return -1;
          }
          if (valueA < valueB) {
            return 1;
          }
          return 0;
        })

        console.log(this.topTenHighestContracts)
        console.log(x)
        console.log(y)

        let categories=[]
        let categoryValues=[]


        this.topTenHighestContracts.slice(0,10).forEach(element => {

          var valueC = element?.estimated_amount.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.pde_name)
          categoryValues.push(valueD)
        });


        this.chartOptionsEducationStatus = {
          series: [
            {
              name: "Planned Contract Value",
              data: categoryValues,
              fontSize: "12px"
            }
          ],
          chart: {
            fontFamily: 'Trebuchet MS',
            height: 'auto',
            type: "bar",
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: [
            "#008FFB"
          ],
          plotOptions: {
            bar: {
              columnWidth: "35%",
              distributed: false,
              horizontal:true
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val) {
              return NumberSuffix(val,2)
          },
          },
          legend: {
            show: false
          },
          grid: {
            show: true
          },
          xaxis: {
            categories: categories,
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
          title: {
            text: "Top 10 Highest PDE Plans By Value"
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return "UGX " + NumberSuffix(val,2) ;
              }
            }
          }
        };


          this.numberOfPlannedContracts = addArrayValues(x)
          this.totalValueofPlannedContracts = addArrayValues(y)
          this.yearOfPlannedContracts = financialYear
          this.numberOfRegisteredEntities = data[0].number_of_registered_pdes
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getSummaryStatsWithPDE(reportName,financialYear,procuringEntity){
    this.isLoading=true
    // this.numberOfPlannedContracts = 0
    // this.totalValueofPlannedContracts = 0
    // this.yearOfPlannedContracts = 0
    // this.numberOfRegisteredEntities = 0

    this._planingCategoryService.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []

        console.log(data)
        // data.forEach(element => {
        //   if (element.financial_year == financialYear)
        //   {
        //     x.push(element?.number_of_plans)
        //     var e = element?.estimated_amount.split(',')
        //     y.push(parseInt(e.join('')))
        //   }
        // });

        //  this.topTenHighestContracts = data.sort(function(a, b) {
        //   var nameA = a?.estimated_amount.split(',')
        //   var nameB = b?.estimated_amount.split(',')
        //   var valueA = parseInt(nameA.join(''))
        //   var valueB = parseInt(nameB.join(''))

        //   if (valueA >  valueB) {
        //     return -1;
        //   }
        //   if (valueA < valueB) {
        //     return 1;
        //   }
        //   return 0;
        // })

        // console.log(this.topTenHighestContracts)
        // console.log(x)
        // console.log(y)

        // let categories=[]
        // let categoryValues=[]


        // this.topTenHighestContracts.slice(0,10).forEach(element => {

        //   var valueC = element?.estimated_amount.split(',')
        //   var valueD = parseInt(valueC.join(''))
        //   categories.push(element.pde_name)
        //   categoryValues.push(valueD)
        // });


        // this.chartOptionsEducationStatus = {
        //   series: [
        //     {
        //       name: "Planned Contract Value",
        //       data: categoryValues,
        //       fontSize: "12px"
        //     }
        //   ],
        //   chart: {
        //     fontFamily: 'Trebuchet MS',
        //     height: 'auto',
        //     type: "bar",
        //     events: {
        //       click: function(chart, w, e) {
        //         // console.log(chart, w, e)
        //       }
        //     }
        //   },
        //   colors: [
        //     "#008FFB"
        //   ],
        //   plotOptions: {
        //     bar: {
        //       columnWidth: "35%",
        //       distributed: false,
        //       horizontal:true
        //     }
        //   },
        //   dataLabels: {
        //     enabled: true,
        //     formatter: function(val) {
        //       return NumberSuffix(val,2)
        //   },
        //   },
        //   legend: {
        //     show: false
        //   },
        //   grid: {
        //     show: true
        //   },
        //   xaxis: {
        //     categories: categories,
        //     labels: {
        //       style: {
        //         colors: [
        //           "#008FFB",
        //           "#D10CE8",
        //         ],
        //         fontSize: "12px"
        //       }
        //     }
        //   },
        //   title: {
        //     text: "Top 10 Highest Plans By Value"
        //   },
        // };


        //   this.numberOfPlannedContracts = addArrayValues(x)
        //   this.totalValueofPlannedContracts = addArrayValues(y)
        //   this.yearOfPlannedContracts = financialYear
        //   this.numberOfRegisteredEntities = data[0].number_of_registered_pdes
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getSummaryStatsBudget(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this._planingCategoryService.getSummaryStatsNeat(reportName).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        let  seriesData = []
        let  seriesObject = []
        

        console.log("BUDGET",data)
        data.forEach(element => {
          
            x.push(element?.number_of_plans)

            var planned = element?.budget_planned_amount.split(',')
            var totalplanned = element?.total_budget_planned_amount.split(',')
            var spent = element?.spent_amount.split(',')
            var percentage = parseInt(spent.join(''))/parseInt(planned.join('')) *100
            var percentagePlanned = parseInt(planned.join(''))/parseInt(totalplanned.join('')) *100
            var oneSerieData = [(parseInt(spent.join(''))/1000000000000),(parseInt(planned.join(''))/1000000000000),percentage]
            var oneSerieObject = {
              x:element?.pde_name,
              // "budgetSpent":spent,
              // "planned":planned,
              y:percentage,
              
            }
            seriesData.push(oneSerieData)
            seriesObject.push(oneSerieObject)
          
        });

        this.chartOptionsBudgetStatus  = {
          series: [
            {
              data: seriesObject
            }
          ],
    
          chart: {
            height: 350,
            fontFamily: 'Trebuchet MS',
            type: "treemap"
          },
          title: {
            text: "PDE Percentage of Budget Spent "
          }
        };
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getSummaryStatsProcurementType(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this._planingCategoryService.getSummaryStatsNeat(reportName).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []
        var sortedTypes

        console.log("TYPE",data)

        sortedTypes = data.sort(function(a, b) {
          var nameA = a?.market_price.split(',')
          var nameB = b?.market_price.split(',')
          var valueA = parseInt(nameA.join(''))
          var valueB = parseInt(nameB.join(''))

          if (valueA >  valueB) {
            return -1;
          }
          if (valueA < valueB) {
            return 1;
          }
          return 0;
        })

        // console.log(this.topTenHighestContracts)
        // console.log(x)
        // console.log(y)

        let categories=[]
        let categoryValues=[]


        sortedTypes.forEach(element => {

          var valueC = element?.market_price.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.procurement_type)
          categoryValues.push(valueD)
        });
        this.chartOptionsProcurementTypes = {
          series: [
            {
              name: "Values",
              data: categoryValues
            }
          ],
          chart: {
            type: "bar",
            height: 350,
            fontFamily: 'Trebuchet MS',
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "55%"
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
            categories: categories,
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
          yaxis: {
            title: {
              text: "Value"
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
          title: {
            text: "Budget Value byProcurement Types"
          }
        };
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }


  




  

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    console.log("SERIES",series)
    return series;
  }
}




