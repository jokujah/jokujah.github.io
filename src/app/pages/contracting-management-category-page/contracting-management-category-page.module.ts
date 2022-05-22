import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ContractingManagementCategoryPageRoutingModule } from './contracting-management-category-page-routing.module';
import { ContractingManagementCategoryPageComponent } from './contracting-management-category-page.component';
import { ContractManagementReportsListComponent } from './contract-management-reports-list/contract-management-reports-list.component';
import { FrameWorkReportComponent } from './frame-work-report/frame-work-report.component';
import { CompletedContractsReportComponent } from './completed-contracts-report/completed-contracts-report.component';
import { CancelledTenderReportComponent } from './cancelled-tender-report/cancelled-tender-report.component';
import { TerminatedContractsReportComponent } from './terminated-contracts-report/terminated-contracts-report.component';
import { CancelledTenderVisualsComponent } from './cancelled-tender-report/cancelled-tender-visuals/cancelled-tender-visuals.component';
import { CompletedContractsVisualsComponent } from './completed-contracts-report/completed-contracts-visuals/completed-contracts-visuals.component';
import { FrameWorkVisualsComponent } from './frame-work-report/frame-work-visuals/frame-work-visuals.component';
import { TerminatedContractsVisualsComponent } from './terminated-contracts-report/terminated-contracts-visuals/terminated-contracts-visuals.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { ProviderPerformanceReportComponent } from './provider-performance-report/provider-performance-report.component';
import { ActualVsPlannedProcurementReportComponent } from './actual-vs-planned-procurement-report/actual-vs-planned-procurement-report.component';
import { ContractsCompletedOnTimeReportComponent } from './contracts-completed-on-time-report/contracts-completed-on-time-report.component';
import { ContractManagementReportComponent } from './contract-management-report/contract-management-report.component';
import { ActualVsPlannedProcurementVisualsComponent } from './actual-vs-planned-procurement-report/actual-vs-planned-procurement-visuals/actual-vs-planned-procurement-visuals.component';
import { ContractManagementVisualsComponent } from './contract-management-report/contract-management-visuals/contract-management-visuals.component';
import { ContractsCompletedOnTimeVisualsComponent } from './contracts-completed-on-time-report/contracts-completed-on-time-visuals/contracts-completed-on-time-visuals.component';
import { ProcurementsAwardedToSuspendedProvidersVisualsComponent } from './procurements-awarded-to-suspended-providers-report/procurements-awarded-to-suspended-providers-visuals/procurements-awarded-to-suspended-providers-visuals.component';
import { ProcurementsAwardedToSuspendedProvidersReportComponent } from './procurements-awarded-to-suspended-providers-report/procurements-awarded-to-suspended-providers-report.component';
import { ProviderPerformanceVisualsComponent } from './provider-performance-report/provider-performance-visuals/provider-performance-visuals.component';

@NgModule({
  declarations: [
    ContractingManagementCategoryPageComponent,
    ContractManagementReportsListComponent,
    FrameWorkReportComponent,
    CompletedContractsReportComponent,
    CancelledTenderReportComponent,
    TerminatedContractsReportComponent,
    CancelledTenderVisualsComponent,
    CompletedContractsVisualsComponent,
    FrameWorkVisualsComponent,
    TerminatedContractsVisualsComponent,
    ProviderPerformanceReportComponent,
    ActualVsPlannedProcurementReportComponent,
    ContractsCompletedOnTimeReportComponent,
    ContractManagementReportComponent,
    ActualVsPlannedProcurementVisualsComponent,
    ContractManagementVisualsComponent,
    ContractsCompletedOnTimeVisualsComponent,
    ProcurementsAwardedToSuspendedProvidersVisualsComponent,
    ProcurementsAwardedToSuspendedProvidersReportComponent,
    ProviderPerformanceVisualsComponent,
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
export class ContractingManagementCategoryPageModule { }
