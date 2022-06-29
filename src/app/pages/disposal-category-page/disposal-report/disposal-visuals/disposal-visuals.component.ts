import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNoData,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, sortTable } from 'src/app/utils/helpers';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';

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
  selector: 'app-disposal-visuals',
  templateUrl: './disposal-visuals.component.html',
  styleUrls: ['./disposal-visuals.component.scss']
})
export class DisposalVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  cardValue3;

  dir
  sortTable = sortTable
  highestReservePrice = 0

  topTenHighestContracts  = []
  


  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    //this.initCharts()    
  }



  submit(data) {
    this.getSummaryStats('disposal-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-disposal-contract-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('disposal-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-disposal-contract-list-summary',data?.selectedFinancialYear,data?.selectedPDE)

  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue2 = 0
    this.cardValue1 = 0
    this.cardValue3 = 0

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfDisposals ? sanitizeCurrencyToString(data.numberOfDisposals) : 0
          this.cardValue2 = data.totalReservePrice ? sanitizeCurrencyToString(data.totalReservePrice) : 0
          this.cardValue3 = data.totalContractAmount ? data.totalContractAmount : 0
        }
        this.isLoading = false
        },
      (error) => {
        this.isLoading = false
        console.log(error)
        throw error
      }
    )
  }

  getVisualisation(reportName,financialYear,procuringEntity){
    this.isLoading=true
    // this.cardValue2 = 0
    // this.cardValue1 = 0
    // this.cardValue3 = 0

   

    this.chart?.updateOptions({
      series: [],
      xaxis: {
        categories:[],
        labels: {
          style: {
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,0)}
        }            
      },
      noData: {
        text: 'Loading Data ...'
      },
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let reservePrice = []
        let contractAmount = []
        let sortedData = []
        this.topTenHighestContracts=[]
        this.highestReservePrice = 0
        switch (reportName) {
          case 'top-disposal-contract-list-summary':           
            console.log("top-disposal-contract-list-summary", data)

            // sortedData = data.sort(function (a, b) {
            //   var nameA = a?.reservePrice.split(',')
            //   var nameB = b?.reservePrice.split(',')
            //   var valueA = parseInt(nameA.join(''))
            //   var valueB = parseInt(nameB.join(''))

            //   if (valueA > valueB) {
            //     return -1;
            //   }
            //   if (valueA < valueB) {
            //     return 1;
            //   }
            //   return 0;
            // })

            

            if (response.data.length > 0) {

              this.topTenHighestContracts = data.slice(0,10)
              this.highestReservePrice = this.topTenHighestContracts[0]?.reservePrice ? sanitizeCurrencyToString(this.topTenHighestContracts[0]?.reservePrice):0
              
              for (let i = 0; i < 9; i++) {
                var valueC = data[i]?.reservePrice.split(',')
                var valueD = parseInt(valueC.join(''))
                var valueE = data[i]?.contractAmount.split(',')
                var valueF = parseInt(valueE.join(''))
                subjectOfProcurement.push(capitalizeFirstLetter(data[i].subjectOfProcurement))
                reservePrice.push(valueD)
                contractAmount.push(valueF)
              }

              // data.forEach(element => {
              //   var valueC = element?.reservePrice.split(',')
              //   var valueD = parseInt(valueC.join(''))
              //   var valueE = element?.contractAmount.split(',')
              //   var valueF = parseInt(valueE.join(''))
              //   subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              //   reservePrice.push(valueD)
              //   contractAmount.push(valueF)
              // });
              this.chart?.updateOptions({
                series: [
                  {
                    name: "Reserve Price",
                    data: reservePrice
                  },
                  // {
                  //   name: "Contract Amount",
                  //   type: "line",
                  //   data: contractAmount
                  // }
                ],
                xaxis: {
                  categories: subjectOfProcurement,
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
            }else{
              this.chart?.updateOptions({
                series: [],
                xaxis: {
                  categories:[],
                  labels: {
                    style: {
                      fontSize: "12px"
                    },
                    formatter: function(val) {
                      return NumberSuffix(val,0)}
                  }            
                },
                noData:{
                  text:'There is no data available, Try changing the search filter'
                }
              })
            }
            break;
          
          }
         
          this.isLoading = false
        },
      (error) => {
        this.chart?.updateOptions({
          series: [],
          xaxis: {
            categories:[],
            labels: {
              style: {
                fontSize: "12px"
              },
              formatter: function(val) {
                return NumberSuffix(val,0)}
            }            
          },
          noData:{
            text:'Error Loading Data , Reload to retrieve data'
          }
        })
        this.isLoading = false
        console.log(error)
        throw error
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
        fontFamily:'Trebuchet Ms',
        type: "bar",
        height: '500px'
      },
      plotOptions: {
        bar: {
          horizontal: true,
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
        colors: ["transparent"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: "Providers "
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "UGX " + NumberSuffix(val,1) ;
          }
        }
      },
      noData: {
        text: 'Loading Data ...'
      },
      title: {
        text: "Top 10 Disposal Contracts",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          color:  '#263238'
        },
      },
    };
  }

}
