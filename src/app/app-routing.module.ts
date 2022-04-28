import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layouts/dashboard/dashboard.module').then((m) => m.DashboardModule),
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
