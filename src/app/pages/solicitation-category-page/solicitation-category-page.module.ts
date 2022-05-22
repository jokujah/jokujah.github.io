import { PdeBidAverageReportComponent } from './pde-bid-average-report/pde-bid-average-report.component';
import { SolicitationCategoryPageComponent } from './solicitation-category-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitationReportsListComponent } from './solicitation-reports-list/solicitation-reports-list.component';
import { PdeBidAverageVisualsComponent } from './pde-bid-average-report/pde-bid-average-visuals/pde-bid-average-visuals.component';



@NgModule({
  declarations: [
    SolicitationCategoryPageComponent,
    SolicitationReportsListComponent,
    PdeBidAverageVisualsComponent,
    PdeBidAverageReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class SolicitationCategoryPageModule { }
