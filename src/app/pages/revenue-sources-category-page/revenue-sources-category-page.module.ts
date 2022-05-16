import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueSourcesCategoryPageComponent } from './revenue-sources-category-page.component';
import { RevenueSourcesReportsListComponent } from './revenue-sources-reports-list/revenue-sources-reports-list.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';



@NgModule({
  declarations: [
    RevenueSourcesCategoryPageComponent,
    RevenueSourcesReportsListComponent,
    RevenueReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RevenueSourcesCategoryPageModule { }
