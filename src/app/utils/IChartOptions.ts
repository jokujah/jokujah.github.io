import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNoData, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle:ApexTitleSubtitle;
  fill: ApexFill,
  markers: ApexMarkers;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip | any;
  plotOptions : ApexPlotOptions,
  toolbar:any,
  legend: ApexLegend;
  noData:ApexNoData,
  colors: string[]; 
};
