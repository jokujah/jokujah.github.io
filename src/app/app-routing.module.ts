import { HomePageComponent } from './pages/home-page/home-page.component';
import { TerminatedContractsReportComponent } from './pages/contracting-management-category-page/terminated-contracts-report/terminated-contracts-report.component';
import { FrameWorkReportComponent } from './pages/contracting-management-category-page/frame-work-report/frame-work-report.component';
import { CompletedContractsReportComponent } from './pages/contracting-management-category-page/completed-contracts-report/completed-contracts-report.component';
import { CancelledTenderReportComponent } from './pages/contracting-management-category-page/cancelled-tender-report/cancelled-tender-report.component';
import { ContractManagementReportsListComponent } from './pages/contracting-management-category-page/contract-management-reports-list/contract-management-reports-list.component';
import { ProcurementMethodAverageContractValueVisualsComponent } from './pages/contracting-category-page/procurement-method-average-contract-value-report/procurement-method-average-contract-value-visuals/procurement-method-average-contract-value-visuals.component';
import { ProcurementMethodAverageContractValueReportComponent } from './pages/contracting-category-page/procurement-method-average-contract-value-report/procurement-method-average-contract-value-report.component';
import { PdeAverageContractValueVisualsComponent } from './pages/contracting-category-page/pde-average-contract-value-report/pde-average-contract-value-visuals/pde-average-contract-value-visuals.component';
import { PdeAverageContractValueReportComponent } from './pages/contracting-category-page/pde-average-contract-value-report/pde-average-contract-value-report.component';
import { SignedContractsVisualsComponent } from './pages/contracting-category-page/signed-contracts-report/signed-contracts-visuals/signed-contracts-visuals.component';
import { SignedContractsReportComponent } from './pages/contracting-category-page/signed-contracts-report/signed-contracts-report.component';
import { ProcurementReportVisualsComponent } from './pages/contracting-category-page/procurement-report/procurement-report-visuals/procurement-report-visuals.component';
import { ProcurementReportComponent } from './pages/contracting-category-page/procurement-report/procurement-report.component';
import { AwardedContractReportComponent } from './pages/contracting-category-page/awarded-contract-report/awarded-contract-report.component';
import { AdministrativeReviewVisualsComponent } from './pages/contracting-category-page/administrative-review-report/administrative-review-visuals/administrative-review-visuals.component';
import { ContractingReportsListComponent } from './pages/contracting-category-page/contracting-reports-list/contracting-reports-list.component';
import { DueDeligenceVisualsComponent } from './pages/evaluation-category-page/due-deligence-report/due-deligence-visuals/due-deligence-visuals.component';
import { EvaluationReportsListComponent } from './pages/evaluation-category-page/evaluation-reports-list/evaluation-reports-list.component';
import { DueDeligenceReportComponent } from './pages/evaluation-category-page/due-deligence-report/due-deligence-report.component';
import { PlaningReportsListComponent } from './pages/planning-category-page/planing-reports-list/planing-reports-list.component';
import { ContractingManagementCategoryPageComponent } from './pages/contracting-management-category-page/contracting-management-category-page.component';
import { PlanningCategoryPageComponent } from './pages/planning-category-page/planning-category-page.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCategoryPageComponent } from './pages/evaluation-category-page/evaluation-category-page.component';
import { ContractingCategoryPageComponent } from './pages/contracting-category-page/contracting-category-page.component';
import { PlaningAndForecastingReportComponent } from './pages/planning-category-page/planing-and-forecasting-report/planing-and-forecasting-report.component';
import { VisualsComponent } from './pages/planning-category-page/planing-and-forecasting-report/visuals/visuals.component';
import { AwardedContractVisualsComponent } from './pages/contracting-category-page/awarded-contract-report/awarded-contract-visuals/awarded-contract-visuals.component';
import { TerminatedContractsVisualsComponent } from './pages/contracting-management-category-page/terminated-contracts-report/terminated-contracts-visuals/terminated-contracts-visuals.component';
import { FrameWorkVisualsComponent } from './pages/contracting-management-category-page/frame-work-report/frame-work-visuals/frame-work-visuals.component';
import { CompletedContractsVisualsComponent } from './pages/contracting-management-category-page/completed-contracts-report/completed-contracts-visuals/completed-contracts-visuals.component';
import { CancelledTenderVisualsComponent } from './pages/contracting-management-category-page/cancelled-tender-report/cancelled-tender-visuals/cancelled-tender-visuals.component';
import { AdministrativeReviewReportComponent } from './pages/contracting-category-page/administrative-review-report/administrative-review-report.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children:[
      {
        path: 'planning',
        component:PlanningCategoryPageComponent,
        children: [
          {
            path: 'planning-reports-list',
            component:PlaningReportsListComponent,
          },
          {
            path: '',
            redirectTo: 'planning-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'planning-and-forecasting-report',
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
                component:ReportPageComponent,
                
              },
            ]
          },
        ]
       
      },

      {
        path: 'home',
        component:HomePageComponent,
      },

      {
        path: '',
        redirectTo: 'planning',
        pathMatch: 'full',
      },

      {
        path: 'evaluation',
        component:EvaluationCategoryPageComponent,
        children:[
          {
            path: 'evaluation-reports-list',
            component:EvaluationReportsListComponent,
          },
          {
            path: '',
            redirectTo: 'evaluation-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'due-deligence-report',
            component:DueDeligenceReportComponent,
            children: [
              {
                path: 'visuals',
                component:DueDeligenceVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },

        ]
       
      },


      {
        path: 'contracting',
        component:ContractingCategoryPageComponent,
        children:[

          {
            path: 'contracting-reports-list',
            component:ContractingReportsListComponent,
          },
          {
            path: '',
            redirectTo: 'contracting-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'signed-contracts-report',
            component:SignedContractsReportComponent,
            children: [
              {
                path: 'visuals',
                component:SignedContractsVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'pde-average-contract-value-report',
            component:PdeAverageContractValueReportComponent,
            children: [
              {
                path: 'visuals',
                component:PdeAverageContractValueVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'procurement-method-average-contract-value-report',
            component:ProcurementMethodAverageContractValueReportComponent,
            children: [
              {
                path: 'visuals',
                component:ProcurementMethodAverageContractValueVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'administrative-review-report',
            component:AdministrativeReviewReportComponent,
            children: [
              {
                path: 'visuals',
                component:AdministrativeReviewVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'awarded-contract-report',
            component:AwardedContractReportComponent,
            children: [
              {
                path: 'visuals',
                component:AwardedContractVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,                
              },
            ]
          },
          {
            path: 'procurement-report',
            component:ProcurementReportComponent,
            children: [
              {
                path: 'visuals',
                component:ProcurementReportVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },

        ]
        
      },


      {
        path: 'contract-management',
        component:ContractingManagementCategoryPageComponent, 
        children:[

          {
            path: 'contract-management-reports-list',
            component:ContractManagementReportsListComponent,
          },
          {
            path: '',
            redirectTo: 'contract-management-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'cancelled-tender-report',
            component:CancelledTenderReportComponent,
            children: [
              {
                path: 'visuals',
                component:CancelledTenderVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'completed-contracts-report',
            component:CompletedContractsReportComponent,
            children: [
              {
                path: 'visuals',
                component:CompletedContractsVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'frame-work-report',
            component:FrameWorkReportComponent,
            children: [
              {
                path: 'visuals',
                component:FrameWorkVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          },
          {
            path: 'terminated-contracts-report',
            component:TerminatedContractsReportComponent,
            children: [
              {
                path: 'visuals',
                component:TerminatedContractsVisualsComponent,
              },
              {
                path: '',
                redirectTo: 'visuals',
                pathMatch: 'full',
              },
              {
                path: 'reports',
                component:ReportPageComponent,
                
              },
            ]
          }
        ]      
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
