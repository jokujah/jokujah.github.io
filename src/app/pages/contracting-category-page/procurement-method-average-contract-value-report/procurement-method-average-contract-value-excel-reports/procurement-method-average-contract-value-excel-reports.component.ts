import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import PDE from 'src/assets/PDE.json'

@Component({
  selector: 'app-procurement-method-average-contract-value-excel-reports',
  templateUrl: './procurement-method-average-contract-value-excel-reports.component.html',
  styleUrls: ['./procurement-method-average-contract-value-excel-reports.component.scss']
})
export class ProcurementMethodAverageContractValueExcelReportsComponent implements OnInit {

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
