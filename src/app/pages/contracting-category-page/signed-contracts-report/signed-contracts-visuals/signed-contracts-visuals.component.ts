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
  selector: 'app-signed-contracts-visuals',
  templateUrl: './signed-contracts-visuals.component.html',
  styleUrls: ['./signed-contracts-visuals.component.scss']
})
export class SignedContractsVisualsComponent implements OnInit {
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
    this.getSummaryStats('signed-contracts-summary', this.financialYears[0], '')
    this.getVisualisation('high-value-contracts', this.financialYears[0], '')
    
  }



  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('signed-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('high-value-contracts',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);

    this.getSummaryStats('signed-contracts-summary',this.financialYears[0],'')
    this.getVisualisation('high-value-contracts',this.financialYears[0],'')

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
        
        this.numberOfContracts = data.number_of_signed_contracts
        this.valueOfContracts = sanitizeCurrencyToString(data.total_value_of_signed_contracts)
        //this.allEvavluatedBidders = data.total_evaluated_bidders

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

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let estimatedAmount = []
        let actualAmount = []
        let sortedData = []

        switch (reportName) {
          case 'high-value-contracts':           
            console.log("AWARDED", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.estimated_amount.split(',')
              var nameB = b?.estimated_amount.split(',')
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
              var valueC = element?.estimated_amount.split(',')
              var valueD = parseInt(valueC.join(''))
              var valueE = element?.actual_cost.split(',')
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subject_of_procurement))
              estimatedAmount.push(valueD)
              actualAmount.push(valueF)
            });
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
            return "UGX " + NumberSuffix(val,2) ;
          }
        }
      },
      noData: {
        text: 'No Data Available ...'
      },
      title: {
        text: "Signed High Value Contracts"
      },
    };
  }

}