import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractingManagementCategoryPageRoutingModule } from './contracting-management-category-page-routing.module';
import { ContractingManagementCategoryPageComponent } from './contracting-management-category-page.component';
import { ContractManagementReportsListComponent } from './contract-management-reports-list/contract-management-reports-list.component';
import { FrameWorkReportComponent } from './frame-work-report/frame-work-report.component';
import { CompletedContractsReportComponent } from './completed-contracts-report/completed-contracts-report.component';
import { CancelledTenderReportComponent } from './cancelled-tender-report/cancelled-tender-report.component';
import { TerminatedContractsReportComponent } from './terminated-contracts-report/terminated-contracts-report.component';
import { CancelledTenderVisualsComponent } from './cancelled-tender-report/cancelled-tender-visuals/cancelled-tender-visuals.component';
import { CancelledTenderExcelReportsComponent } from './cancelled-tender-report/cancelled-tender-excel-reports/cancelled-tender-excel-reports.component';
import { CompletedContractsVisualsComponent } from './completed-contracts-report/completed-contracts-visuals/completed-contracts-visuals.component';
import { CompletedContractsExcelReportsComponent } from './completed-contracts-report/completed-contracts-excel-reports/completed-contracts-excel-reports.component';
import { FrameWorkVisualsComponent } from './frame-work-report/frame-work-visuals/frame-work-visuals.component';
import { FrameWorkExcelReportsComponent } from './frame-work-report/frame-work-excel-reports/frame-work-excel-reports.component';
import { TerminatedContractsVisualsComponent } from './terminated-contracts-report/terminated-contracts-visuals/terminated-contracts-visuals.component';
import { TerminatedContractsExcelReportsComponent } from './terminated-contracts-report/terminated-contracts-excel-reports/terminated-contracts-excel-reports.component';


@NgModule({
  declarations: [
    ContractingManagementCategoryPageComponent,
    ContractManagementReportsListComponent,
    FrameWorkReportComponent,
    CompletedContractsReportComponent,
    CancelledTenderReportComponent,
    TerminatedContractsReportComponent,
    CancelledTenderVisualsComponent,
    CancelledTenderExcelReportsComponent,
    CompletedContractsVisualsComponent,
    CompletedContractsExcelReportsComponent,
    FrameWorkVisualsComponent,
    FrameWorkExcelReportsComponent,
    TerminatedContractsVisualsComponent,
    TerminatedContractsExcelReportsComponent
  ],
  imports: [
    CommonModule,
    ContractingManagementCategoryPageRoutingModule
  ]
})
export class ContractingManagementCategoryPageModule { }
