import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';


const data = {
  chart: {
    caption: "Procurements Above UGX 2Bn",
    subcaption: "Conversions as % of total",
    xaxisname: "# Conversions",
    yaxisname: "Cost Per Conversion",
    numberprefix: "UGX",
    theme: "fusion",
    plottooltext: "$name : Share of total conversion: $zvalue%",
    exportEnabled: "1",
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

const dataGrouped = {
  chart: {
    caption: "Planned Procurements by Department",
    subcaption: "March 2022 ",
    plottooltext: "UGX $dataValue ",
    yaxisname: "Amount",
    xaxisname: "Departments",
    theme: "fusion",
    exportEnabled: "1",
  },
  categories: [
    {
      category: [
        {
          label: "General"
        },
        {
          label: "Finance and Administration"
        },
        {
          label: "PDU"
        },
        {
          label: "Human Resources"
        },
        {
          label: "Inspection"
        },
        {
          label: "Perfomance Mgt"
        }
      ]
    }
  ],
  dataset: [
    {
      data: [
        {
          value: "97294205"
        },
        {
          value: "95482197"
        },
        {
          value: "60224172"
        },
        {
          value: "33018247"
        },
        {
          value: "31615028"
        },
        {
          value: "28984878"
        },
        {
          value: "25391784"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-due-deligence-visuals',
  templateUrl: './due-deligence-visuals.component.html',
  styleUrls: ['./due-deligence-visuals.component.scss']
})
export class DueDeligenceVisualsComponent implements OnInit {

  pde = getsortedPDEList()
  financialYears = getFinancialYears()

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
      doughnutRadius:"200",
      plottooltext:
        "<b>$percentValue</b> of Procurement Plans are <b>$label</b>",
      centerlabel: "UGX $value",
      theme: "fusion",
      exportEnabled: "1",
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

  widthDonut = "320";
  heightDonut = "400";
  typeDonut = "doughnut2d";
  dataFormatDonut = "json";
  dataSourceDonut = this.dataDonut;
  

  dataSource: Object;


  widthGrouped = "500";
  heightGrouped = "400";
  typeGrouped = "scrollbar2d";
  dataFormatGrouped = "json";
  dataSourceGrouped = dataGrouped;


  options: FormGroup;
  // colorControl = new FormControl('primary');
  // fontSizeControl = new FormControl(16, Validators.min(10));

  pdeControl = new FormControl();
  financialYearControl = new FormControl('2021-2022');


  dataSource5: Object;
  categories =  [
    {
      "category": [
        { "label": "2022-2021" },
        { "label": "2021-2020" },
        { "label": "2020-2019" },
        { "label": "2019-2018" }
      ]
    }
  ]

  dataset = [
    {
      "seriesname": "Works",
      "data": [
        { "value": "8.5" },
        { "value": "9.6" },
        { "value": "7.3" },
        { "value": "8.9" }
      ]
    },
    {
      "seriesname": "Supplies",
      "data": [
        { "value": "6.6" },
        { "value": "9.2" },
        { "value": "4.1" },
        { "value": "5.6" }
      ]
    },
    {
      "seriesname": "Services",
      "data": [
        { "value": "7.6" },
        { "value": "6.2" },
        { "value": "8.1" },
        { "value": "9.6" }
      ]
    },
    {
      "seriesname": "Consultancy and Non Consultancy",
      "data": [
        { "value": "4.6" },
        { "value": "3.2" },
        { "value": "5.1" },
        { "value": "7.6" }
      ]
    }
  ]

  

  

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      // color: this.colorControl,
      // fontSize: this.fontSizeControl,
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
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
        caption: "Budget Allocation [2021-2022]",
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

    this.dataSource5 = {
      "chart": {
        "theme": "fusion",
        "caption": "Average Bidder Perfomance by Procurement Type",
        "xAxisname": "Financial Year",
        "yAxisName": "Average Bidder Performance",
        "numberPrefix": "",
        "plotFillAlpha": "80",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1"
      },
      "categories": this.categories,
      "dataset": this.dataset,

    };


  }

  ngOnInit(): void {}

  getFontSize() {
    return Math.max(10, 12);
  }

}
