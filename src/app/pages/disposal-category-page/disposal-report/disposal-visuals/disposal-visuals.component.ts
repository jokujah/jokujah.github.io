import { ChartOptions } from 'src/app/utils/IChartOptions';
import { initColumnChart, initColumnChart2, initRadialChart } from 'src/app/utils/chartsApex';
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
import { capitalizeFirstLetter, getFinancialYears, getObjectTotal, getsortedPDEList, groupBy, NumberSuffix, sanitizeCurrencyToString, sortArrayBy, sortTable, visualisationMessages, emptyVisualisation, emptyVisualisationNonAxis, removeDuplicates, sortArrayByNumber } from 'src/app/utils/helpers';
import { AwardedContractReportService } from 'src/app/services/ContractCategory/awarded-contract-report.service';


@Component({
  selector: 'app-disposal-visuals',
  templateUrl: './disposal-visuals.component.html',
  styleUrls: ['./disposal-visuals.component.scss']
})
export class DisposalVisualsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> 

  @ViewChild("chartReservePriceByProcurementType") chartReservePriceByProcurementType: ChartComponent;
  public chartOptionsReservePriceByProcurementType: Partial<ChartOptions> 

  isLoading:boolean = false 
  cardValue2;
  cardValue1;
  cardValue3;

  dir
  sortTable = sortTable
  highestReservePrice = 0

  topTenHighestContracts  = []
  


  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  isLoadingDisposals: boolean = false ;

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

  ngOnInit(): void { }



  submit(data) {
    this.getSummaryStats('disposal-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-disposal-contract-list-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(data){
    this.getSummaryStats('disposal-summary',data?.selectedFinancialYear,data?.selectedPDE)
    this.getVisualisation('top-disposal-contract-list-summary',data?.selectedFinancialYear,data?.selectedPDE)

  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this.isLoading=true
    this.cardValue2 = 0
    this.cardValue1 = 0
    this.cardValue3 = 0

    console.log(reportName)

    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        console.log(response)
        let data = response.data[0]
        if (response.data.length > 0) {
          this.cardValue1 = data.numberOfDisposals ? sanitizeCurrencyToString(data.numberOfDisposals) : 0
          this.cardValue2 = data.totalReservePrice ? sanitizeCurrencyToString(data.totalReservePrice) : 0
          this.cardValue3 = data.totalContractAmount ? sanitizeCurrencyToString(data.totalContractAmount) : 0
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
    this.isLoadingDisposals=true    
    this._service.getSummaryStatsWithPDE(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        let data = response.data
        let subjectOfProcurement = []
        let nameOfType = []
        let numberOfDisposals = []
        let reservePrice = []
        let contractAmount = []
        let sortedData = []
        this.topTenHighestContracts=[]
        this.highestReservePrice = 0

        switch (reportName) {
          case 'top-disposal-contract-list-summary':           
            console.log("top-disposal-contract-list-summary", data)

            if (response.data.length > 0) {

              this.topTenHighestContracts = data.slice(0,10)
              this.highestReservePrice = this.topTenHighestContracts[0]?.reservePrice ? sanitizeCurrencyToString(this.topTenHighestContracts[0]?.reservePrice):0
             
              let groupedByProcurementMethod = groupBy(
                removeDuplicates(data.map((element)=>element),'procurementReferenceNumber'),
                'procurementMethod'
                )
              let groupdeByProcurementType = groupBy(
                removeDuplicates(data.map((element)=>element),'procurementReferenceNumber'),
                'procurementType'
                )
             
              let disposalsByMethod = getObjectTotal(groupedByProcurementMethod)
              let disposalsByType = getObjectTotal(groupdeByProcurementType)           

              disposalsByType.map(element=>element).forEach(element => {
                nameOfType.push(capitalizeFirstLetter(element.procurementMethod))
                numberOfDisposals.push(element.numberOfDisposals)
              }); 

              let nameOfTypeReservePrice = []
              sortArrayByNumber(disposalsByType.map(element=>element),'totalReservePrice')
              .forEach(element => {
                nameOfTypeReservePrice.push(capitalizeFirstLetter(element.procurementMethod))
                reservePrice.push(element?.totalReservePrice)
              });
              
              this.initReservePriceForProcurementTypes([
                {
                  name:'Reserve Price',
                  data: reservePrice
                }
              ],nameOfTypeReservePrice)

              this.initCharts(numberOfDisposals,nameOfType)
             
            }else{
              this.initCharts([],[])
              this.initReservePriceForProcurementTypes([],[])  
              this.topTenHighestContracts = []          
            }
            break;
          
          }
         
          this.isLoadingDisposals = false
        },
      (error) => {        
        this.initCharts([],[])
        this.initReservePriceForProcurementTypes([],[])  
        this.isLoadingDisposals = false
        console.log(error)
        throw error
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

 
  initCharts(series?, categories?){
    this.chartOptions = initRadialChart(
      series,
      categories,
      'Number of Disposals By Procurement Type'
      )
  }

  initReservePriceForProcurementTypes(series?, categories?){
    this.chartOptionsReservePriceByProcurementType = initColumnChart2(
      series,
      categories,
      'Reserve Price of Disposals By Procurement Type',
      'Reserve Price(UGX)',
      'Procurement Types'
      )
  }

}
