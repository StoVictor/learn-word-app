export interface Pack {
  name: string;
  public: boolean;
  languages: { from: string, to: string };
  words: Word[];
}

export interface Word {
  id: number,
  from: string,
  to: string
}

export const APacks: Pack[] = [
  { name: 'Home' , public: true, languages: {
    from: "Polish",
    to: "German"
  },
  words: [{ id: 1, from: "Dom", to: "Haus" },
        { id: 2, from: "Garaż", to: "Garage" },
        { id: 3, from: "Balkon", to: "Balkon" },
        { id: 4, from: "Ogród", to: "Garten" },
        { id: 5, from: "Stół", to: "Tabelle" },] },
  { name: 'Animals' , public: true, languages: {
    from: "Spanish",
    to: "German"
  },
  words: [{ id: 1, from: "***", to: "***" },
        { id: 2, from: "***", to: "***" },
        { id: 3, from: "***", to: "***" },
        { id: 4, from: "***", to: "***" },
        { id: 5, from: "***", to: "***" },] },
  { name: 'Work' , public: false, languages: {
    from: "English",
    to: "French"
  },
  words: [{ id: 1, from: "Desktop", to: "Bureau" },
        { id: 2, from: "Folder", to: "Dossier" },
        { id: 3, from: "Netzwerk ", to: "réseau" },
        { id: 4, from: "Datenbank ", to: "Base de données" },
        { id: 5, from: "Grafikkarte ", to: "carte graphique" },] },
  { name: 'ITwork' , public: false, languages: {
    from: "German",
    to: "French"
  },
  words: [{ id: 1, from: "***", to: "***" },
        { id: 2, from: "***", to: "***" },
        { id: 3, from: "***", to: "***" },
        { id: 4, from: "***", to: "***" },
        { id: 5, from: "***", to: "***" },] },

  { name: 'Science' , public: true, languages: {
    from: "English",
    to: "Polish"
  },
  words: [{ id: 1, from: "Computer", to: "komputer" },
        { id: 2, from: "Accelerate", to: "przyśpieszenie" },
        { id: 3, from: "Force", to: "moc" },
        { id: 4, from: "Vector", to: "wektor" },
        { id: 5, from: "Torque", to: "Moment obrotowy" },] },

  { name: 'English' , public: true, languages: {
    from: "English",
    to: "Polish"
  },
  words: [{ id: 1, from: "***", to: "***" },
        { id: 2, from: "***", to: "***" },
        { id: 3, from: "***", to: "***" },
        { id: 4, from: "***", to: "***" },
        { id: 5, from: "***", to: "***" },] }
  

];

export interface Room {
  user1: string;
  user2?: string;
  id: string;
  pack: any;
}

export const Rooms: Room[] = [
{ user1: "email1",
  user2: "",
  id: "2131",
  pack: "Word"
},
{ user1: "email2",
user2: "",
id: "2131",
pack: "Animals"
},
{ user1: "email3",
user2: "",
id: "2131",
pack: "Oficce"
}
]
