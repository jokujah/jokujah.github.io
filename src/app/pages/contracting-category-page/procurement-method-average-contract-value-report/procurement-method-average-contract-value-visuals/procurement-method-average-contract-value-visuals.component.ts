import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, capitalizeFirstLetter, sortTable, sanitizeCurrencyToString } from 'src/app/utils/helpers';

import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';

@Component({
  selector: 'app-procurement-method-average-contract-value-visuals',
  templateUrl: './procurement-method-average-contract-value-visuals.component.html',
  styleUrls: ['./procurement-method-average-contract-value-visuals.component.scss']
})
export class ProcurementMethodAverageContractValueVisualsComponent implements OnInit {
  
  isLoading:boolean = false
  registeredProviders

  dir
  sortTable = sortTable;

  totalValueofContracts ;
  numberOfContracts;
  yearOfPlannedContracts ;
  numberOfRegisteredEntities  ;
  topTenHighestContracts
  isEmpty: boolean;

  //KPIs
  valueOfContracts;
  highestAwardedContractValue;
  highestNoOfConstracts;
  averageValueOfContracts;
  totalValueofContractsPM: any = 0;
  topTenHighestContractsPM: any = [];
  topTenHighestNumberOfContractsPM: any = [];
  totalNumberofContractsPM: any = 0;

  constructor(
    private _service: PlaningAndForecastingReportService
    ) {}

  ngOnInit(): void { }

  submit(data) {
    this.getSummaryStats('contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('top-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('number-value-by-method',data?.selectedFinancialYear,data?.selectedPDE)
   }
  
  reset(data) {
    this.getSummaryStats('contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getVisualisation('top-contracts-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('number-value-by-method',data?.selectedFinancialYear,data?.selectedPDE)
   }


   getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.valueOfContracts = 0
    this.numberOfContracts = 0
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
    this.topTenHighestContracts = [] 
    this.totalValueofContracts = 0

   
    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let contractValue = []
        let actualAmount = []
        let sortedData = []

        switch (reportName) {
          case 'top-contracts-summary':           
            console.log("top-contracts-summary", data)

            sortedData = data.sort(function (a, b) {
              var nameA = a?.estimatedAmount.split(',')
              var nameB = b?.estimatedAmount.split(',')
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
           
            
            sortedData.forEach(element => {
              var valueC = (element?.estimatedAmount)?(element?.estimatedAmount.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              var valueE = (element?.contractAmount)?(element?.contractAmount.split(',')):['0'];
              var valueF = parseInt(valueE.join(''))
              subjectOfProcurement.push(capitalizeFirstLetter(element.subjectOfProcurement))
              contractValue.push(valueD)
              actualAmount.push(valueF)
            });

            
            //this.numberOfContracts = this.topTenHighestContracts.length
            this.totalValueofContracts = addArrayValues(contractValue)

            console.log(this.totalValueofContracts)

            break;
          case 'number-value-by-method':           
            console.log("number-value-by-method", data)

            this.topTenHighestContractsPM = data.sort(function (a, b) {
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
            
            this.topTenHighestContractsPM.forEach(element => {
              var valueC = (element?.contract_value)?(element?.contract_value.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              //subjectOfProcurement.push(capitalizeFirstLetter(element?.procurement_method))
              contractValue.push(valueD)
            });

            this.topTenHighestNumberOfContractsPM = response.data.map((element)=>element).sort(function (a, b) {
              var nameA = a?.number_of_contracts.split(',')
              var nameB = b?.number_of_contracts.split(',')
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
            
            this.topTenHighestNumberOfContractsPM.forEach(element => {
              var valueC = (element?.number_of_contracts)?(element?.number_of_contracts.split(',')):['0'];
              var valueD = parseInt(valueC.join(''))
              //subjectOfProcurement.push(capitalizeFirstLetter(element?.procurement_method))
              actualAmount.push(valueD)
            });

            console.log('this.topTenHighestContractsPM',this.topTenHighestContractsPM)
            console.log('this.topTenHighestNumberOfContractsPM',this.topTenHighestNumberOfContractsPM)

            
            //this.numberOfContracts = this.topTenHighestContracts.length
            this.totalValueofContractsPM = addArrayValues(contractValue)
            this.totalNumberofContractsPM = addArrayValues(actualAmount)

            console.log(this.totalValueofContractsPM)
            console.log(this.totalNumberofContractsPM)

            break;
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
 
}
