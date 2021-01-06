import { Component, OnInit } from '@angular/core';
import { Stat } from '../statistic';
import { listStat } from '../Teststats';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  
  _stats: Stat;
  percentage: string;

  constructor() { }

  ngOnInit(): void {

    this._stats =  listStat;
    this.percentage = ((this._stats.correct/this._stats.count)*100).toString()
  }

}
