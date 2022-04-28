import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractingCategoryPageRoutingModule } from './contracting-category-page-routing.module';
import { ContractingCategoryPageComponent } from './contracting-category-page.component';


@NgModule({
  declarations: [
    ContractingCategoryPageComponent
  ],
  imports: [
    CommonModule,
    ContractingCategoryPageRoutingModule
  ]
})
export class ContractingCategoryPageModule { }
