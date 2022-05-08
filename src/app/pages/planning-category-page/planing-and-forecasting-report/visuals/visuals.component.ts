import { Component, ElementRef, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';
import { ChartType} from 'angular-google-charts';
import html2canvas from 'html2canvas';


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


  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }





  constructor(fb: FormBuilder) {
    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });
    
  }

  ngOnInit(): void {}

  getFontSize() {
    return Math.max(10, 12);
  }
}


