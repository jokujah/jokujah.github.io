import { UtilsService } from './../../services/Utils/utils.service';
import  PDE  from 'src/assets/PDE.json';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getFinancialYears } from 'src/app/utils/helpers';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  
  financialYears:any[]=[]
  pde:any[]=[]

  
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  @Output() filterEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<string>();
  isLoading: boolean;
  allPDEs: any;
  allPDEDepartments: any;
  allFinancialYears: any;

  selectedPDE: any;
  selectedFinancialYear: any;
  

  filterControlName:any;
  isSearching: boolean;

  submit(form: FormGroup) {
    console.log("Filter",form)
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.selectedPDE = form.controls.pde.value
    this.selectedFinancialYear = form.controls.financialYear.value

    console.log("Filter Data",data)

    this.filterEvent.emit(data);    
  }

  reset() {
    let data: any = {
      'selectedPDE': '',
      'selectedFinancialYear': '',
    }
    this.options.get('pde')?.setValue('');
    // this.options.get('financialYear')?.setValue(this.financialYears[0]?.financial_year);
    this.options.get('financialYear')?.setValue('');
    this.selectedPDE = ''
    this.selectedFinancialYear = ''
    this.resetEvent.emit(data);   
  }

 

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');
  toppingsControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private _utilsService: UtilsService,
    private toastr : ToastrService,
  ) {}

  ngOnInit(): void {
    var roles = localStorage.getItem('roles')
    roles = localStorage.getItem('email') == 'admin@mail.com'?'super-admin':'pde-admin'
    var checkIfPdeOrDept = (roles == 'super-admin') ? 'pde' : 'dept'

    if(checkIfPdeOrDept == 'pde'){
      this.filterControlName = "Procuring and Disposal Entities"
      this.pdeControl.valueChanges.pipe(
        startWith(''),
        switchMap((value) => {
          // if (value === '') {
          //   return this._utilsService.getUtil('pde-entities', value)
          // }
          console.log(value)
          return this._utilsService.getUtil('pde-entities', value)
        }
        ),
      ).subscribe((response) => {       
        this.isSearching = true
        this.pde = response.data;
        this.isSearching = false;
      });
    }else {
      this.filterControlName = "Departments"
      this.pdeControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => this._utilsService.getUtil('pde-departments',value)),
      ).subscribe((response) => {       
        this.isSearching = true
        this.pde = response.data;
        this.isSearching = false       
      });
    }
    this.getUtiities('financial-years','')

    this.options = this.fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl,
      toppings:this.toppingsControl
    });
    this.submit(this.options)
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  getUtiities(utilityName,q){
    this.isLoading = true;
    this._utilsService.getUtil(utilityName,q).subscribe(
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
            //this.financialYearControl.setValue(this.financialYears[0]?.financial_year)
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
