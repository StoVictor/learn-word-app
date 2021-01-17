export  interface Pack {
    name: string;
    public: boolean;
    languages: {
      from: string;
      to: string;
    };
    words: { id: number; from: string; to: string }[];
  }