from graphene import ObjectType, List, Field, String

from flask_graphql_auth import get_jwt_identity

from backend.graphqlapi.account import types
from backend.graphqlapi.decorators import query_access_token_required
from backend.account.objects import UserObjects


class Query(ObjectType):
    me = Field(types.User)

    @query_access_token_required
    def resolve_me(self, info):
        current_user_email = get_jwt_identity()
        return UserObjects.from_email(current_user_email)

    users = List(types.User)

    @query_access_token_required
    def resolve_users(self, info):
        return UserObjects.all()
