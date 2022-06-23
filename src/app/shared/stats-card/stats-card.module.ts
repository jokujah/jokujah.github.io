import { AnimatedDigitModule } from './../animated-digit/animated-digit.module';
import { LoadingPulseModule } from './../loading-pulse/loading-pulse.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './stats-card.component';



@NgModule({
  declarations: [
    StatsCardComponent
  ],
  imports: [
    CommonModule,
    LoadingPulseModule,
    AnimatedDigitModule
  ],
  exports:[
    StatsCardComponent
  ]
})
export class StatsCardModule { }
