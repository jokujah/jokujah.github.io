import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

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
  

  pageForm!: FormGroup;

  constructor(
    fb: FormBuilder
  ) { 
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    console.log(data)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
  }

  getFontSize() {
    return Math.max(10, 12);
  }

}
