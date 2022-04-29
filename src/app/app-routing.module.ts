import { PlaningReportsListComponent } from './pages/planning-category-page/planing-reports-list/planing-reports-list.component';
import { ContractingManagementCategoryPageComponent } from './pages/contracting-management-category-page/contracting-management-category-page.component';
import { PlanningCategoryPageComponent } from './pages/planning-category-page/planning-category-page.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCategoryPageComponent } from './pages/evaluation-category-page/evaluation-category-page.component';
import { ContractingCategoryPageComponent } from './pages/contracting-category-page/contracting-category-page.component';
import { PlaningAndForecastingReportComponent } from './pages/planning-category-page/planing-and-forecasting-report/planing-and-forecasting-report.component';
import { ReportsComponent } from './pages/planning-category-page/planing-and-forecasting-report/reports/reports.component';
import { VisualsComponent } from './pages/planning-category-page/planing-and-forecasting-report/visuals/visuals.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children:[
      {
        path: 'planing',
        component:PlanningCategoryPageComponent,
        children: [
          {
            path: 'planing-reports-list',
            component:PlaningReportsListComponent,
          },
          {
            path: '',
            redirectTo: 'planing-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'planing-and-forecasting-report',
            component:PlaningAndForecastingReportComponent,
            children: [
              {
                path: 'visuals',
                component:VisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportsComponent,
                
              },
            ]
          },
        ]
       
      },
      {
        path: '',
        redirectTo: 'planing',
        pathMatch: 'full',
      },
      {
        path: 'evaluation',
        component:EvaluationCategoryPageComponent,
       
      },
      {
        path: 'contracting',
        component:ContractingCategoryPageComponent,
        
      },
      {
        path: 'contract-management',
        component:ContractingManagementCategoryPageComponent,       
      },  

    ]
  },

  {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
  },
  // {
  //   path: 'error',
  //   loadChildren: () => import('./pages/error-page/error-page.module').then((m) => m.ErrorPageModule),
  // },
  // {
  //   path: 'not-found',
  //   loadChildren: () => import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
