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
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
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
  selector: 'app-micro-procurement-visuals',
  templateUrl: './micro-procurement-visuals.component.html',
  styleUrls: ['./micro-procurement-visuals.component.scss']
})
export class MicroProcurementVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isLoading:boolean = false 
  valueOfContracts;
  numberOfContracts;
  yearOfBids;
  allEvavluatedBidders;

  topTenHighestContracts 
  


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
    this.initCharts() 
  }



  submit(data) {
    this.getSummaryStats('micro-procurements-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-micro-procurements-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('micro-procurements-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-micro-procurements-list-summary',data?.selectedFinancialYear,data?.selectedPDE)

  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.numberOfContracts = data.numberOfProcurements ? data.numberOfProcurements : 0
          this.valueOfContracts = data.contractValue ? sanitizeCurrencyToString(data.contractValue) : 0
          //this.allEvavluatedBidders = data.total_evaluated_bidders
        }
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
      noData: {
        text: 'Loading Data...'
      },
    })

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let estimatedAmount = []
        let actualAmount = []
        let sortedData = []

        switch (reportName) {
          case 'top-micro-procurements-list-summary':           
            console.log("top-micro-procurements-list-summary", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.estimatedAmount?a?.estimatedAmount.split(','):['0']
              var nameB = b?.estimatedAmount?b?.estimatedAmount.split(','):['0']
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
            
            sortedData.forEach(element => {
              console.log(element)
              if(element?.estimatedAmount == null) return;
              if(element?.contractAmount == null) return;
              if(element?.subjectOfProcurement == null) return;

              var valueC = element?.estimatedAmount.split(',')
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.contractAmount.split(',')
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              estimatedAmount.push(valueD)
              actualAmount.push(valueF)
            });

            console.log(subjectOfProcurement)
            console.log(estimatedAmount)
            console.log(actualAmount)


            this.chart?.updateOptions({
              series: [
                {
                  name: "Estimated Amount",
                  data: estimatedAmount
                },
                {
                  name: "Actual Amount",
                  type: "line",
                  data: actualAmount
                }
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
              noData: {
                text: 'Loading Data...'
              },
            })

            break;
          
          }
         
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
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
          noData: {
            text: 'Error Loading Data ...'
          },
        })
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
          text: "Providers"
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
        text: 'Loading Data ...'
      },
      title: {
        text: "Micro Procurements with highest value",
        style:{
          fontSize:'14px'
        }
      },
    };
  }

}
