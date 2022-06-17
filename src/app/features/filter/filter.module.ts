import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteModule } from '@angular/material/autocomplete'

import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectSearchModule } from 'src/app/shared/mat-select-search/mat-select-search.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSelectSearchModule,
    MatIconModule,
  ],
  exports:[
    FilterComponent
  ]
})
export class FilterModule { }
