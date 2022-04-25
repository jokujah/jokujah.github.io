import { Component, ViewChild } from '@angular/core';
import { ChartReadyEvent, ChartType, GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'egpReportsUI';
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Cairo', 19500000]
  ];
  chartColumns = ['City', 'Inhabitants'];
  chartType = ChartType.BarChart 
  myTitle = "Test"


  @ViewChild('chart', { static: true })
  public chart!: GoogleChartComponent;


  chartType2 = ChartType.ColumnChart
  isButtonDisabled:boolean = true
  options = {
    width: 400,
    height: 240,
    animation:{
      duration: 1000,
      easing: 'out',
    },
    vAxis: {minValue:0, maxValue:1000}
  };

  myData2 = [
    ['V', 200]
  ]
  chartColumns2 = ['N', 'Value'];

  onClick() {
    console.log("Before xxxxx",this.chart.data )
    console.log("Before   gtggt",this.myData2)
    var newValue = 1000 - parseInt(this.myData2[0][1].toString())
    console.log(newValue)
    //this.myData2[0][1] = newValue

    console.log(this.myData2)
    //this.drawChart();


    this.myData2 = [
      ['v',newValue]
    ]
  }

  onReady(event:ChartReadyEvent){
    console.log("On Ready   gtggt",this.myData2)
    console.log(event)
    this.isButtonDisabled = false
    console.log(this.isButtonDisabled)
  }
  

  drawChart() {
    this.isButtonDisabled = true;
    this.chart.data = this.myData2
    console.log("After Draw Chart",this.chart.data )
  }

}
