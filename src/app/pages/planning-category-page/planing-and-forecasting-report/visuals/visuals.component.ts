import { Component, ElementRef, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addArrayValues, getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';
import { ChartType} from 'angular-google-charts';
import html2canvas from 'html2canvas';
import { PlaningAndForecastingReportService } from 'src/app/services/PlaningCategory/planing-and-forecasting-report.service';


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss'],
  
})
export class VisualsComponent implements OnInit {

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');
  downloading = false

  isLoading:boolean = false 

  //number_of_plans  
  //estimated_amount
  // number_of_plans_2019_2020 
  // estimated_amount_2019_2020
  // number_of_plans_2018_2019 
  // estimated_amount_2018_2019


  totalValueofPlannedContracts;
  numberOfPlannedContracts;
  yearOfPlannedContracts;
  numberOfRegisteredEntities = 0;


  myType = ChartType.BarChart
  myData = [
    ['2022-2021', 8736000],
    ['2021-2019', 7538000],
    ['2019-2018', 3244000],
    ['2018-2017', 2470000],
    ['2017-2016', 1500000],
  ];  
  chartColumns = ['Financial Year', 'Contract Value'];


  myType2 = ChartType.BarChart
  myData2 = [
    ['Works', 5736000],
    ['Supplies', 3538000],
    ['Consultancy Services', 3244000],
    ['Non Consultancy Services', 2470000],
    
  ];  
  chartColumns2 = ['Procurement Type', 'Contract Value'];

  options2 = {
    chartArea: {
      width: '80%',
      left:"20%",
      top:"10%"
    },
    hAxis: {
      title: 'Value',
      minValue: 0
    },
    vAxis: {
      title: 'Financial Year'
    }
  };


  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  downloadImage(reportName){
    this.downloading = true
    console.log(this.screen.nativeElement.children[0].children[1].hidden)  
    //return
    this.screen.nativeElement.children[0].children[1].hidden = true

    html2canvas(this.screen.nativeElement).then(canvas => {   
       
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = `${reportName}.png`;
      this.downloadLink.nativeElement.click();
    });
    this.downloading = false
  }




  constructor(
    fb: FormBuilder,
    private _planingCategoryService: PlaningAndForecastingReportService) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
    
  }

  ngOnInit(): void {
    
    this.getSummaryStats('plan-summary',this.financialYears[0],'')
  }




  getFontSize() {
    return Math.max(10, 12);
  }

  reset(){
    this.options.get('pde')?.setValue('');
    this.options.get('financialYear')?.setValue(this.financialYears[0]);
    this.getSummaryStats('plan-summary',this.financialYears[0],'')
  }


  getSummaryStats(reportName,financialYear,procuringEntity){

    this.numberOfPlannedContracts = 0
          this.totalValueofPlannedContracts = 0
          this.yearOfPlannedContracts = 0
          this.numberOfRegisteredEntities = 0

    this._planingCategoryService.getSummaryStats(reportName,financialYear,procuringEntity).subscribe(
      (response )=>{ 
        this.isLoading = true
        let data = response.data
        let  x = []
        let  y = []
        let  x1 = []
        let  y1= []
        let  x2 = []
        let  y2 = []

        console.log(data)
        data.forEach(element => {
          if (element.financial_year == financialYear)
          {
            x.push(element?.number_of_plans)
            var e = element?.estimated_amount.split(',')
            //console.log(e.join(''))
            y.push(parseInt(e.join('')))
          }
          // if (element.financial_year == '2019-2020')
          // {
          //   x1.push(element?.number_of_plans)
          //   var e = element?.estimated_amount.split(',')
          //   console.log(e.join(''))
          //   y1.push(parseInt(e.join('')))
          // }
          // if (element.financial_year == '2018-2019')
          // {
          //   x2.push(element?.number_of_plans)
          //   var e = element?.estimated_amount.split(',')
          //   console.log(e.join(''))
          //   y2.push(parseInt(e.join('')))
          // }

        });
        console.log(x)
        console.log(y)

          
          this.numberOfPlannedContracts = addArrayValues(x)
          this.totalValueofPlannedContracts = addArrayValues(y) 
          this.yearOfPlannedContracts = financialYear
          this.numberOfRegisteredEntities = data[0].number_of_registered_pdes
          // this.number_of_plans_2019_2020  = this.addArrayValues(x1)
          // this.estimated_amount_2019_2020 = this.addArrayValues(y1)
          // this.number_of_plans_2018_2019  = this.addArrayValues(x2)
          // this.estimated_amount_2018_2019 = this.addArrayValues(y2)
          this.isLoading = false
        },
      (error) => {
        // this.isLoading = false;
        // this.toastr.error("Something Went Wrong", '', {
        //   progressBar: true,
        //   positionClass: 'toast-top-right'
        // });
        this.isLoading = false
        console.log(error)
      }
    )
  }

  submit(form: FormGroup) {
    let data: any = {
      'selectedPDE': form.controls.pde.value,
      'selectedFinancialYear': form.controls.financialYear.value,
    }

    console.log(data)

    this.getSummaryStats('plan-summary',data?.selectedFinancialYear,data?.selectedPDE)

    
  }
}


