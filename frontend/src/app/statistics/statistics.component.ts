import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import { Stat } from '../statistic';
import { listStat } from '../Teststats';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [
    trigger('Selected', [
      transition(':enter', [   
      style({opacity:0,
        visibility: "hidden",
        transform: "translateY(-40px)"}),
      animate(300, style({
        opacity: "1",
        visibility: "visible",
        transform: "translateY(0)"}))
       
        ]),
        transition(':leave', [   
          animate(300, style({
            opacity: "0",
            visibility: "hidden",
            transform: "translateY(-40px)",
          })) 
        ])
      ])
    ]
})
export class StatisticsComponent implements OnInit {
  
  statsList: Stat[];
  percentage: string;
  Selectedstat: Stat;

  constructor() { }

  ngOnInit(): void {
    this.statsList =  listStat;
  }

  onSelect(_stat: Stat): void {
    if(_stat == this.Selectedstat){
      this.Selectedstat = null;
      
    }else{
      this.Selectedstat = _stat;
      this.percentage = ((this.Selectedstat.correct/this.Selectedstat.count)*100).toString()
    }
  }

}
