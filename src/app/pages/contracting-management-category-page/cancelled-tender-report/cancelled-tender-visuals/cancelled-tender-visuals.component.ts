import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-cancelled-tender-visuals',
  templateUrl: './cancelled-tender-visuals.component.html',
  styleUrls: ['./cancelled-tender-visuals.component.scss']
})
export class CancelledTenderVisualsComponent implements OnInit {

  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return "";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
  };

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      // color: this.colorControl,
      // fontSize: this.fontSizeControl,
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
    this.initCharts();
  }
   

  ngOnInit(): void {}

  getFontSize() {
    return Math.max(10, 12);
  }


  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }
    //this.getSummaryStats('plan-summary',data?.selectedFinancialYear,'')

    //this.getSummaryStatsWithPDE('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsBudget('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsProcurementType('plan-by-procurement-type',data?.selectedFinancialYear,data?.selectedPDE) 
    //this.getSummaryStatsWithPDE('plan-by-funding-source',data?.selectedFinancialYear,data?.selectedPDE)
    //this.getSummaryStatsWithPDE('plan-budget-status',data?.selectedFinancialYear,data?.selectedPDE)
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
     //for changing stats at the top and the highest procurement budgets down
     //this.getSummaryStats('plan-summary',this.financialYears[0],'')

     //for budget graph
     //this.getSummaryStatsBudget('plan-budget-status',this.financialYears[0],'')
 
     //procurement graph
     //this.getSummaryStatsProcurementType('plan-by-procurement-type',this.financialYears[0],'') 
  }


 

  

  public initCharts(): void {
    this.chart1options = {
      series: [
        {
          name: "chart1",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 160
      },
      colors: ["#008FFB"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart2options = {
      series: [
        {
          name: "chart2",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 30
            }
          )
        }
      ],
      chart: {
        id: "tw",
        group: "social",
        type: "bar",
        height: 160
      },
      colors: ["#546E7A"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart3options = {
      series: [
        {
          name: "chart3",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 160
      },
      colors: ["#00E396"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
  }

  public generateDayWiseTimeSeries(baseval, count, yrange): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}
