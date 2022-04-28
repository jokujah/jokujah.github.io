import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCategoryPageComponent } from './evaluation-category-page.component';

const routes: Routes = [
  {
    path:'',
    component:EvaluationCategoryPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationCategoryPageRoutingModule { }
