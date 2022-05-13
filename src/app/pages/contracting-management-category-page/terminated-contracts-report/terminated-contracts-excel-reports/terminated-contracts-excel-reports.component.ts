import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { getsortedPDEList, getFinancialYears, slowLoader } from 'src/app/utils/helpers';
import PDE from 'src/assets/PDE.json'

@Component({
  selector: 'app-terminated-contracts-excel-reports',
  templateUrl: './terminated-contracts-excel-reports.component.html',
  styleUrls: ['./terminated-contracts-excel-reports.component.scss']
})
export class TerminatedContractsExcelReportsComponent implements OnInit {

  isLoading:boolean = false 

  options: FormGroup;
  pdeControl = new FormControl('');
  
  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  searchedPDE
financialYearControl = new FormControl(this.financialYears[0]);

  

  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService,
    private toastr: ToastrService
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

  download(fileName,filePath,pde){
    this.isLoading = true
    this._planingCategoryService.downloadReport2(filePath,this.financialYearControl.value,pde).subscribe(
      (blob )=>{ 
        this.isLoading = false
         console.log(blob)
         saveAs(blob, fileName)
        },
      (error) => {
        this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        this.isLoading = false
        console.log(error)
      }
    )
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

  async reset(){
    this.isLoading = true
    await slowLoader()
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.searchedPDE = []
    this.isLoading = false
  }

}
