import { ToastrService } from 'ngx-toastr';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  isLogin = false;

  constructor(
      private router: Router,
      private toastr: ToastrService,
      private ngZone: NgZone,
      private _authService: AuthenticationService,
  ) {
    if(this.isUserLoggedIn()){
      this.isLogin=true;
    }
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    })
  }

  /**
   * reset timer
   */
  reset() {
    //this._authService.refreshToken()
    this.lastAction(Date.now());

  }

  /**
   * check timer
   */
  check() {
    const now = Date.now();
    //Adding  5 mins
    //const timeLeft = parseInt(this.getLastAction()) + (5) * 60 * 1000;

    //Adding  3.5 mins
    const timeLeft = parseInt(this.getLastAction()) + (3.5) * 60 * 1000;

    // console.log("Now",Date.now())
    // console.log("Time Left",timeLeft)

    const diff = timeLeft - now;

    // console.log("Diff",diff)
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout && this.isLogin) {
        localStorage.clear()
        this.toastr.warning("Your Session Expired due to longer Inactivity, Login Again To Continue", '', {
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        setTimeout(()=>{
          console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        },10000);
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   *check if a user is logged in
   */
  isUserLoggedIn():string{
    let token = localStorage.getItem('token')
    return token;
  }
}
