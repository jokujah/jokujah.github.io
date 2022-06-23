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

  constructor() {
    console.log('App stats card',this.value)
   }

  ngOnInit(): void {
  }

}
