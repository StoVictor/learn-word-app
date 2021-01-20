export  interface Pack {
    name: string;
    public: boolean;
    languages: {
      from: string;
      to: string;
    };
    words: { id: number; from: string; to: string }[];
  }

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