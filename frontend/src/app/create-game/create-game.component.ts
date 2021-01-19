import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APacks } from '../Packs';
import { Pack, Room } from '../Pack';
import { User } from '../auth/user.model'
import { WebSocketSubject } from 'rxjs/webSocket';
import { NodeserverService } from '../nodeserver.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  Packs: Pack[];
  User_: User;
  Room_: Room;
  private socket$: WebSocketSubject<any>;

  constructor(private noodeserver: NodeserverService, private router: Router) {
    this.socket$ = new WebSocketSubject('ws://localhost:3333');
   }

  ngOnInit(): void {
    
    this.Packs = APacks;
  }

  BacktoGames(): void {
    this.router.navigate([`/Games/`]);
  }

  createGame(pack_ : Pack): void{
    const id = uuid.v4();
    this.User_ = JSON.parse(localStorage.getItem('userData')) as User;

    this.Room_ = { user1: this.User_.email,
      user2: "",
      id: id,
      pack: pack_,
    }
    localStorage.setItem('PackData', JSON.stringify(pack_));

    //this.noodeserver.sendRoom(this.Room_)

    this.router.navigate([`/Games/${id}`]);
  }
}
