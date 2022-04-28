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

    // if(words.length < 5 ) return
    // var urlName = (words[2] == "person") ? words[4]?.split('?') : ''

    // console.log(urlName)
  }

}
