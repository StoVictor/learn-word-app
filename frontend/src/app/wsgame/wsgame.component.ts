import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { NodeserverService } from '../nodeserver.service';
import { Pack, CreatePackService } from '../create-pack.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
    private nodeserver: NodeserverService,
    private packService: CreatePackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.socket$ = new WebSocketSubject('ws://localhost:3333');
    this.nodeserver
      .checkRoom(this.route.snapshot.paramMap.get('id'))
      .subscribe((data: { free: boolean }) => {
        if (!data.free) {
          this.router.navigate(['/']);
          window.location.reload();
        }
      });
    this.socket$.subscribe((message: any) => {
      console.log('Server responded: ' + message.message);
      if (message.message === 'go') {
        this.start = true;
      } else if (message.message === 'breakGame') {
        this.router.navigate([
          `/Games/${this.route.snapshot.paramMap.get('id')}`,
        ]);
        window.location.reload();
      } else if (message.message === 'pack') {
        this.pack = message.pack;
      }
    });
  }

  ngOnInit(): void {
    this.pack = this.packService.PACKS[Math.floor(Math.random() * 3)];
    while (this.email == '' || this.email == null) {
      this.email = window.prompt('Enter your email');
    }
    this.socket$.next({
      message: 'room',
      room: {
        user1: this.email,
        id: this.route.snapshot.paramMap.get('id'),
        pack: this.pack,
      },
    });
  }

  collectWord(): void {
    this.msg.nativeElement.value = '';
    this.nextWord();
  }

  ngOnDestroy(): void {
    this.socket$.complete();
  }

  startGame() {
    this.socket$.next({ user: this.email, message: 'start' });
    this.nextWord();
  }

  nextWord() {
    this.wordnumber += 1;
    if (this.wordnumber == this.pack.words.length) {
      this.stopGame();
      return;
    }
    clearInterval(this.timer);
    this.timeleft = 2;
    this.timer = setInterval(() => {
      if (this.timeleft <= 0) {
        this.collectWord();
        return;
      }
      this.timeleft -= 1;
    }, 1000);
  }

  stopGame() {
    clearInterval(this.timer);
    this.end = true;
  }

  goBack() {
    const id = this.route.snapshot.paramMap.get('id');
    window.location.reload();
    //this.router.navigate([`/Games/${id}`]);
  }
}
