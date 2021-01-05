import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  firebaseApiKey: string;
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {
    this.firebaseApiKey = 'AIzaSyCL3KXdXstM2RfzmvqeyT9YoIgefiyzRRw'; 
  }

  signup(email:string, password:string) {
    return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.firebaseApiKey,
        {email: email, password: password, returnSecureToken: true}
        ).pipe(catchError(this.errorHandling), tap(resData => this.handleAuth(resData)));
  }

  login(email: string, password: string) {  
    return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.firebaseApiKey,
        {email: email, password: password, returnSecureToken: true}
        ).pipe(catchError(this.errorHandling), tap(resData => this.handleAuth(resData)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }
    const loadedUser = new User(
                            userData.email,
                            userData.id,
                            userData._token,
                            new Date(userData._tokenExpirationDate));

    if(loadedUser.token) {
        console.log('AutoLogin', loadedUser);
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - Date.now();
        this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(
    () => this.logout(), expirationDuration);
  }
  
  private handleAuth(resData) {
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandling(error: HttpErrorResponse) { 
    let errorMessage = 'An unkown error occured';
    if(!error.error || !error.error.error) {
        return throwError(errorMessage);
    }
    switch(error.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'The email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
    }
    return throwError(errorMessage);
  }
}
