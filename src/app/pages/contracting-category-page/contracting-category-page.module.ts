import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractingCategoryPageComponent } from './contracting-category-page.component';
import { SignedContractsReportComponent } from './signed-contracts-report/signed-contracts-report.component';
import { AwardedContractReportComponent } from './awarded-contract-report/awarded-contract-report.component';
import { ProcurementMethodAverageContractValueReportComponent } from './procurement-method-average-contract-value-report/procurement-method-average-contract-value-report.component';
import { AwardedContractVisualsComponent } from './awarded-contract-report/awarded-contract-visuals/awarded-contract-visuals.component';
import { SignedContractsVisualsComponent } from './signed-contracts-report/signed-contracts-visuals/signed-contracts-visuals.component';
import { ProcurementMethodAverageContractValueVisualsComponent } from './procurement-method-average-contract-value-report/procurement-method-average-contract-value-visuals/procurement-method-average-contract-value-visuals.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { ContractingReportsListComponent } from './contracting-reports-list/contracting-reports-list.component';
import { ProcurementReportComponent } from './procurement-report/procurement-report.component';
import { AdministrativeReviewReportComponent } from './administrative-review-report/administrative-review-report.component';
import { AdministrativeReviewVisualsComponent } from './administrative-review-report/administrative-review-visuals/administrative-review-visuals.component';
import { PdeAverageContractValueVisualsComponent } from './pde-average-contract-value-report/pde-average-contract-value-visuals/pde-average-contract-value-visuals.component';
import { PdeAverageContractValueReportComponent } from './pde-average-contract-value-report/pde-average-contract-value-report.component';
import { ProcurementReportVisualsComponent } from './procurement-report/procurement-report-visuals/procurement-report-visuals.component';
import { MicroProcurementReportComponent } from './micro-procurement-report/micro-procurement-report.component';

@NgModule({
  declarations: [
    ContractingCategoryPageComponent,
    ContractingReportsListComponent,
    SignedContractsReportComponent,
    ProcurementReportComponent,
    AdministrativeReviewReportComponent,
    AwardedContractReportComponent,
    ProcurementMethodAverageContractValueReportComponent,
    AdministrativeReviewVisualsComponent,
    AwardedContractVisualsComponent,
    ProcurementReportVisualsComponent,
    SignedContractsVisualsComponent,
    PdeAverageContractValueReportComponent,
    PdeAverageContractValueVisualsComponent,
    ProcurementMethodAverageContractValueVisualsComponent,
    ContractingCategoryPageComponent,
    MicroProcurementReportComponent,
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
export class ContractingCategoryPageModule { }
