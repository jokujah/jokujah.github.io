import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractingManagementCategoryPageRoutingModule } from './contracting-management-category-page-routing.module';
import { ContractingManagementCategoryPageComponent } from './contracting-management-category-page.component';


@NgModule({
  declarations: [
    ContractingManagementCategoryPageComponent
  ],
  imports: [
    CommonModule,
    ContractingManagementCategoryPageRoutingModule
  ]
})
export class ContractingManagementCategoryPageModule { }
