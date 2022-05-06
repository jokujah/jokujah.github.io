import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import PDE from 'src/assets/PDE.json'

@Component({
  selector: 'app-signed-contracts-excel-reports',
  templateUrl: './signed-contracts-excel-reports.component.html',
  styleUrls: ['./signed-contracts-excel-reports.component.scss']
})
export class SignedContractsExcelReportsComponent implements OnInit {

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  pde = PDE

  constructor(fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService) { 
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

  download(fileName,filePath){
    this._planingCategoryService.downloadReport(filePath,'').subscribe(
      (blob )=>{ 
         console.log(blob)
         saveAs(blob, fileName)
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
function saveAs(blob: Blob, fileName: any) {
  throw new Error('Function not implemented.');
}

