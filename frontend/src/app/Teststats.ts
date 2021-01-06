import { Stat } from './statistic';

export const listStat: Stat = {
  count: 140,
  correct: 79,
  wrong: 61,
  langFrom: "Polish",
  langTo: "English",
  words:[
    {
      wordFrom: "Desktop",
      wordTo: "Desktop",
      correct: true
    },
    {
        wordFrom: "Desktop",
        wordTo: "gfh",
        correct: true
    },
    {
        wordFrom: "Desktop",
        wordTo: "sdg",
        correct: false
    },
    {
        wordFrom: "Desktop",
        wordTo: "sg",
        correct: true
    },
    {
        wordFrom: "Desktop",
        wordTo: "sgfds",
        correct: true
    },
    {
        wordFrom: "Desktop",
        wordTo: "gdh",
        correct: false
    },

    {
        wordFrom: "Desktop",
        wordTo: "hgfkj",
        correct: true
    }
  ]
}