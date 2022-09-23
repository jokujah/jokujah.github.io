import { ConvertNumbersWithCommasPipe } from './../../utils/pipes';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    AnimatedDigitModule,
    MatTooltipModule
  ],
  exports:[
    StatsCardComponent,    
  ]
})
export class StatsCardModule { }
