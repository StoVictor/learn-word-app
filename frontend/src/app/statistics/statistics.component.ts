import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import { Stat } from '../statistic';
import { listStat } from '../Teststats';
import { StatisticService } from '../services/statistic.service';
import { PackService } from '../services/pack.service';
import { concatMap, map } from 'rxjs/operators';

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
  
  statsList = [];
  percentage: string;
  Selectedstat: Stat;
  result: any = {};

  constructor(private packService: PackService, private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.packService.getMe()
    .pipe(
      concatMap(id => this.statisticService.getUserStatistic(id)),
      map((statistic: any) => {
        console.log(statistic);
        const stats = statistic.data.userTrainingStatistic;
        stats.map(s => {
          if (s.pack.id in this.result) {
            this.result[s.pack.id]['correct'] += s.correctAnswersNumber;
            this.result[s.pack.id]['all'] += s.wordsNumber;
            this.result[s.pack.id]['perc'].push(s.correctAnswersPercentage);
          } else {
            this.result[s.pack.id] = {
              correct: s.correctAnswersNumber,
              all: s.wordsNumber,
              perc: [s.correctAnswersPercentage],
              name: s.pack.name
            }
          }
        })
      })
      )
    .subscribe(data => {
      for (const [key, value] of Object.entries(this.result)) {
        let v: any = value;
        this.result[key].perc = ((v.perc.reduce((a, b) => a + b, 0)) / this.result[key].perc.length);
        this.statsList.push(this.result[key]);
      }
      console.log('ARARARA', data, this.result);
    })
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
