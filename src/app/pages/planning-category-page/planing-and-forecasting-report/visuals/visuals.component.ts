import { Component, OnInit , ViewChild } from '@angular/core';


const data = {
  chart: {
    caption: "AdWords Campaign Analysis",
    subcaption: "Conversions as % of total",
    xaxisname: "# Conversions",
    yaxisname: "Cost Per Conversion",
    numberprefix: "$",
    theme: "fusion",
    plottooltext: "$name : Share of total conversion: $zvalue%"
  },
  categories: [
    {
      verticallinealpha: "20",
      category: [
        {
          label: "0",
          x: "0"
        },
        {
          label: "1500",
          x: "1500",
          showverticalline: "1"
        },
        {
          label: "3000",
          x: "3000",
          showverticalline: "1"
        },
        {
          label: "4500",
          x: "4500",
          showverticalline: "1"
        },
        {
          label: "6000",
          x: "6000",
          showverticalline: "1"
        }
      ]
    }
  ],
  dataset: [
    {
      data: [
        {
          x: "5540",
          y: "16.09",
          z: "30.63",
          name: "Campaign 1"
        },
        {
          x: "4406",
          y: "12.74",
          z: "24.36",
          name: "Campaign 2"
        },
        {
          x: "1079",
          y: "15.79",
          z: "5.97",
          name: "Campaign 3"
        },
        {
          x: "1700",
          y: "8.27",
          z: "9.4",
          name: "Campaign 4"
        },
        {
          x: "853",
          y: "15.89",
          z: "4.71",
          name: "Campaign 5"
        },
        {
          x: "1202",
          y: "10.74",
          z: "6.65",
          name: "Campaign 6"
        },
        {
          x: "2018",
          y: "6.14",
          z: "11.16",
          name: "Campaign 7"
        },
        {
          x: "413",
          y: "19.83",
          z: "2.28",
          name: "Campaign 8"
        },
        {
          x: "586",
          y: "13.96",
          z: "3.24",
          name: "Campaign 9"
        },
        {
          x: "184",
          y: "15.82",
          z: "1.02",
          name: "Campaign 10"
        },
        {
          x: "311",
          y: "5.83",
          z: "1.72",
          name: "Campaign 11"
        },
        {
          x: "35",
          y: "10.76",
          z: "0.19",
          name: "Campaign 12"
        },
        {
          x: "55",
          y: "2.73",
          z: "0.3",
          name: "Campaign 13"
        },
        {
          x: "6",
          y: "21.22",
          z: "0.03",
          name: "Campaign 14"
        }
      ]
    }
  ]
};


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss']
})
export class VisualsComponent implements OnInit { 
  width = "600";
  height = "400";
  type = "bubble";
  dataFormat = "json";
  dataSource2 = data; 



  // Donut
  dataDonut = {
    chart: {
      caption: "Amount By Status",
      subcaption: "For all Procurement Plans in 2022",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionAlignment: 'center',
      chartLeftMargin :20,
      captionpadding: "0",
      decimals: "1",
      plottooltext:
        "<b>$percentValue</b> of Procurement Plans are <b>$label</b>",
      centerlabel: "UGX $value",
      theme: "fusion"
    },
    data: [
      {
        label: "Initiated",
        value: "3000"
      },
      {
        label: "Not Initiated",
        value: "5300"
      }
    ]
  };

  widthDonut = "600";
  heightDonut = "400";
  typeDonut = "doughnut2d";
  dataFormatDonut = "json";
  dataSourceDonut = this.dataDonut;
  

  dataSource: Object;
  constructor() {
    //STEP 2 - Chart Data
    const chartData = [
      {
        label: "Venezuela",
        value: "290"
      },
      {
        label: "Saudi",
        value: "260"
      },
      {
        label: "Canada",
        value: "180"
      },
      {
        label: "Iran",
        value: "140"
      },
      {
        label: "Russia",
        value: "115"
      },
      {
        label: "UAE",
        value: "100"
      },
      {
        label: "US",
        value: "30"
      },
      {
        label: "China",
        value: "30"
      }
    ];
    // STEP 3 - Chart Configuration
    const dataSource = {
      chart: {
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
  }

  ngOnInit(): void {}
}
