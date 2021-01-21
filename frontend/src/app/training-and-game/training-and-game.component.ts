import { Component, OnInit } from '@angular/core';
import { Pack, CreatePackService } from '../create-pack.service';
import { Router } from '@angular/router';
import { PackService } from '../services/pack.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-training-and-game',
  templateUrl: './training-and-game.component.html',
  styleUrls: ['./training-and-game.component.css'],
})
export class TrainingAndGameComponent implements OnInit {
  //packs: Pack[];
  packs: any;
  constructor(private packService: PackService, private router: Router) {}

  ngOnInit(): void {
  this.packService.getMe()
    .pipe(concatMap(id => this.packService.getPacksByUser(id)))
    .subscribe(packs => { this.packs = packs });
  }

  routing(id: string): void {
    this.router.navigate([`/training/${id}`]);
  }
}
