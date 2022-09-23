import { convertNumbersWithCommas } from 'src/app/utils/helpers';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

  
  @Input() title:string = ''
  @Input() value:number = 0
  @Input() isLoading:boolean = false
  @Input() prefix:string = ''
  @Input() info:string = ''
  @Input() numberWithCommas:string = ''

 // numberWithCommas = convertNumbersWithCommas(this.value) ;
 
  constructor() {
    
   }

  ngOnInit(): void {
    //this.numberWithCommas = convertNumbersWithCommas(this.value)
  }

}
