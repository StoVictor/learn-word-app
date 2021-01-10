import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

import { RequestService } from 'src/app/test-request.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  isLoginMode:boolean = false;
  isLoading:boolean = false;
  error = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>; 
    if (this.isLoginMode) {
      //authObs = this.auth.login(this.loginForm.form.value.email, this.loginForm.form.value.password);
      let someObs = this.requestService
        .authenticateUser(
          this.loginForm.form.value.email,
          this.loginForm.form.value.password
        ).subscribe(data => {
          let tokensData = (data as any).data.authenticateUser;
          console.log(data);
          console.log(tokensData);
          this.isLoading = false;
          this.isLoginMode = true;
          this.error = null;
          localStorage.setItem('refreshToken', JSON.stringify(tokensData.refreshToken));
          localStorage.setItem('accessToken', JSON.stringify(tokensData.accessToken));
        }, error => {
          this.error = error;
          this.isLoading = false;
        });
    } else {
      //authObs = this.auth.signup(this.loginForm.form.value.email, this.loginForm.form.value.password);
      let someObs = this.requestService
        .createUser(this.loginForm.form.value.email,
                    this.loginForm.form.value.username,
                    this.loginForm.form.value.password
        ).subscribe(data => { 
          this.isLoading = false;
          this.isLoginMode = true;
          this.error = null;
        }, 
        error =>  { 
          this.error = error;
          this.isLoading = false;
        });
    }
    /*authObs.subscribe(resData => { this.router.navigate(['/training_and_game']);  this.isLoading = false; },
        errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
        }
    ); */
    this.loginForm.reset();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.loginForm);
  }

  

}
