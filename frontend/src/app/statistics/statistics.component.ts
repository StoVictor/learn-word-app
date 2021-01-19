import { Component, OnInit } from '@angular/core';
import { Stat } from '../statistic';
import { listStat } from '../Teststats';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
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
