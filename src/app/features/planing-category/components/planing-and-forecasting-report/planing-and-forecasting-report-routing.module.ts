import { PlaningAndForecastingReportComponent } from './planing-and-forecasting-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:PlaningAndForecastingReportComponent,
    children:[
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports-routing.module').then((m) => m.ReportsRoutingModule),
      
      },
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },  
      {
        path: 'visuals',
        loadChildren: () => import('./visuals/visuals-routing.module').then((m) => m.VisualsRoutingModule),
        
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaningAndForecastingReportRoutingModule { }
