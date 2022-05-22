import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisposalCategoryPageComponent } from './disposal-category-page.component';
import { DisposalReportComponent } from './disposal-report/disposal-report.component';
import { DisposalReportsListComponent } from './disposal-reports-list/disposal-reports-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisposalVisualsComponent } from './disposal-report/disposal-visuals/disposal-visuals.component';



@NgModule({
  declarations: [
    DisposalCategoryPageComponent,
    DisposalReportComponent,
    DisposalReportsListComponent,
    DisposalVisualsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class DisposalCategoryPageModule { }
