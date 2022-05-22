import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierPortalCategoryPageComponent } from './supplier-portal-category-page.component';
import { SupplierPortalReportsListComponent } from './supplier-portal-reports-list/supplier-portal-reports-list.component';
import { SuspendedProvidersReportComponent } from './suspended-providers-report/suspended-providers-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuspendedProvidersVisualsComponent } from './suspended-providers-report/suspended-providers-visuals/suspended-providers-visuals.component';



@NgModule({
  declarations: [
    SupplierPortalCategoryPageComponent,
    SupplierPortalReportsListComponent,
    SuspendedProvidersReportComponent,
    SuspendedProvidersVisualsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class SupplierPortalCategoryPageModule { }
