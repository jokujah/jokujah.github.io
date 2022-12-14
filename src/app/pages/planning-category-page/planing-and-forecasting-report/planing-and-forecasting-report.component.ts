import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';

@Component({
  selector: 'app-planing-and-forecasting-report',
  templateUrl: './planing-and-forecasting-report.component.html',
  styleUrls: ['./planing-and-forecasting-report.component.scss']
})
export class PlaningAndForecastingReportComponent implements OnInit {

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  isLoading:boolean = false

  //number_of_plans
  //estimated_amount
  // number_of_plans_2019_2020
  // estimated_amount_2019_2020
  // number_of_plans_2018_2019
  // estimated_amount_2018_2019


  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;




  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService
  ) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    //this.getSummaryStats('plan-summary',this.financialYears[0],'')
   }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.getSummaryStats('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
  }


  getSummaryStats(reportName,financialYear,procuringEntity){
    this._planingCategoryService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{
        this.isLoading = true
        let data = response.data
        let  x = []
        let  y = []
        let  x1 = []
        let  y1= []
        let  x2 = []
        let  y2 = []

        data.forEach(element => {
          if (element.financial_year == financialYear)
          {
            x.push(element?.number_of_plans)
            let e = element?.estimated_amount.split(',')
            y.push(parseInt(e.join('')))
          }
        });
          this.totalValueofPlannedContracts = this.addArrayValues(x)
          this.numberOfPlannedContracts = this.addArrayValues(y)
          this.yearOfPlannedContracts = financialYear
          this.isLoading = false
        },
      (error) => {;
        this.isLoading = false
        console.log('Error ', error)
      }
    )
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  addArrayValues(data) {
    const initialValue = 0;
    const sumWithInitial = data.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );

    return sumWithInitial
  }

}
