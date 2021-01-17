import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { IPack } from '../models/Pack';

@Injectable({ providedIn: 'root' })
export class PackService {

  constructor(private apollo: Apollo) {}

  create(fromLanguge:string, toLanguage:string, name:string, pub:boolean){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createPack(
            fromLanguage: "${fromLanguge}", 
            name: "${name}", 
            public: ${pub}, 
            toLanguage: "${toLanguage}"
          ){
            pack {
              id,
              name,
              public,
              toLanguage,
              fromLanguage
            }
          }
        }`
    });
  }

  modify(id: string){

  }

  delete(id: string){

  }

  addWords(id: string){

  }

  removeWords(id: string){
      
  }
}