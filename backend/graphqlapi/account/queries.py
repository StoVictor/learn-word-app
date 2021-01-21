from graphene import ObjectType, List, Field, String

from flask_graphql_auth import get_jwt_identity

from backend.graphqlapi.account import types
from backend.graphqlapi.decorators import access_token_required
from graphene import ObjectType, List, Field
from backend.account.objects import UserObjects


class Query(ObjectType):
    me = Field(types.User)

    @access_token_required
    def resolve_me(self, _info, user):
        return user

    users = List(types.User)

    @access_token_required
    def resolve_users(self, _info):
        return UserObjects.all()
