import { AutoLogoutService } from './../../services/AutoLogOut/auto-logout.service';
import { element } from 'protractor';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Console } from 'console';

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

  elem: any; 
  isFullScreen: boolean;
  showImage = false;
  entityName: string;
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

  isLoading: Boolean = false
  currentRoute: string = '';
  pageHeading: string = '';
  reportName: string = ''

  pageHeadingDisplay: string = '';
  reportNameDisplay: string = ''


  email!: string | null;
  role!: string | null;

  
  constructor(
    @Inject(DOCUMENT) private document: any,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthenticationService,
    private _autoLogOutService : AutoLogoutService,
    private toastr: ToastrService,
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
      pde: this.pdeControl
    });

    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    this.entityName = localStorage.getItem('email') == 'admin@mail.com'?'All PDEs':this.getEntity(localStorage.getItem('user'))

    this._autoLogOutService.check()
  }

  ngOnInit(): void {

    //-----> Auto Logout 
    this.chkScreenMode();
    this.elem = document.documentElement;
    this.elem.addEventListener('fullscreenchange',()=>this.chkScreenMode())

  }


  onClick() {
    this.router.navigate([`../dashboard/${this.pageHeading}`])
  }

  async stall(stallTime = 8000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }


  changePageHeading(activeURL: string) {
    var words = activeURL.split('/');
    console.log(words)
    if (words[1] == 'login') return

    this.pageHeading = `${words[2]}`

    var splitPageHeading = this.pageHeading.split('-')
    if (splitPageHeading.length > 0) {
      let holdCapitalizedHeadings = []
      console.log(splitPageHeading)
      splitPageHeading.forEach(element => {
        holdCapitalizedHeadings.push(this.capitalizeFirstLetter(element))
      })
      this.pageHeadingDisplay = holdCapitalizedHeadings.join(' ')
    } else {
      this.pageHeadingDisplay = this.capitalizeFirstLetter(this.capitalizeFirstLetter)
    }


    this.reportName = `${words[3] ? words[3] : ''}`

    if (this.reportName == 'reports-list') {
      this.reportName = 'All Reports'
    } else if ((this.reportName != '') || (this.reportName != undefined)) {
      let splitName = [] = this.reportName.split('-')

      if (splitName.length > 0) {
        let holdCapitalizedHeadings = []
        splitName.forEach(element => {
          holdCapitalizedHeadings.push(this.capitalizeFirstLetter(element))
        })
        this.reportName = splitName.join(' ')
        this.reportNameDisplay = holdCapitalizedHeadings.join(' ')
      }
    }
  }

  getFontSize() {
    return Math.max(10, 12);
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  logOut() {
    localStorage.clear()
    this.toastr.success("Logged Out User Successfully", '', {
      progressBar: true,
      positionClass: 'toast-top-right'
    });
    this.router.navigate(['/login']);
    // this._authService.logout().subscribe(
    //   (response) => {
    //     console.log(response)
    //     localStorage.clear()
    //     this.toastr.success("Logged Out User Successfully", '', {
    //       progressBar: true,
    //       positionClass: 'toast-top-right'
    //     });
    //     this.router.navigate(['/login']);
    //   },
    //   (error) => {
    //     console.log(error)
    //     this.toastr.error("Something Went Wrong, Failed to log out user", '', {
    //       progressBar: true,
    //       positionClass: 'toast-top-right'
    //     });
    //   }
    // );
  }

  fullscreenmodes(event){
    this.chkScreenMode();
  }
  chkScreenMode(){
    if(document.fullscreenElement){
      //fullscreen
      this.isFullScreen = true;
    }else{
      //not in full screen
      this.isFullScreen = false;
    }
  }


  openFullscreen() {
    this.isFullScreen = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    //this.chkScreenMode()
  }
/* Close fullscreen */
  closeFullscreen() {
    this.isFullScreen = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    //this.chkScreenMode()
  }

  getEntity(data){
    var user = JSON.parse(data)
    return user?.entities[0]
  }

}

