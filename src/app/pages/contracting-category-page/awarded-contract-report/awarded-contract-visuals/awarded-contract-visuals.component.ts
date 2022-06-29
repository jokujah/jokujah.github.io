import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNoData, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';
import { DueDeligenceReportService } from 'src/app/services/EvaluationCategory/due-deligence-report.service';
import { capitalizeFirstLetter, getFinancialYears, getsortedPDEList, NumberSuffix, sanitizeCurrencyToString, emptyVisualisation, visualisationMessages } from 'src/app/utils/helpers';
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

  @ViewChild("myTable2") myTable2: any;
  @ViewChild("myTable1") myTable1: any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;

  isLoading:boolean = false 
  
  yearOfBids;
  allEvavluatedBidders;
  topTenHighestContracts 

  awardedContractsByProcurementMethod = []
  awardedContractsByContractsNumber = []

  awardedContractsByContractType = []

  dir


  //KPIs
  valueOfContracts;
  numberOfContracts;
  highestAwardedContractValue;
  highestNoOfConstracts;
  averageValueOfContracts;
  


  

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  isEmpty: boolean;

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
    this.isEmpty = false;

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        
        if (response.data.length > 0) {
          this.numberOfContracts = data?.numberOfContracts ? sanitizeCurrencyToString(data?.numberOfContracts) : 0
          this.valueOfContracts = data?.valueOfContracts ? sanitizeCurrencyToString(data?.valueOfContracts) : 0
          this.averageValueOfContracts =  (this.numberOfContracts > 0) ? this.valueOfContracts/this.numberOfContracts : 0
        }else{
          this.isEmpty = true;
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
    this.valueOfContracts = 0
    this.numberOfContracts = 0
    this.yearOfBids = 0

    this.chartProcurementType?.updateOptions(emptyVisualisation('loading'))

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let categories = []
        let categorieValues = []
        let numOfBids = []
        let sortedData = []
        let sortedByContractNumber = []

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

            this.awardedContractsByContractType = sortedData
            
            sortedData.forEach(element => {
              var valueC = element?.contractValue.split(',')
              var valueD = parseInt(valueC.join(''))
              categories.push(capitalizeFirstLetter(element.contractType))
              categorieValues.push(valueD)
              numOfBids.push(parseInt(element?.numberOfContracts))
            });

            this.initRadialChart(categorieValues,categories)

           

            break;
          case 'contracts-by-procurement-method':           
           
            console.log("contracts-by-procurement-method", data)
            sortedData = []
            sortedData  = data.sort(function (a, b) {
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

            this.awardedContractsByProcurementMethod = sortedData
            this.highestAwardedContractValue = (this.awardedContractsByProcurementMethod[0]?.contractValue)?sanitizeCurrencyToString(this.awardedContractsByProcurementMethod[0]?.contractValue):0
           
           
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
                text: visualisationMessages('empty')
              }
            })
            break;

        }
         
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false       
       
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
            text: visualisationMessages('error')
          }
        })
        console.log(error)
        throw error
      }
    )
  }

   

  initRadialChart(series?, categories?) {
      this.chartOptions = {
        series: series,
        title: {
          text: "% of Awarded Contracts Value by Contract Type ",
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
                    return 'UGX'+NumberSuffix(val,1)
                  }
                }
              }
            }
          }
        },
        labels: categories,
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
        },
        noData:{
          text:visualisationMessages('loading')
        }
      };
    }
  initCharts(){   

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
        text: visualisationMessages('loading')
      }
    };
  }

  sortTable(n,tableName) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableName);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    this.dir="asc"
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */

        // console.log(x)
        // console.log(y)

        if (dir == "asc") {
          if (sanitizeCurrencyToString(x.innerHTML) > sanitizeCurrencyToString(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (sanitizeCurrencyToString(x.innerHTML) < sanitizeCurrencyToString(y.innerHTML) ) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          this.dir="desc"
          switching = true;
        }
      }
    }
  }

}
