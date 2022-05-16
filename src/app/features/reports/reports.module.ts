import { FilterModule } from './../filter/filter.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // MatFormFieldModule,
    // FormsModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // MatInputModule,
    // MatButtonModule,
    // MatTooltipModule,
    //FilterModule
  ],
  exports:[
    ReportsComponent
  ]
})
export class ReportsModule { }
