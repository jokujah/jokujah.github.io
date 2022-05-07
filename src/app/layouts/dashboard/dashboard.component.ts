import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { getFinancialYears, getsortedPDEList } from 'src/app/utils/helpers';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger(
      'menuOverLayAnimation',
      [
        transition(
          ':enter',
          [
            style({
              opacity: 0
            }),
            animate('0.3s ease-linear',
              style({
                opacity: 1
              }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.3s ease-linear',
              style({
                opacity: 0
              }))
          ]
        )
      ]
    ),
    trigger(
      'menuAnimation',
      [
        transition(
          ':enter',
          [
            style({
              'transform': 'translateX(-100%)'
            }),
            animate('0.3s ease-in-out',
              style({
                'transform': 'translateX(0px)'
              }))
          ]
        ),
        transition(
          ':leave',
          [
            style({
              'transform': 'translateX(0px)'
            }),
            animate('0.3s ease-in-out',
              style({
                'transform': 'translateX(-100%)'
              }))
          ]
        )
      ]
    ),
    trigger(
      'buttonAnimation',
      [
        transition(
          ':enter',
          [
            style({
              opacity: 0,
            }),
            animate('0.3s ease-in-out',
              style({
                opacity: 1,
              }))
          ]
        ),
        transition(
          ':leave',
          [
            style({
              opacity: 1,
            }),
            animate('0.3s ease-in-out',
              style({
                opacity: 0,
              }))
          ]
        )
      ]
    )
  ]
})
export class DashboardComponent implements OnInit {

  showImage = false;
  onCloseOpen() {
    console.log(this.showImage)
    this.showImage = !this.showImage;
    console.log(this.showImage)
  }

  pde = getsortedPDEList()
  financialYears = getFinancialYears()
  options: FormGroup;
  pdeControl = new FormControl('');
  financialYearControl = new FormControl('2021-2022');

  isLoading:Boolean=false
  currentRoute: string='';
  pageHeading:string='';
  reportName:string=''





  dataSource: Object;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        this.isLoading = true;
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.stall(8000).finally
        this.currentRoute = event.urlAfterRedirects;
        console.log(event);
        console.log(this.currentRoute);
        
        this.changePageHeading(this.currentRoute)
        //console.log(this.activeLinkStates)
        this.showImage = false
        this.isLoading = false
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        this.isLoading = false
        // Present error to user
        console.log(event.error);
      }
    });

    this.options = fb.group({
      financialYear: this.financialYearControl,
      pde:this.pdeControl
    });

   }

  ngOnInit(): void {
  }


  onClick(){
    this.router.navigate([`../dashboard/${this.pageHeading}`])
  }

  async stall(stallTime = 8000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }


  changePageHeading(activeURL:string){
    var words = activeURL.split('/');
    console.log(words)

    this.pageHeading = `${words[2]}`
    this.reportName = `${words[3]?words[3]:''}`

    if(this.reportName == 'reports-list'){
      this.reportName = 'All Reports'
    }else if((this.reportName != '') || (this.reportName != undefined)){
      let splitName = [] = this.reportName.split('-')
      if(splitName.length>0){
        this.reportName = splitName.join(' ')
      }
    }
  }

  getFontSize() {
    return Math.max(10, 12);
  }

}
