import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { MatOption } from '@angular/material/core';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from './../../services/Utils/utils.service';
import { getFinancialYears } from 'src/app/utils/helpers';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  financialYears: any[] = []
  pde: any[] = []

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

  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('');
  public bankMultiFilterCtrl= new FormControl();

  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) pdeAutoComplete: MatAutocompleteTrigger;

  constructor(
    private fb: FormBuilder,
    private _utilsService: UtilsService,
    private toastr : ToastrService,
  ) {}

  ngOnInit(): void {

    this.setUpFilterForm();

    let checkIfSuperAdmin = localStorage.getItem('isSuperAdmin');

    let roles = checkIfSuperAdmin ? 'super-admin' : 'pde-admin'

    let checkIfPdeOrDept = (roles == 'super-admin') ? 'pde' : 'dept'

    if(checkIfPdeOrDept == 'pde'){
      this.filterControlName = "Search for Procuring and Disposal Entities"
      this.pdeControl.valueChanges.pipe(
        startWith(''),
        switchMap((value) => {
          return this._utilsService.getUtil('pde-entities', value)
        }
        ),
      ).subscribe((response) => {
        this.isSearching = true
        this.pde = response.data;
        this.isSearching = false;
      });
    } else {
      this.filterControlName = "Select Department"
      this.pdeControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => this._utilsService.getUtil('pde-departments',value)),
      ).subscribe((response) => {
        this.isSearching = true
        this.pde = response.data;
        this.isSearching = false
      });
    }

    //make it local storage
    this.getUtiities('financial-years','')

    this.submit(this.options)
  }

  setUpFilterForm(): void {
    this.options = this.fb.group({
      financialYear: this.financialYearControl,
      pde: this.pdeControl
    });
  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    this.selectedPDE = form.controls.pde.value
    this.selectedFinancialYear = form.controls.financialYear.value

    this.filterEvent.emit(data);
  }

  reset() {
    let data: any = {
      'selectedPDE': '',
      'selectedFinancialYear': '',
    }
    
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue('');
    this.selectedPDE = ''
    this.selectedFinancialYear = ''
    this.resetEvent.emit(data);
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  getUtiities(utilityName,q){
    this.isLoading = true;
    this._utilsService.getUtil(utilityName, q).subscribe(
      (response ) => {
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
         console.log('Error ', error);
      }
    )
  }

  onClearSearchField(event: any) {
    this.options.get('pde').setValue('');
    this.pdeAutoComplete.openPanel();
    event.stopPropagation();
  }

  onSelectPde(option: MatOption) {
    this.selectedPDE = option.value;
  }

  get pdeName() {
    return this.options.get('pde').value;
  }
}
