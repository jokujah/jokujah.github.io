import { Download } from './../../utils/download';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { slowLoader, } from 'src/app/utils/helpers';
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
  reportName:string 
  fullReportName 
  downloadData:any = null
  role
  isLoading:boolean = false 
  options: FormGroup;
  searchedPDE = [];
  download$: Observable<Download>
  selectedFinancialYear;
  selectedPDE
  subscription: Subscription
  filterControlName: string;
  isSuspendedProvidersReport: boolean ;
  
  

  constructor(
    private downloadService: DownloadService
  ) {
    var isSuperAdmin = localStorage.getItem('isSuperAdmin')
    var checkIfPdeOrDept = (isSuperAdmin == 'true') ? 'pde' : 'dept'

    if (checkIfPdeOrDept == 'pde') {
      this.filterControlName = "Procuring and Disposal Entities"
    } else {
      this.filterControlName = "Departments"
    }
  }

  ngOnInit(): void {
     console.log(this.reportName)
    if(this.reportName === 'suspended-providers'){
      this.isSuspendedProvidersReport = true
    }
    this.fullReportName = this.createfullReportName(this.reportName)
  }

  download(fileName,filePath,pde) {   
    //this.download$ = this.downloadService.download(fileName,filePath,pde,this.selectedFinancialYear)
    pde = (pde === (`All ${this.filterControlName}`))?'':pde
    var financialYear = (this.selectedFinancialYear == 'All Financial Years')?'':this.selectedFinancialYear
    this.downloadService.download(fileName,filePath,pde,financialYear).subscribe(
      (response)=>{
        this.downloadData = response
      },
      (error)=>{
        throw error
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
      if(this.selectedPDE ==''){
        if(this.reportName == 'suspended-providers'){
          this.searchedPDE.push(`All Suspended Providers`)
        }else{
          this.searchedPDE.push(`All ${this.filterControlName}`)
        }
      }
      this.isLoading = false      
  }
  
  async reset(data){
    this.isLoading = true
    this.downloadData = null
    this.searchedPDE = []
    await slowLoader()

    // this.options.get('pde')?.setValue(data?.selectedPDE);
    // this.options.get('financialYear')?.setValue(data?.selectedFinancialYear);

    this.selectedPDE = data?.selectedPDE
    this.selectedFinancialYear = 'All Financial Years'
    
    if(this.selectedPDE ==''){
      if(this.reportName == 'suspended-providers'){
        this.searchedPDE.push(`All Suspended Providers`)
      }else{
        this.searchedPDE.push(`All ${this.filterControlName}`)
      }
    }
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
        value = 'Due Diligence Report'
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
        value = 'Initiations Report'
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


