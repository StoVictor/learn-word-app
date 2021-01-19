import { Stat } from './statistic';
import { APacks } from './Packs';

export const listStat: Stat[] = [
  {
  count: 140,
  correct: 79,
  wrong: 61,
  langFrom: "Polish",
  langTo: "English",
  Pack: APacks[1],
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
  },
  {
  count: 30,
  correct: 7,
  wrong: 23,
  langFrom: "Polish",
  langTo: "English",
  Pack: APacks[2],
  words:[
    {
      wordFrom: "komputer",
      wordTo: "computer",
      correct: true
    },
    {
        wordFrom: "zadanie",
        wordTo: "task",
        correct: true
    },
    {
        wordFrom: "kolega z pracy",
        wordTo: "coleague",
        correct: false
    },
    {
        wordFrom: "dyskd",
        wordTo: "disc",
        correct: true
    },
    {
        wordFrom: "drukarka",
        wordTo: "printer",
        correct: true
    },
    {
        wordFrom: "pensja",
        wordTo: "sallary",
        correct: false
    },

    {
        wordFrom: "zmiana",
        wordTo: "shift",
        correct: true
    }
  ]
  },

  {
    count: 15,
    correct: 8,
    wrong: 7,
    langFrom: "Polish",
    langTo: "German",
    Pack: APacks[4],
    words:[
      {
        wordFrom: "Desktop",
        wordTo: "Desktop",
        correct: false
      },
      {
          wordFrom: "Desktop",
          wordTo: "gfh",
          correct: true
      },
      {
        wordFrom: "Desktop",
        wordTo: "gasdfah",
        correct: false
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
          correct: false
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
]