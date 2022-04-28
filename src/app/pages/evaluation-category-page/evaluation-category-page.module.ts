import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationCategoryPageRoutingModule } from './evaluation-category-page-routing.module';
import { EvaluationCategoryPageComponent } from './evaluation-category-page.component';


@NgModule({
  declarations: [
    EvaluationCategoryPageComponent
  ],
  imports: [
    CommonModule,
    EvaluationCategoryPageRoutingModule
  ]
})
export class EvaluationCategoryPageModule { }
