import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RequestService {
    
    constructor(private apollo: Apollo) {}
    
    createUser(email: string, username: string, password: string) {
      return this.apollo.mutate({
        mutation: gql`
        mutation {
          createUser(
            email: "${email}",
            username: "${username}",
            password: "${password}"
          ) {
            user {
              id,
              email,
              username
            }
          }
        }`
      }) 
    }

    authenticateUser(email: string, password: string){
      return this.apollo.mutate({
        mutation: gql`
        mutation {
          authenticateUser(email: "${email}", password: "${password}"){
            accessToken,
            refreshToken
          }
        }`
      });
    }
}
