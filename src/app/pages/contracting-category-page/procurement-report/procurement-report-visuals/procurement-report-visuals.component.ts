import { initRadarChart, initColumnChart, initRadialChart } from 'src/app/utils/chartsApex';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NumberSuffix, addArrayValues, sortTable, visualisationMessages, emptyVisualisation, sanitizeCurrencyToString, capitalizeFirstLetter } from 'src/app/utils/helpers';

import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/utils/IChartOptions';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';




@Component({
  selector: 'app-procurement-report-visuals',
  templateUrl: './procurement-report-visuals.component.html',
  styleUrls: ['./procurement-report-visuals.component.scss']
})
export class ProcurementReportVisualsComponent implements OnInit {

  @ViewChild("chartProcurementType") chartProcurementType: ChartComponent;
  public chartOptionsProcurementType: Partial<ChartOptions>;

  @ViewChild("chartProcurementTypeValue") chartProcurementTypeValue: ChartComponent;
  public chartOptionsProcurementTypeValue: Partial<ChartOptions>;


  dir
  sortTable = sortTable

  
  isLoading:boolean = false
  isEmpty: boolean;

  awardedContractsByProcurementMethod = []
  awardedContractsByContractsNumber = []
  awardedContractsByContractType = []
  
  //KPIs
  valueOfContracts;
  numberOfContracts;
  highestAwardedContractValue;
  highestNoOfConstracts;
  averageValueOfContracts;
  topTenHighestContracts
  

  constructor( private _service: AwardedContractReportService) {  }

  ngOnInit(): void {
    this.initCharts()    
  }

  submit(data) {
    this.getSummaryStats('procurement-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-type', data?.selectedFinancialYear,data?.selectedPDE)
  }
  
  reset(data){
    this.getSummaryStats('procurement-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('contracts-by-procurement-type', data?.selectedFinancialYear,data?.selectedPDE)
  }

  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0

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
    //this.valueOfContracts = 0
    //this.numberOfContracts = 0
    

    this.chartProcurementType?.updateOptions(emptyVisualisation('loading'))
    this.chartProcurementTypeValue?.updateOptions(emptyVisualisation('loading'))

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
          // case 'contracts-by-contract-type':           
          //   console.log("contracts-by-contract-type", data)

          //   sortedData = data.sort(function (a, b) {
          //     var nameA = a?.contractValue.split(',')
          //     var nameB = b?.contractValue.split(',')
          //     var valueA = parseInt(nameA.join(''))
          //     var valueB = parseInt(nameB.join(''))

          //     if (valueA > valueB) {
          //       return -1;
          //     }
          //     if (valueA < valueB) {
          //       return 1;
          //     }
          //     return 0;
          //   })

          //   this.awardedContractsByContractType = sortedData
            
          //   sortedData.forEach(element => {
          //     var valueC = element?.contractValue.split(',')
          //     var valueD = parseInt(valueC.join(''))
          //     categories.push(capitalizeFirstLetter(element.contractType))
          //     categorieValues.push(valueD)
          //     numOfBids.push(parseInt(element?.numberOfContracts))
          //   });

          //   this.initRadialChart(categorieValues,categories)

           

          //   break;
          // case 'contracts-by-procurement-method':           
           
          //   console.log("contracts-by-procurement-method", data)
          //   sortedData = []
          //   sortedData  = data.sort(function (a, b) {
          //     var nameA = a?.contractValue.split(',')
          //     var nameB = b?.contractValue.split(',')
          //     var valueA = parseInt(nameA.join(''))
          //     var valueB = parseInt(nameB.join(''))

          //     if (valueA > valueB) {
          //       return -1;
          //     }
          //     if (valueA < valueB) {
          //       return 1;
          //     }
          //     return 0;
          //   })

          //   this.awardedContractsByProcurementMethod = sortedData
          //   this.highestAwardedContractValue = (this.awardedContractsByProcurementMethod[0]?.contractValue)?sanitizeCurrencyToString(this.awardedContractsByProcurementMethod[0]?.contractValue):0
           
           
          //   break;
          
            case 'contracts-by-procurement-type':           
           console.log("contracts-by-procurement-type", data)
            if(data.length > 0){           

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
              numOfBids.push(parseInt(element?.numberOfContracts.split(',').join('')))
            });

            console.log('categories',categories)
            console.log('categorieValues',categorieValues)
            console.log('numOfBids',numOfBids)

            //this.valueOfContracts = addArrayValues(categorieValues)
            //this.numberOfContracts = addArrayValues(numOfBids)

            this.chartProcurementType.updateOptions({
                series: numOfBids,
                labels:categories,
                plotOptions: {
                  pie: {
                    expandOnClick: true,
                    customScale: 1,
                    donut: {
                      labels: {
                        show: true,
                        name: {
                          show:true,
                          fontSize:'8px',
                        },
                        value: {
                          show: true,
                          fontSize:'14px',
                          formatter: function (val) {
                            return val
                          }
                        },
                        total:{
                          show: true,
                          label:'Total',
                          fontSize:'14px',
                        }
                      }
                    }
                  }
                },
                noData: {
                  text: visualisationMessages('empty')
                }
            })    
            
            this.chartProcurementTypeValue.updateOptions({
              series:[
                {
                  name:'Value Of Contracts',
                  data: categorieValues
                }
              ],
              xaxis: {
                categories: categories,
              },
              noData:{
                text:visualisationMessages('empty')
              }
            })  
          }else{
            this.chartProcurementType.updateOptions(emptyVisualisation('empty'))
            this.chartProcurementTypeValue.updateOptions(emptyVisualisation('empty'))
          }  
            break;

        }
         
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false      
       
        this.chartProcurementType?.updateOptions(emptyVisualisation('error'))
        this.chartProcurementTypeValue?.updateOptions(emptyVisualisation('error'))
        console.log(error)
        throw error
      }
    )
  }

  initCharts(){
    this.chartOptionsProcurementType = initRadialChart([],[],'Number of Contracts by Procurement Type')
    this.chartOptionsProcurementTypeValue = initColumnChart([
    ],[],'Value of Contracts by Procurement Type','Value of Contracts(UGX)','Procurement Types')
  }

}
