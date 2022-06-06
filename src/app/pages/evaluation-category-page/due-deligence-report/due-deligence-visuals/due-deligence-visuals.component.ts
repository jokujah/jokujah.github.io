import { ToastrService } from 'ngx-toastr';
import { DueDeligenceReportService } from './../../../../services/EvaluationCategory/due-deligence-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addArrayValues, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import {ApexChart, ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, ApexNoData } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle,
  noData:ApexNoData
  labels: string[];
};

@Component({
  selector: 'app-due-deligence-visuals',
  templateUrl: './due-deligence-visuals.component.html',
  styleUrls: ['./due-deligence-visuals.component.scss']
})
export class DueDeligenceVisualsComponent implements OnInit {
  isLoading:boolean = false 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartBidsByFinancialYear")
  chartBidsByFinancialYear!: ChartComponent;
  chartOptionsBidsByFinancialYear: Partial<ChartOptions> | any;


  valueOfBids;
  successfullEvaluatedBidders;
  yearOfBids;
  allEvaluatedBidders;

  topTenHighestContracts 

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');


  
 
  constructor(
    fb: FormBuilder,
    private toastr:ToastrService,
    private _dueDeligenceReportService: DueDeligenceReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    this.initCharts()
  }

 

  submit(data) {
    this.getSummaryStats('evaluation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-provider',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getBidsByFinancialYear('bids-by-financial-year',data?.selectedFinancialYear,data?.selectedPDE)
  }


  reset(data){
    this.getSummaryStats('evaluation-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStats('bids-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('bids-by-provider',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getBidsByFinancialYear('bids-by-financial-year',data?.selectedFinancialYear,data?.selectedPDE)

  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfBids = 0
    this.successfullEvaluatedBidders = 0
    this.allEvaluatedBidders = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._dueDeligenceReportService.getEvaluationBids(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log("Due Deligence Reports",response)
        let data = response.data[0]
        
        this.successfullEvaluatedBidders = data.successfulEvaluatedBidders
        this.valueOfBids = sanitizeCurrencyToString(data.totalBidEstimateValue)
        this.allEvaluatedBidders = data.totalEvaluatedBidders

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

    this._dueDeligenceReportService.getEvaluationBids(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categorieValues=[]
        let numOfBids=[]

        console.log("BIDS",data)

         this.topTenHighestContracts = data.sort(function(a, b) {
          var nameA = a?.totalEstimatedValue.split(',') 
          var nameB = b?.totalEstimatedValue.split(',') 
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

          var valueC = element?.totalEstimatedValue.split(',')
          var valueD = parseInt(valueC.join(''))
        
          categories.push(element.provider)
          categorieValues.push(valueD)
          numOfBids.push(parseInt(element?.numberOfBidsSubmitted))
        });

        console.log(categories)
        console.log(categorieValues)

        this.chart?.updateOptions({
          series: [
            {
              name: "Estimated Value",
              type: "column",
              data: categorieValues
            },
            {
              name: "Bid Submited",
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

  // getBidsByFinancialYear(reportName,financialYear,procuringEntity){
  //   this.isLoading=true
  //   this._dueDeligenceReportService.getEvaluationBids(reportName,financialYear,procuringEntity).subscribe(
  //     (response )=>{ 
  //       console.log(`${reportName}`,response)
  //       this.isLoading = false
  //       },
  //     (error) => {
  //       this.isLoading = false;
  //       this.toastr.error("Something Went Wrong", '', {
  //         progressBar: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       this.isLoading = false
  //       console.log(error)
  //     }
  //   )
  // }

  

  

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
        enabled: true,
        enabledOnSeries: [1]
      },
      stroke: {
        show: true,
        width: 2,
        curve:'smooth'
        
      },
      xaxis: {
        categories: []
      },    

      yaxis: [{
        title: {
          text: '(UGX) Estimated Value',
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
      
      }, {
        opposite: true,
        title: {
          text: 'Number of Bids Submitted'
        }
      }],

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
        text: 'No Data Available ...'
      },
      title: {
        text: "Evaluated Providers with highest bid values"
      },
    };

    // this.chartOptionsBidsByFinancialYear ={
    //   series: [
    //     {
    //       name: "Bid Value",
    //       type: "column",
    //       data: []
    //     },
    //     {
    //       name: "Number of Bids",
    //       type: "line",
    //       data: []
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar"
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: "55%",
    //       borderRadius: 2
    //     }
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ["transparent"]
    //   },
    //   title: {
    //     text: "Awarded Contract Procurement Type"
    //   },
    //   dataLabels: {
    //     enabled: false,
    //     enabledOnSeries: [1]
    //   },

    //   xaxis: {
    //     categories: [],
    //     labels: {
    //       style: {
    //         fontSize: "12px"
    //       }
    //     }
    //   },
    //   yaxis: [
    //     {
    //       title: {
    //         text: "Bid Value"
    //       },
    //       labels: {
    //         style: {
    //           colors: [
    //             "#008FFB",
    //           ],
    //           fontSize: "12px"
    //         },
    //         formatter: function (val) {
    //           return NumberSuffix(val, 2)
    //         }
    //       }
    //     },
    //     {
    //       opposite: true,
    //       title: {
    //         text: "Number of Bids"
    //       }
    //     }
    //   ],
    //   fill: {
    //     opacity: 1
    //   },
    //   // tooltip: {
    //   //   y: {
    //   //     formatter: function(val) {
    //   //       return "UGX " + NumberSuffix(val,2) ;
    //   //     }
    //   //   }
    //   // },
    //   noData: {
    //     text: 'No Data Available'
    //   }
    // };
  }

  getFontSize() {
    return Math.max(10, 12);
  }

}
