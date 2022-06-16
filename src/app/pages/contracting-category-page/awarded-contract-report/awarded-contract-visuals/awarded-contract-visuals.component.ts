import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
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
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  toolbar:any
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


  @ViewChild("chartProcurementMethodContracts") chartProcurementMethodContracts: ChartComponent;
  public chartOptionsProcurementMethodContracts: Partial<ChartOptions>;

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;

  isLoading:boolean = false 
  valueOfContracts;
  numberOfContracts;
  yearOfBids;
  allEvavluatedBidders;
  topTenHighestContracts 


  

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private _service: AwardedContractReportService
    ) {}

  ngOnInit(): void {
    this.initCharts()
  }

  submit(data) {
    this.getSummaryStats('contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-contract-type',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-method', data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-type', data?.selectedFinancialYear,data?.selectedPDE)

  }

  reset(data){
    this.getSummaryStats('contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-contract-type',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-method',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-type',data?.selectedFinancialYear,data?.selectedPDE)

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
        
        this.numberOfContracts = data.numberOfContracts?data.numberOfContracts:0
        this.valueOfContracts = data.valueOfContracts?sanitizeCurrencyToString(data.valueOfContracts):0
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

    // this.chart?.updateOptions({

    //   series: [],

    //   xaxis: {
    //     categories:[],
    //     labels: {
    //       style: {
    //         fontSize: "12px"
    //       },
    //       formatter: function(val) {
    //         return NumberSuffix(val,2)}
    //     }            
    //   },
    //   noData: {
    //     text: 'Loading Data...'
    //   }
    // })

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
      noData: {
        text: 'Loading Data...'
      }
    })

    this.chartProcurementMethodContracts?.updateOptions({

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
      }
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
      noData: {
        text: 'Loading Data...'
      }
    })

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let categories = []
        let categorieValues = []
        let numOfBids = []
        let sortedData = []

        switch (reportName) {
          case 'contracts-by-contract-type':           
            console.log("contracts-by-contract-type", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contractValue.split(',')
              var nameB = b?.contractValue.split(',')
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
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.contractType))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.numberOfContracts))
            });
            this.chart?.updateOptions({
              series: categorieValues,
              labels: categories
            })

            break;
          case 'contracts-by-procurement-method':           
           
            console.log("contracts-by-procurement-method", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contractValue.split(',')
              var nameB = b?.contractValue.split(',')
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
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.procurementMethod))
              categorieValues.push(valueD)
            });

            this.chartProcurementMethod?.updateOptions({
              series: [
                {
                  name: "Contract Award Value",
                  type: "column",
                  data: categorieValues
                }
              ],
              xaxis: {
                categories: categories,
                labels: {
                  formatter: function (val) {
                    return NumberSuffix(val, 2)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
            })

            sortedData = []

            sortedData = data.sort(function (a, b) {
              var nameA = a?.numberOfContracts.split(',')
              var nameB = b?.numberOfContracts.split(',')
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
            categories=[]
            sortedData.forEach(element => {
              categories.push(capitalizeFirstLetter(element.procurementMethod))
              numOfBids.push(parseInt(element?.numberOfContracts))
            });



            this.chartProcurementMethodContracts?.updateOptions({
              series: [
                {
                  name: "Number of Contracts",
                  data: numOfBids
                }
              ],
              xaxis: {
                categories: categories,               
              },
              noData: {
                text: 'No Data Available...'
              }
            })
            break;
          case 'contracts-by-procurement-type':           
           
            console.log("contracts-by-procurement-type", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.contractValue.split(',')
              var nameB = b?.contractValue.split(',')
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
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.procurementType))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.numberOfContracts))
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
                  type: "column",
                  data: numOfBids
                }
              ],
              xaxis: {
                categories: categories,
                labels: {                  
                  formatter: function (val) {
                    return NumberSuffix(val, 2)
                  }
                }
              },
              noData: {
                text: 'No Data Available...'
              }
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
          noData: {
            text: 'Error Loading Data...'
          }
        })
    
        this.chartProcurementMethodContracts?.updateOptions({
    
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
          }
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
          noData: {
            text: 'Error Loading Data...'
          }
        })
        console.log(error)
      }
    )
  }


 

  getFontSize() {
    return Math.max(10, 12);
  }

  initCharts(){
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Contract Award Value",
    //       type: "column",
    //       data: []
    //     },
    //     {
    //       name: "Number of Bids",
    //       type: "column",
    //       data: []
    //     }
    //   ],
    //   chart: {
    //     fontFamily:'Trebuchet Ms',
    //     height: 350,
    //     type: "bar"
    //   },
    //   stroke: {
    //     //width: [0, 4],       
    //     curve:'smooth'
    //   },
    //   title: {
    //     text: "Awarded Contract by Contract Type "
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
    //         text: "Contract Value"
    //       },
    //       labels: {
    //         style: {
    //           // colors: [
    //           //   "#008FFB",
    //           // ],
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
    //         text: "Number of Contracts"
    //       }
    //     }
    //   ],
    //   noData: {
    //     text: 'Loading Data ...'
    //   }
    // };

    this.chartOptions = {
      series: [],
      title: {
        text: "% of Awarded Contracts Value by Type ",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          //color: '#1286f3'
        },
      },
      chart: {
        type: "donut",
        fontFamily:'Trebuchet Ms',
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show:true,
              },
              value: {
                show: true,
                formatter: function (val) {
                  return 'UGX'+NumberSuffix(val,2)
                }
              }
            }
          }
        }
      },
      labels: [],
      dataLabels:{
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
      },
      tooltip: {
        enabled: false,
        // formatter: function (val) {
        //   return val + "%"
        // },
      },
      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    };

    this.chartOptionsProcurementMethod = {
      series: [
        {
          name: "Contract Award Value",
          type: "column",
          data: []
        }
      ],
      chart: {
        height: 450,
        type: "bar",
        fontFamily:'Trebuchet Ms',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "35%",
          borderRadius: 2,
          dataLabels: {
            position: 'top'
          }
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Awarded Contract by Procurement Method and Value of bids",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          //color: '#1286f3'
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333'],
          fontWeight: 'bold',
          fontSize: '12px',
        },
        offsetX: 55,
        formatter: function (val) {
          return NumberSuffix(val, 2)
        },
        maxItems: 7,
        hideOverflowingLabels: true,
      },

      xaxis: {
        categories: [],
        title:{
          text:'Value of Bids'
        },
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: [
        {
          title: {
            text: "Procurement Method"
          },
          labels: {
            style: {             
              fontSize: "12px"
            },
            formatter: function (val) {
              return NumberSuffix(val, 2)
            }
          }
        }
      ],
      noData: {
        text: 'Loading Data ...'
      }
    };

    this.chartOptionsProcurementMethodContracts = {
      series: [
        {
          name: "Number of Bids",
          type: "column",
          data: []
        }
      ],
      chart: {
        height: 450,
        type: "bar",
        fontFamily:'Trebuchet Ms',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "35%",
          borderRadius: 2,
          dataLabels: {
            position: 'top'
          }
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Awarded Contract by Procurement Method and Number of Bids",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          //color: '#1286f3'
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#fff'],
          fontWeight:'bold',
          fontSize:'12px'
        },
      },

      xaxis: {
        categories: [],
        title:{
          text:'Number of Bids'
        },
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: [
        {
          title: {
            text: "Procurement Method"
          }
        }
      ],
      noData: {
        text: 'No Data Available...'
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
        fontFamily:'Trebuchet Ms',
        height: 'auto',
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 2
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      title: {
        text: "Awarded Contract by Procurement Type",
        style:{
          fontSize:"14px"
        }
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },

      xaxis: {
        categories: [],
        title:{
          text:''
        },
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
        text: 'Loading Data ...'
      }
    };
  }

}
