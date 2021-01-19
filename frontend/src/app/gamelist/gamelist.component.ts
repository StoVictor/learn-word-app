import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/user.model';
import { Pack, Room ,Rooms } from '../Pack';
import { NodeserverService } from '../nodeserver.service'; 
import { WebSocketSubject } from 'rxjs/webSocket';
import * as uuid from 'uuid';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  constructor(private noodeserver: NodeserverService, private router: Router) {
    
  }
  
  roomlist: Room[];


  ngOnInit(): void {
    this.noodeserver.getList().subscribe(
      roomlist => this.roomlist = roomlist
    )
  }

  Joingame(Room_ : Room): void {
    this.router.navigate([`/Games/${Room_.id}`]);
  }
  
  tocreateview(): void{
    this.router.navigate(['Games/Creategame']);
  }
}
