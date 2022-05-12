import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import PDE from 'src/assets/PDE.json'
import { saveAs } from 'file-saver';
import { getFinancialYears,addArrayValues, slowLoader } from 'src/app/utils/helpers';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  isLoading:boolean = false 
  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;

  options: FormGroup;
  pdeControl = new FormControl();
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
    return 0;
  })

  searchedPDE;

  financialYears = getFinancialYears()
  

  constructor(
    fb: FormBuilder,
    private toastr : ToastrService,
    private _planingCategoryService: PlaningAndForecastingReportService) { 
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
  }

  ngOnInit(): void {}

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
    this.isLoading = true;
    this._planingCategoryService.downloadReport(filePath,pde).subscribe(
      (blob )=>{ 
         console.log(blob)
         saveAs(blob, fileName)
         this.isLoading = false;
        },
      (error) => {
         this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
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
