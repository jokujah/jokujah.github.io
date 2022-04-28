import { DashboardComponent } from './dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path:'',
    component:DashboardComponent,
    children: [
      {
        path: 'planing',
        loadChildren: () => import('./../../pages/planning-category-page/planning-category-page.module').then((m) => m.PlanningCategoryPageModule),
       
      },
      {
        path: '',
        redirectTo: 'planing',
        pathMatch: 'full',
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./../../pages/evaluation-category-page/evaluation-category-page.module').then((m) => m.EvaluationCategoryPageModule),
       
      },
      {
        path: 'contracting',
        loadChildren: () => import('./../../pages/contracting-category-page/contracting-category-page.module').then((m) => m.ContractingCategoryPageModule),
        
      },
      {
        path: 'contract-management',
        loadChildren: () => import('./../../pages/contracting-management-category-page/contracting-management-category-page.module').then((m) => m.ContractingManagementCategoryPageModule),
       
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
