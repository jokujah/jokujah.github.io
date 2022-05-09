import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ChartComponent } from 'ng-apexcharts';
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


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],

})
export class VisualsComponent implements OnInit {

  @ViewChild("chartEducationStatus")
  chartEducationStatus!: ChartComponent;
  chartOptionsEducationStatus: Partial<ChartOptionsEducationStatus> | any;

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


  totalValueOfPlannedContracts;
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
    this.getSummaryStats('plan-summary',this.financialYears[0],'')
  }




  getFontSize() {
    return Math.max(10, 12);
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.getSummaryStats('plan-summary',this.financialYears[0],'')
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.numberOfPlannedContracts = 0
    this.totalValueOfPlannedContracts = 0
    this.yearOfPlannedContracts = 0
    this.numberOfRegisteredEntities = 0

    this._planingCategoryService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        let data = response.data
        let  x = []
        let  y = []

        console.log(data)
        data.forEach(element => {
          if (element.financial_year == financialYear)
          {
            x.push(element?.number_of_plans)
            var e = element?.estimated_amount.split(',')
            y.push(parseInt(e.join('')))
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
              }
            }
          },
          title: {
            text: "Top 10 Plans by Estimated Value"
          },
        };


          this.numberOfPlannedContracts = addArrayValues(x)
          this.totalValueOfPlannedContracts = addArrayValues(y)
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



  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }
}


