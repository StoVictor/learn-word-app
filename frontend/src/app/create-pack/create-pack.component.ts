import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Pack, CreatePackService } from '../create-pack.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-pack',
  templateUrl: './create-pack.component.html',
  styleUrls: ['./create-pack.component.css'],
})
export class CreatePackComponent implements OnInit {
  @ViewChild('f') createPackForm: NgForm;
  pack: Pack;

  constructor(private createPackService: CreatePackService) {}

  ngOnInit(): void {}

  savePack(): void {
    this.createPackService.savePack(this.pack);
  }

  onSubmit(f: NgForm): void {
    console.log(f);
  }
}
