import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Pack, CreatePackService } from '../create-pack.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-create-pack',
  templateUrl: './create-pack.component.html',
  styleUrls: ['./create-pack.component.css'],
  animations: [
    trigger('showpacks', [
      state(
        'in',
        style({
          overflow: 'hidden',
          height: '*',
          width: '70%',
        })
      ),
      state(
        'out',
        style({
          opacity: '0',
          overflow: 'hidden',
          height: '0px',
          width: '0px',
        })
      ),
      transition('out => in', animate('400ms ease-in-out')),
      transition('in => out', animate('400ms ease-in-out')),
    ]),
    trigger('showcolls', [
      state(
        'in',
        style({
          overflow: 'hidden',
          height: '*',
          width: '100%',
        })
      ),
      state(
        'out',
        style({
          opacity: '0',
          overflow: 'hidden',
          height: '0px',
          width: '0px',
        })
      ),
      transition('out => in', animate('400ms ease-in-out')),
      transition('in => out', animate('400ms ease-in-out')),
    ]),
  ],
})
export class CreatePackComponent implements OnInit {
  @ViewChild('f') createPackForm: NgForm;

  showrefpacks = 'out';
  showrefcolls = 'out';

  PACKS = this.createPackService.PACKS;

  packForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    languages: this.fb.group({
      langFrom: ['', Validators.required],
      langTo: ['', Validators.required],
    }),
    packs: this.fb.array(this.createRefPacks()),
    words: this.fb.array([this.createWord()]),
  });

  wordsArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private createPackService: CreatePackService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let words = this.packForm.get('words').value.map((word) => {
      return { from: word.wordFrom, to: word.wordTo };
    });
    const refpacks = [];
    this.packForm.get('packs').value.forEach((include, index) => {
      if (include) {
        refpacks.push(this.PACKS[index]);
        words = words.concat(this.PACKS[index].words);
      }
    });
    let pack = {
      name: this.packForm.get('name').value,
      public: this.packForm.get('type').value === '0' ? true : false,
      languages: {
        from: this.packForm.get('languages').get('langFrom').value,
        to: this.packForm.get('languages').get('langTo').value,
      },
      packs: refpacks,
      words,
    } as Pack;
    console.log(pack);
    this.createPackService.savePack(pack);
  }

  createWord(): FormGroup {
    return this.fb.group({
      wordFrom: ['', Validators.required],
      wordTo: ['', Validators.required],
    });
  }

  addWord(event: Event): void {
    event.preventDefault();
    this.wordsArray = this.packForm.get('words') as FormArray;
    this.wordsArray.push(this.createWord());
  }

  removeWord(i: number, event: Event): void {
    event.preventDefault();
    let temparray = this.packForm.get('words') as FormArray;
    temparray.removeAt(i);
  }

  createRefPacks(): FormControl[] {
    const refpacks = [];
    this.createPackService.PACKS.map((pack) => {
      refpacks.push(new FormControl());
    });
    return refpacks;
  }

  showWords(i: number, e: Event): void {
    e.preventDefault();
    let showwords: string[] = this.PACKS[i].words.map((word) => {
      return word.from + ' -> ' + word.to;
    });
    alert('Collection ' + this.PACKS[i].name + ':\n' + showwords.join('\n'));
  }

  toggleShowRefPacks(e: Event): void {
    e.preventDefault();
    this.showrefpacks = this.showrefpacks === 'out' ? 'in' : 'out';
  }

  toggleShowRefColls(e: Event): void {
    e.preventDefault();
    this.showrefcolls = this.showrefcolls === 'out' ? 'in' : 'out';
  }

  addWordsFromRefPacks(e: Event, pack: Pack): void {
    e.preventDefault();
    let newarray = this.packForm.get('words') as FormArray;
    pack.words.forEach((word) => {
      let group = this.fb.group({
        wordFrom: [word.from, Validators.required],
        wordTo: [word.to, Validators.required],
      });
      newarray.push(group);
    });
  }

  get words() {
    return this.packForm.get('words');
  }
  get name() {
    return this.packForm.get('name');
  }

  get langFrom() {
    return this.packForm.get('languages').get('langFrom');
  }
  get langTo() {
    return this.packForm.get('languages').get('langTo');
  }

  get wordsControls() {
    return this.packForm.get('words')['controls'];
  }

  get packsControls() {
    return this.packForm.get('packs')['controls'];
  }

  get packs() {
    return this.packForm.get('packs');
  }
}
