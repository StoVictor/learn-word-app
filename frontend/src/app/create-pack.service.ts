import { Injectable } from '@angular/core';

export interface Pack {
  name: string;
  public: boolean;
  languages: {
    from: string;
    to: string;
  };
  words: { id: number; from: string; to: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class CreatePackService {
  constructor() {}

  savePack(pack: Pack): void {
    console.log('Created Pack', pack);
  }
}
