from graphene import String, Field, ID, DateTime
from graphene.types.objecttype import ObjectType


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
