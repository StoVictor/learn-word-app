import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { getPackedSettings } from 'http2';
import { IPack, IWord } from '../models/Pack';

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
        }`,
        context: {
          headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
        }
    });
  }

  addWords(id: string, words: IWord[]){
    return this.apollo.mutate({
      mutation: gql`
      mutation AddWordsToPack( $packId: ID!, $words: [WordInput]!) {
        addWordsToPack(
          packId: $packId,
          words: $words
        ) {
          pack {
            id
            words {
              wordFrom
              wordTo
            }
          }
        }
      }`,
        variables: {packId: id, words: words },
        context: {
          headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
        }
    })
  }

  modify(id: string){

  }

  delete(id: string){

  }



  removeWords(id: string){
      
  }
}