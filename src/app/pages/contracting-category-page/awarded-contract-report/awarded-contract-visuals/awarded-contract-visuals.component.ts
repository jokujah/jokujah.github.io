import { AwardedContractReportService } from './../../../../services/ContractCategory/awarded-contract-report.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { DueDeligenceReportService } from 'src/app/services/EvaluationCategory/due-deligence-report.service';
import { getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import ROP from './../../../../../assets/ROP.json'


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
  selector: 'app-awarded-contract-visuals',
  templateUrl: './awarded-contract-visuals.component.html',
  styleUrls: ['./awarded-contract-visuals.component.scss']
})
export class AwardedContractVisualsComponent implements OnInit {

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
    private _service: AwardedContractReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });    
  }

  ngOnInit(): void {
    this.getSummaryStats('contracts-summary',this.financialYears[0],'')
    this.getVisualisation('contracts-by-contract-type',this.financialYears[0],'')
    
  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    this.getSummaryStats('contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    // this.getVisualisation('contracts-by-contract-type',this.financialYears[0],data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);

    this.getSummaryStats('contracts-summary',this.financialYears[0],'')
    this.getVisualisation('contracts-by-contract-type',this.financialYears[0],'')

  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = financialYear
    

    console.log(reportName)

    this._service.getSummaryStatsNofilter(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        this.numberOfContracts = data.number_of_contracts
        this.valueOfContracts = sanitizeCurrencyToString(data.value_of_contracts)
        //this.allEvavluatedBidders = data.total_evaluated_bidders

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

    console.log(reportName)

    this._service.getSummaryStatsNofilter(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let  x = []
        let  y = []

        let categories=[]
        let categorieValues=[]
        let numOfBids=[]

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
          var nameA = a?.contract_value.split(',') 
          var nameB = b?.contract_value.split(',') 
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

          var valueC = element?.contract_value.split(',')
          var valueD = parseInt(valueC.join(''))
          categories.push(element.contract_type)
          categorieValues.push(valueD)
          numOfBids.push(parseInt(element?.number_of_contracts))
        });


        this.chartOptions = {
          series: [
            {
              name: "Contract Award Value",
              type: "column",
              data: categorieValues
            },
            {
              name: "Number of Bids",
              type: "line",
              data: numOfBids
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
            text: "Awarded Contract by Type and Value"
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          
          xaxis: {
            categories: categories,
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
          // tooltip: {
          //   y: {
          //     formatter: function(val) {
          //       return "UGX " + NumberSuffix(val,2) ;
          //     }
          //   }
          // }
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

  getFontSize() {
    return Math.max(10, 12);
  }

}
