import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractingCategoryPageComponent } from './contracting-category-page.component';

const routes: Routes = [
  {
    path:'',
    component:ContractingCategoryPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractingCategoryPageRoutingModule { }
