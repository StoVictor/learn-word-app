import graphene

from backend.graphqlapi.account.queries import Query as AccountQuery
from backend.graphqlapi.account.mutations import Mutation as AccountMutation
from backend.graphqlapi.packs.queries import Query as PacksQueries
from backend.graphqlapi.packs.mutations import Mutation as PacksMutation


class Query(AccountQuery,
            PacksQueries):
    pass


class Mutation(AccountMutation,
               PacksMutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
