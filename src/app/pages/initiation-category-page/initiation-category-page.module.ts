import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiationCategoryPageComponent } from './initiation-category-page.component';
import { InitiationReportsListComponent } from './initiation-reports-list/initiation-reports-list.component';
import { LateInitiationReportComponent } from './late-initiation-report/late-initiation-report.component';



@NgModule({
  declarations: [
    InitiationCategoryPageComponent,
    InitiationReportsListComponent,
    LateInitiationReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InitiationCategoryPageModule { }
