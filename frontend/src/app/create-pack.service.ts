import { Injectable } from '@angular/core';

export interface Pack {
  name: string;
  public: boolean;
  packs?: Pack[];
  languages: {
    from: string;
    to: string;
  };
  words: { from: string; to: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class CreatePackService {
  constructor() {}

  savePack(pack: Pack): void {}

  PACKS: Pack[] = [
    {
      name: 'Test1',
      public: true,
      languages: { from: 'polish', to: 'english' },
      words: [
        { from: 'herbata', to: 'tea' },
        { from: 'piwo', to: 'beer' },
        { from: 'woda', to: 'water' },
      ],
    },
    {
      name: 'Test2',
      public: true,
      languages: { from: 'polish', to: 'english' },
      words: [
        { from: 'kawa', to: 'coffe' },
        { from: 'lód', to: 'ice' },
        { from: 'śnieg', to: 'snow' },
      ],
    },
    {
      name: 'Test3',
      public: false,
      languages: { from: 'polish', to: 'english' },
      words: [
        { from: 'jabłko', to: 'apple' },
        { from: 'arbuz', to: 'watermelon' },
        { from: 'gruszka', to: 'pear' },
        { from: 'pomarańcza', to: 'orange' },
      ],
    },
  ];

  getPack(name: string): Pack | null {
    const pack = this.PACKS.filter((pack) => pack.name == name);
    if (pack.length <= 0) {
      return null;
    }
    return pack[0];
  }
}
