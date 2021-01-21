export interface IWord {
  wordFrom: string;
  wordTo: string;
}

export interface IPack {
  id: string;
  name: string;
  fromLanguage: string;
  toLanguage: string;
  public: boolean;
  owner?: { id: string, email: string };
  words: IWord[];
  subscirbedPacks: IPack[];
}