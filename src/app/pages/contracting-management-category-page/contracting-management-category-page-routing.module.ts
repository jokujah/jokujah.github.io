import { ContractingManagementCategoryPageComponent } from './contracting-management-category-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ContractingManagementCategoryPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractingManagementCategoryPageRoutingModule { }
