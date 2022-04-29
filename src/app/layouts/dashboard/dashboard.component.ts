import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading:Boolean=false
  currentRoute: string='';
  pageHeading:string='';
  reportName:string=''





  dataSource: Object;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router
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
        
        this.isLoading = false
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        this.isLoading = false
        // Present error to user
        console.log(event.error);
      }
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

}
