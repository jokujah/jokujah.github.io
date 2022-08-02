import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3'

declare function getBubbleChart(dGraph?:any,data?:any,config?:any):any

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  @Input() public data: any[];
  @ViewChild('bubbleChart') bubbleChartElement: ElementRef; 
  bubble

  constructor() {}

  ngOnInit(){
    this.bubble = getBubbleChart(d3,this.data,{
      label: d => [...d.id.split(".").pop().split(/(?=[A-Z][a-z])/g), d.value.toLocaleString("en")].join("\n"),
      value: d => d.value,
      group: d => d.id.split(".")[1],
      title: d => `${d.id}\n${d.value.toLocaleString("en")}`,
      link: d => `https://github.com/prefuse/Flare/blob/master/flare/src/${d.id.replace(/\./g, "/")}.as`,
      width: 1152
    })

    console.log(this.bubble)

    var element = document.getElementById("new");
    element.appendChild(this.bubble)
  }
  
}
