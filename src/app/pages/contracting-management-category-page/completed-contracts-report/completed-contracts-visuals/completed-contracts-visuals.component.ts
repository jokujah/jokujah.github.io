import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { DueDeligenceReportService } from 'src/app/services/EvaluationCategory/due-deligence-report.service';
import { getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import { ToastrService } from 'ngx-toastr';
export type ChartOptions = {
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
  title: ApexTitleSubtitle,
  noData:ApexNoData
};

@Component({
  selector: 'app-completed-contracts-visuals',
  templateUrl: './completed-contracts-visuals.component.html',
  styleUrls: ['./completed-contracts-visuals.component.scss']
})
export class CompletedContractsVisualsComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  valueOfBids;
  successfullEvaluatedBidders;
  yearOfBids;
  allEvaluatedBidders;

  topTenHighestContracts 

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');

  constructor(
    fb: FormBuilder,
    private toastr : ToastrService,
    private _service: DueDeligenceReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde: this.pdeControl
    });
  }

  ngOnInit(): void {
    this.initCharts()
    this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    //this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')
    
  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('evaluation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-provider',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.getSummaryStats('evaluation-summary',this.financialYears[0],'')
    //this.getSummaryStats('bids-summary',this.financialYears[0],'')
    this.getVisualisation('bids-by-provider',this.financialYears[0],'')

  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.allEvaluatedBidders = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.successfullEvaluatedBidders = data.successful_evaluated_bidders
        this.valueOfBids = sanitizeCurrencyToString(data.total_bid_estimate_value)
        this.allEvaluatedBidders = data.total_evaluated_bidders

        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.yearOfBids = 0

    console.log(reportName)

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
    })

    this._service.getEvaluationBids(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categorieValues=[]
        let numOfBids=[]

        console.log("COMPLETED",data)
        // data.forEach(element => {
        //   if (element.financial_year == financialYear)
        //   {
        //     x.push(element?.number_of_plans)
        //     var e = element?.estimated_amount.split(',')
        //     y.push(parseInt(e.join('')))
        //   }
        // });

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.total_estimated_value.split(',') 
          var nameB = b?.total_estimated_value.split(',') 
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

       


        this.topTenHighestContracts.forEach(element => {
            //if(element?.provider =='none') {categories.push('N/A')}             

          var valueC = element?.total_estimated_value.split(',')
          var valueD = parseInt(valueC.join(''))
        
          categories.push(element.provider)
          categorieValues.push(valueD)
          numOfBids.push(parseInt(element?.number_of_bids_submitted))
        });

        console.log(categories)
        console.log(categorieValues)

        this.chart?.updateOptions({
          series: [
            {
              name: "Estimated Amount",
              type: "column",
              data: categorieValues
            },
            {
              name: "Actual Amount",
              type: "line",
              data: numOfBids
            }
          ],
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: "12px"
              },
              formatter: function (val) {
                return NumberSuffix(val, 2)
              }
            }
          },
        })
        
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    this.chartOptions = {
      series: [ ],
      chart: {
        type: "line",
        height: '500px'
      },
      plotOptions: {
        bar: {
          horizontal: false,
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
        
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: "UGX "
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
        text: 'No Data Available ...'
      },
      title: {
        text: "Completed Contracts"
      },
    };
  }

}
