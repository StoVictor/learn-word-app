import { Component, OnInit } from '@angular/core';
import { APacks } from '../Packs';
import { Pack } from '../Pack';


@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit {
  Packs: Pack[];
  Searchkey: string;
  SelectedPack: Pack;

  constructor() {}

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

  onSelect(_Pack: Pack): void {
    if(_Pack == this.SelectedPack){
      this.SelectedPack = null;
    }else{
      this.SelectedPack = _Pack;
    }
  }
}
