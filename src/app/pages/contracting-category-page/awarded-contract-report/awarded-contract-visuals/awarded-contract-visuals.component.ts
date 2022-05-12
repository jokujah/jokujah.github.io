import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';
import { DueDeligenceReportService } from 'src/app/services/EvaluationCategory/due-deligence-report.service';
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString } from 'src/app/utils/helpers';
import ROP from './../../../../../assets/ROP.json'
import { Toast, ToastrService } from 'ngx-toastr';


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
  noData:ApexNoData;
};

@Component({
  selector: 'app-awarded-contract-visuals',
  templateUrl: './awarded-contract-visuals.component.html',
  styleUrls: ['./awarded-contract-visuals.component.scss']
})
export class AwardedContractVisualsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartProcurementMethod") chartProcurementMethod: ChartComponent;
  public chartOptionsProcurementMethod: Partial<ChartOptions>;

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;

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
    this.chartOptions = {
      series: [
        {
          name: "Contract Award Value",
          type: "column",
          data: []
        },
        {
          name: "Number of Bids",
          type: "line",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Awarded Contract Type "
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
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
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
        text: 'Loading Data...'
      }
    };

    this.chartOptionsProcurementMethod = {
      series: [
        {
          name: "Contract Award Value",
          type: "column",
          data: []
        },
        {
          name: "Number of Bids",
          type: "line",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Awarded Contract Method"
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
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
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
        text: 'Loading Data...'
      }
    };

    this.chartOptionsProcurementType = {
      series: [
        {
          name: "Contract Award Value",
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
        type: "line"
      },
      stroke: {
        width: [0, 4],
        curve:'smooth'
      },
      title: {
        text: "Awarded Contract Procurement Type"
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
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
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
        text: 'No Data Available'
      }
    };

    this.getSummaryStats('contracts-summary', this.financialYears[0], '')
    this.getVisualisation('contracts-by-contract-type', this.financialYears[0], '')
    this.getVisualisation('contracts-by-procurement-method', this.financialYears[0], '')
    this.getVisualisation('contracts-by-procurement-type', this.financialYears[0], '')

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
            colors: [
              "#008FFB",
              "#D10CE8",
            ],
            fontSize: "12px"
          },
          formatter: function(val) {
            return NumberSuffix(val,2)}
        }            
      },
    })

    this.chartProcurementMethod?.updateOptions({

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

    this.chartProcurementType?.updateOptions({

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

    console.log(reportName)

    this._service.getSummaryStatsNofilter(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let categories = []
        let categorieValues = []
        let numOfBids = []
        let sortedData = []

        switch (reportName) {
          case 'contracts-by-contract-type':           
            console.log("AWARDED", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contract_value.split(',')
              var nameB = b?.contract_value.split(',')
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
              var valueC = element?.contract_value.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.contract_type))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.number_of_contracts))
            });
            this.chart?.updateOptions({
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

            break;
          case 'contracts-by-procurement-method':           
           
            console.log("Procurement Method", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.value_of_contracts.split(',')
              var nameB = b?.value_of_contracts.split(',')
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
              var valueC = element?.value_of_contracts.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.procurement_method))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.number_of_contracts))
            });

            this.chartProcurementMethod?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: categorieValues
                },
                {
                  name: "Number of Contracts",
                  type: "line",
                  data: numOfBids
                }
              ],
              xaxis: {
                categories: categories,
                labels: {
                  style: {
                    colors: [
                      "#008FFB",
                      "#D10CE8",
                    ],
                    fontSize: "12px"
                  },
                  formatter: function (val) {
                    return NumberSuffix(val, 2)
                  }
                }
              },
            })
            break;
          case 'contracts-by-procurement-type':           
           
            console.log("Procurement Type", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contract_value.split(',')
              var nameB = b?.contract_value.split(',')
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
              var valueC = element?.contract_value.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.procurement_type))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.number_of_contracts))
            });

            this.chartProcurementType?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: categorieValues
                },
                {
                  name: "Number of Contracts",
                  type: "line",
                  data: numOfBids
                }
              ],
              xaxis: {
                categories: categories,
                labels: {
                  style: {
                    colors: [
                      "#008FFB",
                      "#D10CE8",
                    ],
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

}
