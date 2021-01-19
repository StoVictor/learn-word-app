import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/user.model';
import { Pack, Room ,Rooms } from '../Pack';
import * as uuid from 'uuid';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  constructor( private router: Router) {}
  
  roomlist: Room[];


  ngOnInit(): void {
    this.roomlist = Rooms;    
  }

  Joingame(): void {
    this.router.navigate([`/Games/`]);
  }
  
  tocreateview(): void{
    this.router.navigate([`/Games/Creategame`]);
  }
}
