from graphene import String, Field, ID, DateTime, List
from graphene.types.objecttype import ObjectType

from backend.graphqlapi.packs import types


class UserData(ObjectType):
    first_name = String()
    last_name = String()
    hometown = String()
    birthday_date = DateTime()
    assign_date = DateTime()


class User(ObjectType):
    id = ID()
    email = String()
    username = String()
    data = Field(UserData)
    friends = List(lambda: User)
    subscribed_packs = List(lambda: types.Pack)
