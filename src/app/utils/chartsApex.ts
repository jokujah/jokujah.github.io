import { ChartOptions } from './IChartOptions';
import { NumberSuffix } from "./helpers";

export function initRadialChart(series?, categories?, title?):Partial<ChartOptions> {
    return    {
      series: series,
      title: {
        text: title,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          //color: '#1286f3'
        },
      },
      chart: {
        type: "donut",
        fontFamily:'Trebuchet Ms',
        height:250
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show:true,
              },
              value: {
                show: true,
                formatter: function (val) {
                  return 'UGX'+NumberSuffix(val,2)
                }
              }
            }
          }
        }
      },
      labels: categories,
      dataLabels:{
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
      },
      tooltip: {
        enabled: false,
        // formatter: function (val) {
        //   return val + "%"
        // },
      },
      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    };
}


export function initColumnChart(series?: Array<any>, categories?: Array<any>, title?,xAxisTitle?,yAxisTitle?):Partial<ChartOptions>{
    console.log(series)
    console.log(categories)
    return {
        series: series,
        chart: {
          type: "bar",
          height: '350',
          fontFamily:'Trebuchet Ms'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "35%",
            borderRadius: 2,
            dataLabels: {
              position: 'top'
            }
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: categories,
          title: {
            text: xAxisTitle
          },
          labels:{
             formatter: function(val) {
              return "UGX " + NumberSuffix(val,1) ;
            }
          }
        },
        yaxis: {
          title: {
            text: yAxisTitle
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "UGX " + NumberSuffix(val,1) ;
            }
          }
        },
        noData: {
          text: 'Loading Data ...'
        },
        title: {
          text: title,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            // color: '#1286f3'
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333'],
            fontWeight:'bold',
            fontSize:'12px'
          },
          offsetX:60,
          formatter:function(val){
            return NumberSuffix(val,1)
          }
        },
      };

}