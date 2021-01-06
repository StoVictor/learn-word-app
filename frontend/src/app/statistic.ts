export  interface Stat{
  count: number;
  correct: number;
  wrong: number;
  langFrom: string;
  langTo: string;
  words:
    {
      wordFrom: string;
      wordTo: string;
      correct: boolean;
    }[]
  
}