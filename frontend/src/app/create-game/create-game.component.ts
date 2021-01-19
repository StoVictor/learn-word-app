import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APacks } from '../Packs';
import { Pack } from '../Pack';
import { User } from '../auth/user.model'
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  Packs: Pack[];
  User_: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Packs = APacks;
  }

  BacktoGames(): void {
    this.router.navigate([`/Games/`]);
  }

  createGame(): void{
    const id = uuid.v4();
    this.User_ = JSON.parse(localStorage.getItem('userData')) as User;
    //this.router.navigate([`/Games/${id}`]);
  }
}
