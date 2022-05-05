import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';
import PDE from 'src/assets/PDE.json'

@Component({
  selector: 'app-due-deligence-excel-reports',
  templateUrl: './due-deligence-excel-reports.component.html',
  styleUrls: ['./due-deligence-excel-reports.component.scss']
})
export class DueDeligenceExcelReportsComponent implements OnInit {

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  pde = getsortedPDEList()
  financialYears = getFinancialYears()

  constructor(fb: FormBuilder) { 
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
  }

  getFontSize() {
    return Math.max(10, 12);
  }

}
