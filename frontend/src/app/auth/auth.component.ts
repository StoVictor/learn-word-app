import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { RequestService } from 'src/app/services/test-request.service';


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
    if (this.isLoginMode) {
      this.requestService.authenticateUser(
        this.loginForm.form.value.email,
        this.loginForm.form.value.password
      ).subscribe(data => {
        const tokensData = (data as any).data.authenticateUser;
        localStorage.setItem('refreshToken', JSON.stringify(tokensData.refreshToken));
        localStorage.setItem('accessToken', JSON.stringify(tokensData.accessToken));
        this.onSuccess();
      }, error => this.handleError(error));
    } else {
      this.requestService.createUser(
        this.loginForm.form.value.email,
        this.loginForm.form.value.username,
        this.loginForm.form.value.password
      ).subscribe(data => this.onSuccess(), error => this.handleError(error));
    }
    this.loginForm.reset();
  }

  handleError(err) {
    this.error = err;
    this.isLoading = false
  }

  onSuccess() {
    this.isLoading = false;
    this.isLoginMode = true;
    this.error = null;
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.loginForm);
  }

  

}
