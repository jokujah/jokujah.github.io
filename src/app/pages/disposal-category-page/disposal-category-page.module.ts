import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisposalCategoryPageComponent } from './disposal-category-page.component';
import { DisposalReportComponent } from './disposal-report/disposal-report.component';
import { DisposalReportsListComponent } from './disposal-reports-list/disposal-reports-list.component';



@NgModule({
  declarations: [
    DisposalCategoryPageComponent,
    DisposalReportComponent,
    DisposalReportsListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DisposalCategoryPageModule { }
