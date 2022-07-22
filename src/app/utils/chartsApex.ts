import { convertNumberSuffixWithCommas, visualisationMessages } from 'src/app/utils/helpers';
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
        width: '100%',
        height: 350,
        toolbar: {
          show: true,
          offsetY: 20,
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          // customScale: 1,
          donut: {
            size: '65%',
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
                show:false,
                label: 'Total',
                fontSize: '14px'
            }
            },
            
          }
        },
        
      },
      legend: {
        show: true,
        offsetX: 0,
        offsetY: 15,
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
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
      
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200
      //       },
      //       legend: {
      //         position: "bottom"
      //       }
      //     }
      //   }
      // ],
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      },
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

export function initPolarChart(series?,categories?,title?):Partial<ChartOptions>{
 
  return {
    series:series,
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'Trebuchet MS',
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    chart: {
      type: "polarArea",
      width: '100%',
        height: 350,
        toolbar: {
          show: true,
          offsetY: 20,
        },
    },
    title: {
      text: title,
      align: 'center',
      margin: 2,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Trebuchet MS',
      },
    },
    stroke: {
      colors: ["#fff"]
    },
    fill: {
      opacity: 0.9
    },
    dataLabels:{},
    labels: categories,
    noData: {
      text: visualisationMessages('empty'),
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '12px',
        fontFamily: 'Trebuchet MS',
      },
    },
    legend: {
      show: true,
      offsetX: 0,
        offsetY: 15,
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
    },
    
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: "bottom"
    //       }
    //     }
    //   }
    // ]
  };
}



