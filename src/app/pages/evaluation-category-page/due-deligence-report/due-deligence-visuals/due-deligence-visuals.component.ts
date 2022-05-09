import { DueDeligenceReportService } from './../../../../services/EvaluationCategory/due-deligence-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { addArrayValues, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

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
};

@Component({
  selector: 'app-due-deligence-visuals',
  templateUrl: './due-deligence-visuals.component.html',
  styleUrls: ['./due-deligence-visuals.component.scss']
})
export class DueDeligenceVisualsComponent implements OnInit {
  isLoading:boolean = false 
  @ViewChild("chartEducationStatus")
  chartEducationStatus!: ChartComponent;
  chartOptionsEducationStatus: Partial<ChartOptionsEducationStatus> | any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  


  valueOfBids;
  numberOfBids;
  yearOfBids;
  numberOfBidders;

  topTenHighestContracts 

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');


  
 
  constructor(
    fb: FormBuilder,
    private _dueDeligenceReportService: DueDeligenceReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    //this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')
    this.chartOptions = {
      series: [
        {
          name: "Contract Value",
          type: "column",
          data: [44000000, 50545555, 41454545, 67145454, 22745454, 4135422, 20122434, 35223434, 75223434, 32034242, 25723434, 16023434]
        },
        {
          name: "Number of Bids",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Bids and Bid Value "
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001"
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Contract Value"
          }
        },
        {
          opposite: true,
          title: {
            text: "Number of Bids"
          }
        }
      ]
    };  

  }

  getFontSize() {
    return Math.max(10, 12);
  }


  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    //this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')

  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.numberOfBids = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._dueDeligenceReportService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.numberOfBids = data.number_of_bids_received
        this.valueOfBids = sanitizeCurrencyToString(data.total_estimated_value)
        this.numberOfBidders = data.number_of_bidders

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

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.numberOfBids = 0
    this.yearOfBids = 0

    console.log(reportName)

    this._dueDeligenceReportService.getEvaluationBidsByProvider(reportName,financialYear,procuringEntity).subscribe(
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
        let categorieValues=[]


        this.topTenHighestContracts.slice(0,10).forEach(element => {

          var valueC = element?.estimated_amount.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.pde_name)
          categorieValues.push(valueD)
        });


        this.chartOptionsEducationStatus = {
          series: [
            {
              name: "Planned Contract Value",
              data: categorieValues,
              fontSize: "12px"
            }
          ],
          chart: {
            height: 350,
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
            text: "Procuring Entity with Top 10 Jighest Value of Planned contracts" +' '+ `(${financialYear})`
          },
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

  

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('bids-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-provider',this.financialYears[0],data?.selectedPDE)
  }

}
