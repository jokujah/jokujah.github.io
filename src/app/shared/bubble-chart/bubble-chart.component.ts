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

  private width = 700;
  private height = 700;
  private margin = 50;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;

  bubble

  constructor(
    // public chartElem: ElementRef
    ) {
  }

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

    var tag = document.createElement("p");
    var text = document.createTextNode("Tutorix is the best e-learning platform");
    tag.appendChild(text);
    var element = document.getElementById("new");
    element.appendChild(tag);

    //document.querySelector('svg').appendChild(this.bubble)

    //this.bubbleChartElement.nativeElement.innerHTML = this.bubble;

  }

  // public ngOnChanges(changes): void {
  //   if (changes.hasOwnProperty('data') && this.data) {
  //     console.log(this.data)
  //     this.initializeChart();
  //     //this.drawChart();

  //     //window.addEventListener('resize', () => this.drawChart());
  //   }
  // }

  // private initializeChart(): void {


  //   let bubble = getBubbleChart(d3,this.data,{
  //     label: d => [...d.id.split(".").pop().split(/(?=[A-Z][a-z])/g), d.value.toLocaleString("en")].join("\n"),
  //     value: d => d.value,
  //     group: d => d.id.split(".")[1],
  //     title: d => `${d.id}\n${d.value.toLocaleString("en")}`,
  //     link: d => `https://github.com/prefuse/Flare/blob/master/flare/src/${d.id.replace(/\./g, "/")}.as`,
  //     width: 1152
  //   })

  //   console.log(bubble)

  //   this.bubbleChartElement.nativeElement.innerHTML = bubble;

  //   // this.svg = d3
  //   // .select(this.chartElem.nativeElement)
  //   // .select('.linechart')
  //   // .append(bubble)
  // }

  // private drawChart(): void {
  //   this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
  //   this.svg.attr('width', this.width);

  //   this.xScale.range([this.margin, this.width - 2 * this.margin]);

  //   const xAxis = d3
  //     .axisBottom(this.xScale)
  //     .ticks(10)
  //     .tickFormat(d3.timeFormat('%m / %Y'));

  //   this.xAxis.call(xAxis);

  //   const yAxis = d3
  //     .axisLeft(this.yScale);

  //   this.yAxis.call(yAxis);

  //   const line = d3
  //     .line()
  //     .x(d => d[0])
  //     .y(d => d[1])
  //     .curve(d3.curveMonotoneX);

  //   const points: [number, number][] = this.data.map(d => [
  //     this.xScale(new Date(d.date)),
  //     this.yScale(d.value),
  //   ]);

  //   this.lineGroup.attr('d', line(points));
  // }

  
}
