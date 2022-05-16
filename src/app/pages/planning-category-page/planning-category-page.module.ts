import { PlaningReportsListComponent } from './planing-reports-list/planing-reports-list.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningCategoryPageComponent } from './planning-category-page.component';
import { VisualsComponent } from './planing-and-forecasting-report/visuals/visuals.component';
import { PlaningAndForecastingReportComponent } from './planing-and-forecasting-report/planing-and-forecasting-report.component';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PlanningCategoryPageComponent,    
    PlaningReportsListComponent,

    PlaningAndForecastingReportComponent,
    
    VisualsComponent,
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
    MatButtonModule,
    MatTooltipModule
  ]
})
export class PlanningCategoryPageModule { }
