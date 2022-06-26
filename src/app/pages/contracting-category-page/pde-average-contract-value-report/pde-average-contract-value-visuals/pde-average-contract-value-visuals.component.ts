import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberSuffix, addArrayValues, getFinancialYears, getsortedPDEList, sanitizeCurrencyToString, capitalizeFirstLetter, sortTable, convertNumbersWithCommas } from 'src/app/utils/helpers';


import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';




@Component({
  selector: 'app-pde-average-contract-value-visuals',
  templateUrl: './pde-average-contract-value-visuals.component.html',
  styleUrls: ['./pde-average-contract-value-visuals.component.scss']
})
export class PdeAverageContractValueVisualsComponent implements OnInit {

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl(this.financialYears[0]);
  downloading = false
  isLoading:boolean = false
  registeredProviders

  dir
  sortTable = sortTable

  totalValueofPlannedContracts ;
  numberOfPlannedContracts;
  yearOfPlannedContracts ;
  numberOfRegisteredEntities  ;
  topTenHighestContracts = []
  isEmpty: boolean;
  highestContractValue: number;
  cardValue1: any;
  cardValue2: any;
  cardValue3: number;
  cardValue4: number;

  constructor(
    private _service: PlaningAndForecastingReportService) {

    this.isEmpty= true
  }

  ngOnInit(): void { }

  submit(data) {
    this.getVisualisation('contracts-by-pde-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }
  
  reset(data){
    this.getVisualisation('contracts-by-pde-summary',data?.selectedFinancialYear,data?.selectedPDE)
   } 
  
  
  getVisualisation(reportName,financialYear,procuringEntity){
      this.isLoading=true


    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let pdeName = []
        let contractValue = []
        let numberOfContracts = []
        let sortedData = []
       

        

        switch (reportName) {
          case 'contracts-by-pde-summary':
            console.log("contracts-by-pde-summary", data)

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
            }).map(element => {
              return {
                ...element,
                averageContractValue:(
                  (element?.numberOfContracts > 0 )
                  ? convertNumbersWithCommas(Math.ceil(sanitizeCurrencyToString(element?.contractValue)/sanitizeCurrencyToString(element?.numberOfContracts)))
                  : 0 
                  )
              }
            })

            this.topTenHighestContracts = sortedData.slice(0,10)
            
            this.highestContractValue = this.topTenHighestContracts[0]?.averageContractValue ? sanitizeCurrencyToString(this.topTenHighestContracts[0]?.averageContractValue):0

            data.forEach(element => {
              let valueC = (element?.contractValue)?element?.contractValue.split(','):['0']
              let valueD = parseInt(valueC.join(''))
              let valueE = element?.numberOfContracts ?parseInt(element?.numberOfContracts):0
            
              pdeName.push(capitalizeFirstLetter(element.pdeName))
              contractValue.push(valueD)
              numberOfContracts.push(valueE)
            });

            this.cardValue1 = addArrayValues(numberOfContracts)
            this.cardValue2 = addArrayValues(contractValue)
            this.cardValue3 = sortedData.length
            this.cardValue4 = (this.cardValue1 > 0) ? (this.cardValue2/this.cardValue1) : 0

           
            break;
          
          }         
          this.isLoading = false
        },
      (error) => {
        this.isLoading = false;        
        console.log(error)
        throw error
      }
    )
  }  
}
