import { PlaningAndForecastingReportService } from './../../../../services/PlaningCategory/planing-and-forecasting-report.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import PDE from 'src/assets/PDE.json'
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  pde = PDE.sort(function(a, b) {
    const nameA = a?.PDE.toUpperCase(); // ignore upper and lowercase
    const nameB = b?.PDE.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  })
  

  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService) { 
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {
    console.log(this.pde)
  }

  getFontSize() {
    return Math.max(10, 12);
  }



  download(){
    this._planingCategoryService.downloadReport('').subscribe(
      (resp) => {
        // this.isLoading = false;
        // this.toastr.success("Personal Profile Updated", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        // this.back()

        console.log(resp)
      },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        console.log(error)
      }
    )
  }

}
