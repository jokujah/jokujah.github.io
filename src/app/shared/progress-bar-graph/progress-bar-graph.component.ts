import { NumberSuffix } from 'src/app/utils/helpers';
import { ChartOptions } from 'src/app/utils/IChartOptions';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-progress-bar-graph',
  templateUrl: './progress-bar-graph.component.html',
  styleUrls: ['./progress-bar-graph.component.scss']
})
export class ProgressBarGraphComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() series :any;
  @Input() seriesName :any;
  @Input() categories :any;
  @Input() maxYAxisValue :any;

  constructor() { }

  ngOnInit(): void {

    let categoriesArray = []
    let seriesArray = []
    
    if(this.categories != ''){
      categoriesArray.push(this.categories)
    }
    if(this.series != ''){
      let dataVal = (this.series) ? parseInt(this.series.split(',').join('')) : 0
      seriesArray.push({
        name:this.seriesName,
        data:[dataVal] 
      })
    }     
   
    this.initChart(seriesArray,categoriesArray,this.maxYAxisValue)
  }

  initChart(series?,categories?,maxYAxisValue?){
   this.chartOptions = {
      chart: {
        height: 40,
        type: 'bar',
        stacked: false,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '100%',
          // colors: {
          //   backgroundBarColors: ['#40475D']
          // }

          dataLabels: {
            position: 'top'
          }
        },
      },
      stroke: {
        width: 0,
      },
      series: series,
      // title: {
      //   floating: true,
      //   offsetX: -10,
      //   offsetY: 5,
      //   text: 'Process 1'
      // },
      // subtitle: {
      //   floating: true,
      //   align: 'right',
      //   offsetY: 0,
      //   text: '44%',
      //   style: {
      //     fontSize: '20px'
      //   }
      // },
      tooltip: {
        enabled: true,
        label:{
          formatter:function(val){
            return NumberSuffix(val,2)
          }
        }
      },
      
      xaxis: {
        categories: categories,
        crosshairs: {
          show: true,
          width: 1,
          position: 'back',
          opacity: 0.9,        
          stroke: {
              color: '#b6b6b6',
              width: 0,
              dashArray: 0,
          },
          fill: {
              type: 'solid',
              color: '#B1B9C4',
              gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
              },
          },
          dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 1,
              opacity: 0.4,
          },
      },
      tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '0',
            fontFamily: '0',
          },
      },
      },
      
     yaxis: {
       max: maxYAxisValue,
       labels: {
         formatter: (val) => {
           return NumberSuffix(val, 2)
         }
       },
       crosshairs: {
         show: true,
         position: 'back',
         stroke: {
           color: '#b6b6b6',
           width: 1,
           dashArray: 0,
         },
       },
       tooltip: {
         enabled: true,
         offsetX: 0,
       },

     },
      fill: {
        opacity: 1
      },
     dataLabels: {
       enabled: true,
      //  enabledOnSeries: [0],
       formatter: function (val, opts) {
         return NumberSuffix(val, 2)
       },
       style: {
        colors: ['#333'],
        fontWeight:'bold',
        fontSize:'12px'
      },
      offsetY:-5,offsetX:40,
      distributed:true
     }
    }
  }

}
