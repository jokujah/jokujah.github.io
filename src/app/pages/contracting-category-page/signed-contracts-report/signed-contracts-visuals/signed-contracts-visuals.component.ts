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
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, addArrayValues, sortTable } from 'src/app/utils/helpers';
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
  selector: 'app-signed-contracts-visuals',
  templateUrl: './signed-contracts-visuals.component.html',
  styleUrls: ['./signed-contracts-visuals.component.scss']
})
export class SignedContractsVisualsComponent implements OnInit {
  isEmpty: boolean;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  sortTable = sortTable
  dir = 'asc'

  isLoading:boolean = false 
  valueOfContracts;
  numberOfContracts;
  yearOfBids;
  allEvavluatedBidders;

  //KPI
  topTenHighestContracts : any;
  highestSignedContractValue: any = 0;
  valueOfTopContracts: any = 0;
  


  constructor(
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {}

  ngOnInit(): void {
    this.initCharts()
  }



  submit(data) {
    this.getSummaryStats('signed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('high-value-signed-contracts',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('signed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('high-value-signed-contracts',data?.selectedFinancialYear,data?.selectedPDE)

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
          this.isEmpty = false;
          this.numberOfContracts = data.numberOfSignedContracts
          this.valueOfContracts = sanitizeCurrencyToString(data.totalValueOfSignedContracts)
          //this.allEvavluatedBidders = data.total_evaluated_bidders
        }else{
          this.isEmpty = true;
        }
        this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        
        this.isEmpty = true;        
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

        if(response.data.length > 0){
          this.isEmpty = false;
        switch (reportName) {
          case 'high-value-signed-contracts':           
            console.log("high-value-signed-contracts", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.actualCost.split(',')
              var nameB = b?.actualCost.split(',')
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

            this.topTenHighestContracts = sortedData
            this.highestSignedContractValue = sortedData[0]?.actualCost?sanitizeCurrencyToString(sortedData[0]?.actualCost):0


            
            sortedData.forEach(element => {
              var valueC = element?.estimatedAmount.split(',')
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.actualCost.split(',')
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              estimatedAmount.push(valueD)
              actualAmount.push(valueF)
            });

            this.valueOfTopContracts = actualAmount?addArrayValues(actualAmount):0
            
            this.chart?.updateOptions({
              series: [
                {
                  name: "Estimated Amount",
                  data: estimatedAmount
                },
                {
                  name: "Actual Amount",
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
                text: 'No Data Available...'
              },
            })

            break;
          
          }
        }else{
          this.isEmpty = true
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
        this.isEmpty = true
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
            text: 'Error Loading Data...'
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
        categories: [],
        
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
            return "UGX " + NumberSuffix(val,2) ;
          }
        }
      },
      noData: {
        text: 'Loading Data ...'
      },
      title: {
        text: "Signed High Value Contracts",
        style:{
          fontSize:'14px'
        }
      },
    };
  }

}