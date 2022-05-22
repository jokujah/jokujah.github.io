import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueSourcesCategoryPageComponent } from './revenue-sources-category-page.component';
import { RevenueSourcesReportsListComponent } from './revenue-sources-reports-list/revenue-sources-reports-list.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RevenueVisualsComponent } from './revenue-report/revenue-visuals/revenue-visuals.component';



@NgModule({
  declarations: [
    RevenueSourcesCategoryPageComponent,
    RevenueSourcesReportsListComponent,
    RevenueReportComponent,
    RevenueVisualsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class RevenueSourcesCategoryPageModule { }
