import { throwError } from 'rxjs';
import { AuthenticationService } from './../../services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.setUpLoginForm();  
  }


  setUpLoginForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }


  login(form:FormGroup){    
    if(form.invalid) {
      return;
    }
    this.isLoading = true;

    let credentials = {
      'email': form.controls.email.value,
      'password': form.controls.password.value
    }

     this._authService.login(credentials).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.isLoading = false;
        throw error        
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
