import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Pack, CreatePackService } from '../create-pack.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-pack',
  templateUrl: './create-pack.component.html',
  styleUrls: ['./create-pack.component.css'],
})
export class CreatePackComponent implements OnInit {
  @ViewChild('f') createPackForm: NgForm;

  packForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    languages: this.fb.group({
      langFrom: ['', Validators.required],
      langTo: ['', Validators.required],
    }),
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
    console.log(words);
    let pack = {
      name: this.packForm.get('name').value,
      public: this.packForm.get('type').value === '0' ? true : false,
      languages: {
        from: this.packForm.get('languages').get('langFrom').value,
        to: this.packForm.get('languages').get('langTo').value,
      },
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
    this.wordsArray.removeAt(i);
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
}
