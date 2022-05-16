import  PDE  from 'src/assets/PDE.json';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getFinancialYears } from 'src/app/utils/helpers';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  financialYears = getFinancialYears()
  pde = PDE.sort(function(a, b) {
    const nameA = a?.PDE.toUpperCase(); // ignore upper and lowercase
    const nameB = b?.PDE.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })

  @Output() filterEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<string>();

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.filterEvent.emit(data);    
  }

  reset() {
    let data: any = {
      'selectedPDE': '',
      'selectedFinancialYear': this.financialYears[0],
    }
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.resetEvent.emit(data);   
  }

 

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl(this.financialYears[0]);

  constructor(
    fb: FormBuilder,
  ) {
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
