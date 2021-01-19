import {
  Component,
  ElementRef,
  OnInit,
  Testability,
  ViewChild,
} from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { NodeserverService } from '../nodeserver.service';
import { User } from '../auth/user.model'
import { Pack, CreatePackService } from '../create-pack.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wsgame',
  templateUrl: './wsgame.component.html',
  styleUrls: ['./wsgame.component.css'],
})
export class WsgameComponent implements OnInit {
  @ViewChild('msg') msg: ElementRef;
  private socket$: WebSocketSubject<any>;
  private pack: Pack;
  start = false;
  end = false;
  wordnumber = -1;
  timeleft: number;
  timer: number;
  email: string;
  ready = false;
  wordlist: { word: string; timeleft: number }[];
  mscore: number;
  oscore: number;
  score = false;
  timeforgame = 5;
  user_: User;

  constructor(
    private packService: CreatePackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.wordlist = [];
    this.socket$ = new WebSocketSubject('ws://localhost:3333');
    this.socket$.subscribe((message: any) => {
      console.log('Server responded: ' + message.message);
      if (message.message === 'go') {
        this.start = true;
        this.nextWord();
      } else if (message.message === 'breakGame') {
        this.router.navigate([
          `/Games/${this.route.snapshot.paramMap.get('id')}`,
        ]);
        window.location.reload();
      } else if (message.message === 'pack') {
        this.pack = message.pack;
      } else if (message.message === 'score') {
        this.mscore = +message.yscore.toPrecision(4);
        this.oscore = +message.oscore.toPrecision(4);
        this.score = true;
      }
    });
  }

  ngOnInit(): void {
    //this.pack = this.packService.PACKS[Math.floor(Math.random() * 3)];
    //while (this.email == '' || this.email == null) {
    //  this.email = window.prompt('Enter your email');
    //}
    this.pack = JSON.parse(localStorage.getItem('PackData')) as Pack;
    this.user_ = JSON.parse(localStorage.getItem('userData')) as User;
    this.socket$.next({
      message: 'room',
      room: {
        user1: this.user_.email,
        id: this.route.snapshot.paramMap.get('id'),
        pack: this.pack,
      },
    });
  }

  collectWord(): void {
    this.wordlist.push({
      word: this.msg.nativeElement.value,
      timeleft: this.timeleft,
    });
    this.msg.nativeElement.value = '';
    this.nextWord();
  }

  ngOnDestroy(): void {
    this.socket$.complete();
  }

  startGame() {
    if (this.ready) {
      return;
    }
    this.socket$.next({ user: this.email, message: 'start' });
    this.ready = true;
  }

  nextWord() {
    this.wordnumber += 1;
    if (this.wordnumber == this.pack.words.length) {
      this.stopGame();
      return;
    }
    clearInterval(this.timer);
    this.timeleft = this.timeforgame;
    this.timer = setInterval(() => {
      if (this.timeleft <= 1) {
        this.collectWord();
        return;
      }
      this.timeleft -= 1;
    }, 1000);
  }

  stopGame() {
    clearInterval(this.timer);
    this.end = true;
    this.socket$.next({ message: 'words', words: this.wordlist });
  }

  goBack() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/Games`]);
  }
}
