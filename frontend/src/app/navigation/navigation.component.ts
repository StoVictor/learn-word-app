import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MENU } from '../menu';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  mode:string;
  menu: any;
  userSub: Subscription;
  isAuthinticated: boolean = false;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.mode = "over";
    this.menu = MENU;
    console.log(MENU, this.menu);
  }

  onLogout() {
    this.auth.logout();
  }
  
  ngOnInit(): void {

    console.log('Hi, I am in Nav Init but not in the subscription');
    this.userSub = this.auth.user.subscribe(user => {
      console.log('Hi, I am in subscription', user);
      this.isAuthinticated = !!user; 
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onReq() {
    this.http.post(
    'https://learnwordapp-a9566.firebaseio.com/posts.json',
    {data: 'SomeData'}
    ).subscribe(resData => console.log(resData), error => console.log(error));
  }
}
