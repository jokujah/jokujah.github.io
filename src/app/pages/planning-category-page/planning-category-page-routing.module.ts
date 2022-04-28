import { PlanningCategoryPageComponent } from './planning-category-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:PlanningCategoryPageComponent,
    children:[
      {
        path: 'reports-list',
        loadChildren: () => import('./../../features/planing-category/components/reports-list/reports-list.module').then((m) => m.ReportsListModule),
        
      },
      {
        path: '',
        redirectTo: 'reports-list',
        pathMatch: 'full',
      },
      {
        path: 'planing-and-forecasting-report',
        loadChildren: () => import('./../../features/planing-category/components/planing-and-forecasting-report/planing-and-forecasting-report.module').then((m) => m.PlaningAndForecastingReportModule),
        
      },
      
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningCategoryPageRoutingModule { }
