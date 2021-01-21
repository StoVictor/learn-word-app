import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://127.0.0.1:5000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext((operation, context) => {
    return { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
  });
  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  
  return { link: link, cache: new InMemoryCache() };

}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
