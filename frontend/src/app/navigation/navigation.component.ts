import { Component, OnInit } from '@angular/core';
import { MENU } from '../menu';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  mode:string;
  menu: any;

  constructor() {
    this.mode = "over";
    this.menu = MENU;
    console.log(MENU, this.menu);
  }

  ngOnInit(): void {
  }

}
