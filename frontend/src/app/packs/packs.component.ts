import { Component, OnInit } from '@angular/core';
import { APacks, Pack  } from '../Packs';


@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit {
  Packs: Pack[];
  name: string;
  //Packs = APacks;

  constructor() {}

  ngOnInit(): void {
    this.Packs = APacks;
  }

  Search(){
    this.ngOnInit();
    if(this.name != ""){
      this.Packs = this.Packs.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }else if(this.name == ""){
      this.ngOnInit();
    }
    
  }
}
