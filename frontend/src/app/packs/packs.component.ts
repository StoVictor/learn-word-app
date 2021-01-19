import { Component, OnInit } from '@angular/core';
import { APacks } from '../Packs';
import { Pack } from '../Pack';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger,} from '@angular/animations';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css'],
  animations: [
    trigger('Selected', [
      transition(':enter', [   
      style({opacity:0,
        visibility: "hidden",
        transform: "translateX(-90px)"}),
      animate(300, style({
        opacity: "1",
        visibility: "visible",
        transform: "translateX(0)"}))
       
        ]),
        transition(':leave', [   
          animate(300, style({
            opacity: "0",
            visibility: "hidden",
            transform: "translateX(-90px)",
          })) 
        ])
      ])
    ]
})

export class PacksComponent implements OnInit {
  Packs: Pack[];
  Searchkey: string;
  SelectedPack: Pack;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.Packs = APacks;
  }

  Search(){
    this.ngOnInit();
    if(this.Searchkey != ""){
      this.Packs = this.Packs.filter(res =>{
        return res.name.toLocaleLowerCase().concat(res.languages.from.toLocaleLowerCase(),
                res.languages.to.toLocaleLowerCase()).match(this.Searchkey.toLocaleLowerCase());
      });

    }else if(this.Searchkey == ""){
      this.ngOnInit();
    }
    
  }
  toCreatePack(): void {
    this.router.navigate([`/packs/create`]);
  } 

  onSelect(_Pack: Pack): void {
    if(_Pack == this.SelectedPack){
      this.SelectedPack = null;
      
    }else{
      this.SelectedPack = _Pack;
      
    }
  }
  
}
