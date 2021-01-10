import graphene

from backend.graphqlapi.account.queries import Query as AccountQuery
from backend.graphqlapi.account.mutations import Mutation as AccountMutation


class Query(AccountQuery):
    pass


class Mutation(AccountMutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
