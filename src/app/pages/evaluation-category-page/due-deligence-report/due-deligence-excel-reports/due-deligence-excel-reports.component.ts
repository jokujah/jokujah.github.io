import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { addArrayValues, getFinancialYears, getsortedPDEList, slowLoader } from 'src/app/utils/helpers';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-due-deligence-excel-reports',
  templateUrl: './due-deligence-excel-reports.component.html',
  styleUrls: ['./due-deligence-excel-reports.component.scss']
})
export class DueDeligenceExcelReportsComponent implements OnInit {

  isLoading:boolean = false 
  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;
  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  searchedPDE;
  options: FormGroup;
  pdeControl = new FormControl();
  financialYearControl = new FormControl(this.financialYears[0]);
  
 

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
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

  async submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.isLoading = true
    await slowLoader()

    this.searchedPDE = this.pde.filter(function(element) {
      return element.PDE.toLowerCase().indexOf(form.controls.pde.value.toLowerCase()) !== -1
    });

    this.isLoading = false
    
  }

  download(fileName,filePath,pde){
    this.isLoading = true
    var financialYear = this.financialYearControl.value
    console.log(financialYear)
    this._planingCategoryService.downloadReport2(filePath,financialYear,pde).subscribe(
      (blob )=>{ 
        
         console.log(blob)
         saveAs(blob, fileName)
         this.isLoading = false
        },
      (error) => {
        this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        console.log(error)
      }
    )
  }


  async reset(){
    this.isLoading = true
    await slowLoader()
    this.options.get('pde')?.setValue(null);
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.searchedPDE = []
    this.isLoading = false
  }

 

}
