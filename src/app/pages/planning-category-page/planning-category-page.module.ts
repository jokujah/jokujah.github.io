import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningCategoryPageRoutingModule } from './planning-category-page-routing.module';
import { PlanningCategoryPageComponent } from './planning-category-page.component';


@NgModule({
  declarations: [
    PlanningCategoryPageComponent
  ],
  imports: [
    CommonModule,
    PlanningCategoryPageRoutingModule
  ]
})
export class PlanningCategoryPageModule { }
