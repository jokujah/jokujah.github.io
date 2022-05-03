import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationCategoryPageComponent } from './evaluation-category-page.component';
import { EvaluationReportsListComponent } from './evaluation-reports-list/evaluation-reports-list.component';
import { DueDeligenceVisualsComponent } from './due-deligence-report/due-deligence-visuals/due-deligence-visuals.component';
import { DueDeligenceExcelReportsComponent } from './due-deligence-report/due-deligence-excel-reports/due-deligence-excel-reports.component';
import { RouterModule } from '@angular/router';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { DueDeligenceReportComponent } from './due-deligence-report/due-deligence-report.component';


@NgModule({
  declarations: [
    EvaluationCategoryPageComponent,
    EvaluationReportsListComponent,
    DueDeligenceReportComponent,
    DueDeligenceVisualsComponent,
    DueDeligenceExcelReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class EvaluationCategoryPageModule { }
