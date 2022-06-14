import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatSelectSearchModule } from 'src/app/shared/mat-select-search/mat-select-search.module';




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
    MatSelectSearchModule
  ],
  exports:[
    FilterComponent
  ]
})
export class FilterModule { }
