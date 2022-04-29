import { SharedModule } from 'src/app/shared/shared.module';
import { FusionChartsModule } from 'angular-fusioncharts';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    SharedModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
