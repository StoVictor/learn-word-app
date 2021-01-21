import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { getPackedSettings } from 'http2';
import { map } from 'rxjs/operators';
import { IPack, IWord } from '../models/Pack';

@Injectable({ providedIn: 'root' })
export class StatisticService {

  constructor(private apollo: Apollo) {}

  createPackStatistic(correctAnswers: number, words: number, packId: string){
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createTrainingStatistic(
            correctAnswersNumber: ${correctAnswers}, 
            pack: "${packId}", 
            wordsNumber: ${words}, 
          ){
          trainingStatistic {
            id,
            user {
              id
            },
            pack {
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

  getUserStatistic(userId: string){
    return this.apollo.watchQuery({
      query: gql`query {
        userTrainingStatistic (user: "${userId}") {
          correctAnswersNumber,
          correctAnswersPercentage,
          wordsNumber,
          pack {
            id,
            name
          }
        }
      }`,
      context: {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` })
      }
    }).valueChanges
  }
}