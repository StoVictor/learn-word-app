import { Component, OnInit } from '@angular/core';
import { APacks, Pack  } from '../Packs';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import { PackService } from '../services/pack.service';
import { concatMap, map, shareReplay } from 'rxjs/operators';

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
  publicPacks:any;
  myPacks:any;
  publicSubs: any;
  mySubs: any;
  Packs: Pack[];
  pub: Boolean = true;
  my: Boolean = true;
  Searchkey: string;
  SelectedPack: Pack;


  constructor(private router: Router, private packService: PackService) {}

  ngOnInit(): void {
    if (!this.publicPacks && this.pub){
      this.publicPacks = this.packService.getPublicPacks().pipe(shareReplay(1));
    }
    if (!this.myPacks && this.my){
      this.myPacks = this.packService.getMe().pipe(concatMap(id => this.packService.getPacksByUser(id)), shareReplay(1));
    }
    //this.Packs = APacks;
    this.Packs = []
    if(this.pub){
      this.publicSubs = this.publicPacks.subscribe(data => {console.log(data); this.Packs.push(...data)});
      //this.publicSubs.unsubscribe();
    }
    if(this.my){
      this.mySubs = this.myPacks
        .subscribe(data => {
          data.map(el => {
            if (this.pub && !el.public){
              this.Packs.push(el);
            } else if( !this.pub ){
              this.Packs.push(el);
            }
          })
      });
     //this.mySubs.unsubscribe();
    }
  }

  onCheckChange(){
    this.ngOnInit();
  }

  Search(){
    this.ngOnInit();
    if(this.Searchkey != ""){
      this.Packs = this.Packs.filter((res: any) =>{
        return res.name.toLocaleLowerCase().concat(res.fromLanguage.toLocaleLowerCase(),
                res.toLanguage.toLocaleLowerCase()).match(this.Searchkey.toLocaleLowerCase());
      });

    }else if(this.Searchkey == ""){
      this.ngOnInit();
    }
    
  }
  toCreatePack(): void {
    this.router.navigate([`/packs/create`]);
  } 

  deletePack(id: string){
    this.packService.delete(id).subscribe(data => console.log('Delete', data));
    this.SelectedPack = null;
    //this.ngOnInit();
  }

  onSelect(_Pack: Pack): void {
    if(_Pack == this.SelectedPack){
      this.SelectedPack = null;
      
    }else{
      this.SelectedPack = _Pack;
      
    }
  }
  
}
