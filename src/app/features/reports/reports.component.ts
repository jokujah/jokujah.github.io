import { Download } from './../../utils/download';
import { saveAs } from 'file-saver';
import  PDE  from 'src/assets/PDE.json';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';
import { getFinancialYears, slowLoader, } from 'src/app/utils/helpers';
import { DOCUMENT } from '@angular/common';
import { DownloadService } from 'src/app/services/Download/download.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {


  @Input() 
  reportName:string = ''

  fullReportName = this.getFullReportName(this.reportName)

  isLoading:boolean = false 
  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl([0]);
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

  searchedPDE = [];

  download$: Observable<Download>

  selectedFinancialYear;
  selectedPDE
  
  

  constructor(
    private downloadService: DownloadService,
    @Inject(DOCUMENT) private document: Document,
    fb: FormBuilder,
    private toastr : ToastrService,
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

  // download(fileName,filePath,pde) {
  //   this.download$ = this.downloadService.download(fileName,filePath,pde,this.selectedFinancialYear)
  // }



  async submit(data) {
      this.isLoading = true
      await slowLoader()

      console.log("Data in report",data)

      this.selectedFinancialYear = data?.selectedFinancialYear
      this.selectedPDE = data?.selectedPDE

      if(this.selectedPDE !=''){
        this.searchedPDE.push(this.selectedPDE)
      }else{
        this.searchedPDE = []
      }
      

      // this.searchedPDE = this.pde.filter(function(element) {
      //   return element.PDE.toLowerCase().indexOf(data?.selectedPDE.toLowerCase()) !== -1
      // });


      this.isLoading = false      
  }
  
  async reset(data){
    this.isLoading = true
    await slowLoader()
    this.options.get('pde')?.setValue(data?.selectedPDE);
    this.options.get('financialYear')?.setValue(data?.selectedFinancialYear);
    this.searchedPDE = []
    this.isLoading = false
  }  

  getFullReportName(reportName){
    var value
    switch(reportName){
      case 'forecast' :
        value = 'Plan and Forecasting Report'
      break;
      case 'post-qualification' :
        value = 'Due Deligence Report'
      break;
      case 'admin-review' :
        value = 'Administrative Review Report'
      break;
      case 'awarded-contracts' :
        value = 'Awarded Contracts Report'
      break;
      case 'number-value-by-entity' :
        value = 'PDE Average Contract Value Report'
      break;
      case 'number-value-by-procurement-method' :
        value = 'Procurement Method Average Contract Value Report'
      break;
      case 'procurement' :
        value = 'Procurement Report'
      break;
      case 'signed-contracts' :
        value = 'Signed Contracts Report'
      break;
      case 'cancelled' :
        value = 'Cancelled Tender Report'
      break;
      case 'completed' :
        value = 'Completed Contracts Report'
      break;
      case 'framework-contracts' :
        value = 'Framework Report'
      break;
      case 'terminated-contracts' :
        value = 'Terminated Contracts'
      break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      // case 'forecasting' :
      //   value = 'Plan and Forecasting Report'
      // break;
      default:
          value=''

    }
    return value
  }

}


