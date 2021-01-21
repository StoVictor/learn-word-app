import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pack, CreatePackService } from '../create-pack.service';
import { PackService } from '../services/pack.service';
import { StatisticService } from '../services/statistic.service';


interface Statistics {
  count: number;
  correct: number;
  wrong: number;
  langFrom: string;
  langTo: string;
  packs: Pack[];
  words?: {
    wordFrom: string;
    wordTo: string;
    correct: boolean;
  }[];
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  pack: any; //: Pack;
  word: string;
  wordNumber = 0;
  train = true;
  statistics: Statistics;
  time: number;
  timer: any;
  timeToEnterWord = 20;
  timeLeft = this.timeToEnterWord;
  timeBarWidth = 40;
  wrongWords;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private packService: PackService,
    private statisticService: StatisticService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.packService.getPackById(id).subscribe(pack => {
      console.log(pack);
      this.pack = pack;
      this.word = this.pack.words[this.wordNumber].wordFrom;
      this.generateStatistics();
      this.time = Math.round(Date.now() / 1000);
      const timeBar = document.getElementsByClassName('timeBar');
      this.timer = setInterval(() => {
        this.timeLeft =
          this.timeToEnterWord - (Math.round(Date.now() / 1000) - this.time);
        var particle =
          (this.timeBarWidth / this.timeToEnterWord) *
          (this.timeToEnterWord - this.timeLeft);
        this.renderer.setStyle(
          timeBar.item(0),
          'width',
          `${this.timeBarWidth - particle}%`
        );
        this.renderer.setStyle(
          timeBar.item(1),
          'width',
          `${this.timeBarWidth - particle}%`
        );
        if (this.timeLeft < 0) {
          this.nextWord();
        }
      }, 1000);
    });
  }

  closeTraining(): void {
    clearInterval(this.timer);
    this.location.back();
  }

  nextWord(): void {
    clearInterval(this.timer);
    const timeBar = document.getElementsByClassName('timeBar');
    this.timeLeft = this.timeToEnterWord;
    var particle =
      (this.timeBarWidth / this.timeToEnterWord) *
      (this.timeToEnterWord - this.timeLeft);
    this.renderer.setStyle(timeBar.item(0), 'width', `${this.timeBarWidth}%`);
    this.renderer.setStyle(timeBar.item(1), 'width', `${this.timeBarWidth}%`);
    this.time = Math.round(Date.now() / 1000);
    this.timer = setInterval(() => {
      this.timeLeft =
        this.timeToEnterWord - (Math.round(Date.now() / 1000) - this.time);
      var particle =
        (this.timeBarWidth / this.timeToEnterWord) *
        (this.timeToEnterWord - this.timeLeft);
      this.renderer.setStyle(
        timeBar.item(0),
        'width',
        `${this.timeBarWidth - particle}%`
      );
      this.renderer.setStyle(
        timeBar.item(1),
        'width',
        `${this.timeBarWidth - particle}%`
      );
      if (this.timeLeft < 0) {
        this.nextWord();
      }
    }, 1000);
    this.wordNumber++;
    if (this.wordNumber == this.pack.words.length) {
      this.endTraining();
      return;
    }
    this.word = this.pack.words[this.wordNumber].wordFrom;
  }

  skip(): void {
    this.statistics.words.push({
      wordFrom: this.word,
      wordTo: this.pack.words[this.wordNumber].wordTo,
      correct: false,
    });
    this.statistics.wrong = this.statistics.count - this.statistics.correct;

    (document.getElementById('cInput') as HTMLInputElement).value = '';
    this.nextWord();
  }

  endTraining(): void {
    this.train = false;
    clearInterval(this.timer);
    this.wrongWords = this.statistics.words.filter(
      (word) => word.correct == false
    );
    this.statisticService
      .createPackStatistic(this.statistics.correct, this.pack.words.length, this.pack.id)
      .subscribe(d => console.log('AAAAAA', d));
  }
  generateStatistics(): void {
    this.statistics = {
      count: this.pack.words.length,
      correct: 0,
      wrong: 0,
      langFrom: this.pack.fromLanguage,
      langTo: this.pack.toLanguage,
      packs: this.pack.packs,
      words: [],
    };
  }

  checkWord(event: any): void {
    this.statistics.words.push({
      wordFrom: this.word,
      wordTo: this.pack.words[this.wordNumber].wordTo,
      correct: false,
    });
    if (
      event.target.value.toLowerCase() ==
      this.pack.words[this.wordNumber].wordTo.toLowerCase()
    ) {
      this.statistics.correct += 1;
      this.statistics.words[this.wordNumber].correct = true;
    }
    this.statistics.wrong = this.statistics.count - this.statistics.correct;
    event.target.value = '';
    this.nextWord();
  }
}
