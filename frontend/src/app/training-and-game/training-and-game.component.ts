import { Component, OnInit } from '@angular/core';
import { Pack, CreatePackService } from '../create-pack.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-and-game',
  templateUrl: './training-and-game.component.html',
  styleUrls: ['./training-and-game.component.css'],
})
export class TrainingAndGameComponent implements OnInit {
  packs: Pack[];
  constructor(private packService: CreatePackService, private router: Router) {}

  ngOnInit(): void {
    this.packs = this.packService.PACKS;
  }

  routing(name: string): void {
    this.router.navigate([`/training/${name}`]);
  }
}
