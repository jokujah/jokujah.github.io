import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierPortalCategoryPageComponent } from './supplier-portal-category-page.component';
import { SupplierPortalReportsListComponent } from './supplier-portal-reports-list/supplier-portal-reports-list.component';
import { SuspendedProvidersReportComponent } from './suspended-providers-report/suspended-providers-report.component';



@NgModule({
  declarations: [
    SupplierPortalCategoryPageComponent,
    SupplierPortalReportsListComponent,
    SuspendedProvidersReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupplierPortalCategoryPageModule { }
