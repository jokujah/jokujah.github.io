import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';

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
  noData:ApexNoData
  plotOptions: ApexPlotOptions;
  grid:ApexGrid
};


@Component({
  selector: 'app-administrative-review-visuals',
  templateUrl: './administrative-review-visuals.component.html',
  styleUrls: ['./administrative-review-visuals.component.scss']
})
export class AdministrativeReviewVisualsComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  isLoading:boolean = false 

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  topTenHighestContracts: any;
  valueOfContracts: number;
  numberOfContracts: number;
  yearOfBids: number;
  numberOfReviewedContracts: number;
  valueOfReviewedContracts: number;

  constructor(fb: FormBuilder,
    private _service: AwardedContractReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });

    // Visualisation
    this.chartOptions = {
      series: [
        {
          name: "Contract Value",
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
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 2000,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 450
          }
      }
        
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Contracts Under Review by Contract Method"
      },
      dataLabels: {
        enabled: true,
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
            formatter: function(val) {
              return NumberSuffix(val,2)}
          }               
        },
        {
          opposite: true,
          title: {
            text: "Number of Contracts"
          }
        }
      ],
      noData: {
        text: 'No Data Available ...'
      }
    };
  }

  ngOnInit(): void {

    this.getSummaryStats('awards-under-admin-review',this.financialYears[0],'')
    this.getVisualisation('admin-reviews-by-method',this.financialYears[0],'')
    

    
  }




  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('awards-under-admin-review',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('admin-reviews-by-method',this.financialYears[0],data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);

    this.getSummaryStats('awards-under-admin-review',this.financialYears[0],'')
    this.getVisualisation('admin-reviews-by-method',this.financialYears[0],'')

  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.numberOfContracts = 0
    this.valueOfContracts = 0
    this.numberOfReviewedContracts = 0
    this.valueOfReviewedContracts = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStatsNofilter(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.numberOfContracts =  data.total_no_of_awards
        this.valueOfContracts = sanitizeCurrencyToString(data.total_estimated_value_of_awards)
        this.numberOfReviewedContracts =  data.total_no_under_review
        this.valueOfReviewedContracts =sanitizeCurrencyToString(data.total_amount_under_review)

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
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = 0

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

    this._service.getSummaryStatsNofilter(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categoryValues=[]
        let numOfContracts=[]

        console.log("AWARDED",data)
        // data.forEach(element => {
        //   if (element.financial_year == financialYear)
        //   {
        //     x.push(element?.number_of_plans)
        //     var e = element?.estimated_amount.split(',')
        //     y.push(parseInt(e.join('')))
        //   }
        // });

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.total_amount_under_review.split(',') 
          var nameB = b?.total_amount_under_review.split(',') 
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

          var valueC = element?.total_amount_under_review.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.procurement_method)
          categoryValues.push(valueD)
          numOfContracts.push(parseInt(element?.total_no_under_review))
        });

        this.chart?.updateOptions({

          series: [{
            name: "Contract Value",
            type: "column",
            data: categoryValues
          },
          {
            name: "Number of Contracts",
            type: "line",
            data: numOfContracts
          }],

          xaxis: {
            categories: categories,
            labels: {
              style: {                
                fontSize: "12px"
              }
            }            
          }

          
        })


          
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

  getFontSize() {
    return Math.max(10, 12);
  }

}
