import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiationCategoryPageComponent } from './initiation-category-page.component';
import { InitiationReportsListComponent } from './initiation-reports-list/initiation-reports-list.component';
import { LateInitiationReportComponent } from './late-initiation-report/late-initiation-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LateInitiationVisualsComponent } from './late-initiation-report/late-initiation-visuals/late-initiation-visuals.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    InitiationCategoryPageComponent,
    InitiationReportsListComponent,
    LateInitiationReportComponent,
    LateInitiationVisualsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class InitiationCategoryPageModule { }
