import { UtilsService } from './../../services/Utils/utils.service';
import  PDE  from 'src/assets/PDE.json';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { consoleLogger, getFinancialYears } from 'src/app/utils/helpers';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  financialYears:any[]=[]
  pde:any[]=[]
  // financialYears = getFinancialYears()
  // pde = PDE.sort(function(a, b) {
  //   const nameA = a?.PDE.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b?.PDE.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // })

  // selectedPDE
  // selectedFinancialYear

  @Output() filterEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<string>();
  isLoading: boolean;
  allPDEs: any;
  allPDEDepartments: any;
  allFinancialYears: any;

  filterControlName:any;

  submit(form: FormGroup) {
    console.log("Filter",form)
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    console.log("Filter Data",data)

    this.filterEvent.emit(data);    
  }

  reset() {
    let data: any = {
      'selectedPDE': '',
      'selectedFinancialYear': this.financialYears[0].financial_year,
    }
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0].financial_year);
    this.resetEvent.emit(data);   
  }

 

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');

  constructor(
    fb: FormBuilder,
    private _utilsService: UtilsService,
    private toastr : ToastrService,
  ) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
   }

  ngOnInit(): void {
    var roles = localStorage.getItem('roles')
    roles = localStorage.getItem('email') == 'admin@mail.com'?'super-admin':'pde-admin'

    var checkIfPdeOrDept = (roles == 'super-admin') ? 'pde' : 'dept'
    if(checkIfPdeOrDept == 'pde'){
      this.filterControlName = "Procuring and Disposal Entities"
      this.getUtiities('pde-entities')
    }else {
      this.filterControlName = "Departments"
      this.getUtiities('pde-departments')
    }
    this.getUtiities('financial-years')

    this.submit(this.options)
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  getUtiities(utilityName){
    this.isLoading = true;
    this._utilsService.getUtil(utilityName).subscribe(
      (response )=>{
        console.log(response)
        switch(utilityName){
          case  'pde-entities':
            this.pde = response.data
          break
          case  'pde-departments':
            this.pde = response.data
          break
          case  'financial-years':
            this.financialYears = response.data
          break
        }
         
         this.isLoading = false;
        },
      (error) => {
         this.isLoading = false;
        this.toastr.error("Something Went Wrong", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
      }
    )
  }
}
