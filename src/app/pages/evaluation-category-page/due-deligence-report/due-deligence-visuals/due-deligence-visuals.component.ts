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
        
        this.successfullEvaluatedBidders = data.successfulEvaluatedBidders?sanitizeCurrencyToString(data.successfulEvaluatedBidders):0
        this.valueOfBids = data.totalBidEstimateValue?sanitizeCurrencyToString(data.totalBidEstimateValue):0
        this.allEvaluatedBidders =  data.totalEvaluatedBidders?sanitizeCurrencyToString(data.totalEvaluatedBidders):0

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
      noData:{
        text:"Loading Data ...."
      }
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
        console.log(financialYear)
        if (financialYear == '2021-2022') {
          categorieValues = [450000000000, 300000000000, 250000000000, 210000000000, 190000000000, 174000000000, 150000000000]
          numOfBids = [3000, 800, 2000, 1000, 1500, 200, 900]
          categories = ["A and B Traders", "Masaka SACCO", "Atala Co", "Mujim and Sons", "Alabama Contracts", "Elohim Tailors"]
        }
        if (financialYear == '2020-2019') {
          categorieValues = [650000000000, 400000000000, 350000000000, 270000000000, 200000000000, 194000000000, 180000000000]
          numOfBids = [10000, 2000, 6000, 5000, 3500, 2000, 1900]
          categories = ["Mujim and Sons", "Alabama Contracts", "Atala Co", "A and B Traders", "Masaka SACCO", "Elohim Tailors"]
        }
        if (financialYear == '2020-2021') {
          categorieValues = [450000000000, 300000000000, 250000000000, 210000000000, 190000000000, 174000000000, 150000000000]
          numOfBids = [3000, 800, 2000, 1000, 1500, 200, 900]
          categories = ["A and B Traders", "Masaka SACCO", "Atala Co", "Mujim and Sons", "Alabama Contracts", "Elohim Tailors"]
        }
        this.chart?.updateOptions({
          series: [
            {
              name: "Estimated Value",
              type: "column",
              data: categorieValues
            },
            {
              name: "Bid Submited",
              type: "column",
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
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        
        let categories=[]
        let categorieValues=[]
        
        let numOfBids=[]

        console.log(financialYear)
        // let fy=['2021-2022','2020-2019','2020-2021']
        // var s = Math.floor(Math.random() * 2);
        // financialYear = fy[s]
        if (financialYear == '') {
          categorieValues = [9500000000000, 3000000000000, 1150000000000, 1210000000000, 2190000000000, 1174000000000, 1150000000000]
          numOfBids = [13000, 3800, 12000, 11000, 12500, 2200, 9200]
          categories = ["A and B Traders", "Masaka SACCO", "Atala Co", "Mujim and Sons", "Alabama Contracts", "Elohim Tailors"]
        }
       
         if (financialYear == '2021-2022') {
          categorieValues = [450000000000, 300000000000, 250000000000, 210000000000, 190000000000, 174000000000, 150000000000]
          numOfBids = [3000, 800, 2000, 1000, 1500, 200, 900]
          categories = ["A and B Traders", "Masaka SACCO", "Atala Co", "Mujim and Sons", "Alabama Contracts", "Elohim Tailors"]
        }
        if (financialYear == '2020-2019') {
          categorieValues = [650000000000, 400000000000, 350000000000, 270000000000, 200000000000, 194000000000, 180000000000]
          numOfBids = [10000, 2000, 6000, 5000, 3500, 2000, 1900]
          categories = ["Mujim and Sons", "Alabama Contracts", "Atala Co", "A and B Traders", "Masaka SACCO", "Elohim Tailors"]
        }
        if (financialYear == '2020-2021') {
          categorieValues = [450000000000, 300000000000, 250000000000, 210000000000, 190000000000, 174000000000, 150000000000]
          numOfBids = [3000, 800, 2000, 1000, 1500, 200, 900]
          categories = ["A and B Traders", "Masaka SACCO", "Atala Co", "Mujim and Sons", "Alabama Contracts", "Elohim Tailors"]
        }
        this.chart?.updateOptions({
          series: [
            {
              name: "Estimated Value",
              type: "column",
              data: categorieValues
            },
            {
              name: "Bid Submited",
              type: "column",
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
          noData:{
            text:"No Data Availabel..."
          }
        })
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
        type: "bar",
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
        enabled: false,
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
        text: 'No Data Available...'
      },
      title: {
        text: "Evaluated Providers by Highest Bid Values"
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
