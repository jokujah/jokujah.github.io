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
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {


  @Input() 
  reportName:string = ''

  fullReportName 

  downloadData:any
  role
  

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

  subscription: Subscription
  filterControlName: string;
  
  

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

    var roles = localStorage.getItem('roles')
    roles = localStorage.getItem('email') == 'admin@mail.com'?'super-admin':'pde-admin'
    
    //this.role = (roles == 'super-admin') ? 'Procuring and Disposal Entities' : 'Departments'

    var checkIfPdeOrDept = (roles == 'super-admin') ? 'pde' : 'dept'

    if(checkIfPdeOrDept == 'pde'){
      this.filterControlName = "Procuring and Disposal Entities"
      
    }else{
      this.filterControlName = "Departments"
    }
  }

  ngOnInit(): void {
    this.fullReportName = this.createfullReportName(this.reportName)
  }

  getFontSize() {
    return Math.max(10, 12);
  }


  // download(fileName,filePath,pde){

  //   this.isLoading = true;
  //   this._planingCategoryService.downloadReport(filePath,pde).subscribe(
  //     (blob )=>{ 
  //        console.log(blob)
  //        saveAs(blob, fileName)
  //        this.isLoading = false;
  //       },
  //     (error) => {
  //        this.isLoading = false;
  //       this.toastr.error("Something Went Wrong", '', {
  //         progressBar: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       console.log(error)
  //     }
  //   )
  // }

  download(fileName,filePath,pde) {   
    //this.download$ = this.downloadService.download(fileName,filePath,pde,this.selectedFinancialYear)
    pde = (pde === (`All ${this.filterControlName}`))?'':pde
    var financialYear = (this.selectedFinancialYear == 'All Financial Years')?'':this.selectedFinancialYear
    this.downloadService.download(fileName,filePath,pde,financialYear).subscribe(
      (response)=>{
        this.downloadData = response
      }
    )
  }



  async submit(data) {
    console.log("Report Page", data)
      this.isLoading = true
      this.downloadData = null
      this.searchedPDE = []
      await slowLoader()
      this.selectedFinancialYear = (data?.selectedFinancialYear=='')?('All Financial Years'):data?.selectedFinancialYear
      this.selectedPDE = data?.selectedPDE

      if(this.selectedPDE !=''){
        this.searchedPDE.push(this.selectedPDE)
      }
      // else{
      //   this.searchedPDE = []
      // }
      if(this.selectedPDE ==''){
        this.searchedPDE.push(`All ${this.filterControlName}`)
      }
      this.isLoading = false      
  }
  
  async reset(data){
    this.isLoading = true
    this.downloadData = null
    await slowLoader()
    this.options.get('pde')?.setValue(data?.selectedPDE);
    this.options.get('financialYear')?.setValue(data?.selectedFinancialYear);
    this.searchedPDE = [] 
    this.isLoading = false
  }  

  createfullReportName(reportURLName){
    var value
    console.log(reportURLName)
    switch(reportURLName){
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
      case 'procurements' :
        value = 'Procurement Report'
      break;
      case 'signed-contracts' :
        value = 'Signed Contracts Report'
      break;

      case 'cancelled-tenders' :
        value = 'Cancelled Tender Report'
      break;
      case 'completed-contracts' :
        value = 'Completed Contracts Report'
      break;
      case 'framework-contracts' :
        value = 'Framework Report'
      break;
      case 'terminated-contracts' :
        value = 'Terminated Contracts'
      break;

      // Error here
      case 'awarded-contracts-list-by-method' :
        value = 'Plan and Forecasting Report'
      break;

      case 'micro-procurements' :
        value = 'Micro Procurements Report'
      break;
      // case 'completed-contracts' :
      //   value = 'Completed Contracts Report'
      break;
      case 'cancelled-tenders' :
        value = 'Cancelled Tenders Report'
      break;
      case 'completed-contracts-on-time' :
        value = 'Completed Contracts On Time Report'
      break;
      case 'awarded-to-suspended-providers' :
        value = 'Procurements Awarded to Suspended Providers Report'
      break;
      case 'provider-performance' :
        value = 'Provider Performance Report'
      break;
      case 'contract-management' :
        value = 'Contract Management Report'
      break;
      case 'actual-vs-planned-procurements' :
        value = 'Actual Vs Planned Procurement Report'
      break;
      case 'disposals' :
        value = 'Disposals Report'
      break;
      case 'late-initiations' :
        value = 'Late Initiations Report'
      break;
      case 'suspended-providers' :
        value = 'Suspended Providers Report'
      break;
      case 'average-bids-by-entity-method' :
        value = 'PDE Bid Average Report'
      break;
      default:
          value=''
    }   
    
    return value
  }

}


