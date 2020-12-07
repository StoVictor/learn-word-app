import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';


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

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>; 
    if (this.isLoginMode) {
      authObs = this.auth.login(this.loginForm.form.value.email, this.loginForm.form.value.password);
    } else {
      authObs = this.auth.signup(this.loginForm.form.value.email, this.loginForm.form.value.password);
    }
    authObs.subscribe(resData => { this.router.navigate(['/training_and_game']);  this.isLoading = false; },
        errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
        }
    );
    this.loginForm.reset();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.loginForm);
  }

}
