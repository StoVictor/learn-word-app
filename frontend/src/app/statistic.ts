import { Pack } from './Pack';
export  interface Stat{
  count: number;
  correct: number;
  wrong: number;
  langFrom: string;
  langTo: string;
  Pack: Pack;
  words:
    {
      wordFrom: string;
      wordTo: string;
      correct: boolean;
    }[]
  
}