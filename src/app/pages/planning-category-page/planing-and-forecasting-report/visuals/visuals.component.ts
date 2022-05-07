import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';
import { ChartType} from 'angular-google-charts';


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],
  
})
export class VisualsComponent implements OnInit {

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');


  myType = ChartType.BarChart
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];
  
  chartColumns = ['City', 'Inhabitants'];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
    
  }

  ngOnInit(): void {}

  getFontSize() {
    return Math.max(10, 12);
  }
}


