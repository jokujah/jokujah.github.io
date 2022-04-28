import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsListRoutingModule } from './reports-list-routing.module';
import { ReportsListComponent } from './reports-list.component';


@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    ReportsListRoutingModule
  ]
})
export class ReportsListModule { }
