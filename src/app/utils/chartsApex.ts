import { visualisationMessages } from 'src/app/utils/helpers';
import { ChartOptions } from './IChartOptions';
import { NumberSuffix } from "./helpers";
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';

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
                fontSize:'14px',
              },
              value: {
                show: true,
                fontSize:'14px',
                formatter: function (val) {
                  return 'UGX'+NumberSuffix(val,1)
                }
              },
              total:{
                show:true,
                label: 'Total',
                fontSize: '14px'
            }
            },
            
          }
        }
      },
      labels: categories,
      noData: {
        text: visualisationMessages('loading')
      },
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

export function actualRadialChart(series?, categories?, title?):Partial<ChartOptions>{
  return {
    series: series,
    chart: {
      fontFamily:'Trebuchet MS',
    height: 250,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      } ,dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '13px',
        },
        value: {
          color: '#111',
          fontSize: '30px',
          show: true,
        },
      },
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (value) {
        return `${value}%`;
      },
    },
  },
  title:{
    text:title
  },
  noData: {
    text: visualisationMessages('loading')
  },
  stroke: {
    lineCap: 'round',
  },
   labels: categories,
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
              return  NumberSuffix(val,1) ;
            }
          }
        },
        yaxis: {
          title: {
            text: yAxisTitle
          },
          labels:{
            minWidth: 0,
            maxWidth: 200,
          }
          //showForNullSeries: false,
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
          text: visualisationMessages('loading')
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

export function initRadarChart(series?,categories?,title?):Partial<ChartOptions>{
 
  return {
    series: series,
    chart: {
      type: "radar",
      fontFamily:'Trebuchet Ms'
    },
    title: {
      text: title,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        // color: '#1286f3'
      },
    },
    xaxis: {
      categories: categories
    },
    noData:{
      text:visualisationMessages('loading')
    }
  };
}



