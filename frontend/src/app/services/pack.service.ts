import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { getPackedSettings } from 'http2';
import { map } from 'rxjs/operators';
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

  modify(id: string, fromLanguage: string, toLanguage: string, name: string, pub: boolean){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          editPack(
            packId: "${id}",
            fromLanguage: "${fromLanguage}",
            toLanguage: "${toLanguage}",
            name: "${name}",
            public: ${pub}
          )
          {
            pack {
              id
              name
              public
              fromLanguage
              toLanguage
              owner {
                id
              }
            }
          }
        }`,
        context: {
          headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
        }
      });
  }

  delete(id: string){
    console.log('AAAAAAAAAA', id);
    return this.apollo.mutate({
      mutation: gql`
        mutation DeletePack($packId: ID!){
          deletePack(packId: $packId){
            output
          }
        }`,
        variables: { packId: id },
        context: {
          headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
        }
      });
  }

  removeWords(indexes: number[], id: string){
    return this.apollo.mutate({
      mutation: gql`
      mutation RemoveWordsFromPack($indexes: [Int]!, $packId: ID!) {
        removeWordsFromPack(indexes: $indexes, packId: $packId) {
          pack {
            id
          }
        }
      }`,
      variables: { indexes: indexes, packId: id },
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    });
  }

  getPacksByUser(userId: string){
    return this.apollo.watchQuery({
      query: gql`query Packs($ownerId: String) {
        packs (ownerId: $ownerId) {
          id,
          name,
          fromLanguage,
          toLanguage,
          public,
          words {
            wordFrom,
            wordTo
          }
        }
      }`,
      variables: {
        ownerId: userId
      },
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    }).valueChanges.pipe((map((value: any) => value.data.packs)));
  }

  getPublicPacks() {
    return this.apollo.watchQuery({
      query: gql`query {
        packs {
          id,
          name,
          fromLanguage,
          toLanguage,
          public,
          words {
            wordFrom,
            wordTo
          }
        }
      }`,
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    }).valueChanges.pipe((map((value: any) => value.data.packs)));
  }

  getMe(){
    return this.apollo.watchQuery({
      query: gql`
        query {
          me {
            id
          }
        }
      `,
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    }).valueChanges.pipe(map((value: any) => value.data.me.id));
  }

  getPackById(id: string){
    return this.apollo.watchQuery({
      query: gql`query {
        pack (pack: "${id}") {
          id,
          name,
          fromLanguage,
          toLanguage,
          public,
          words {
            wordFrom,
            wordTo
          }
        }
      }`,
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    }).valueChanges.pipe((map((value: any) => value.data.pack)));
  }
}

