from pymodm import MongoModel, EmbeddedMongoModel
from pymodm.fields import CharField, EmbeddedDocumentField, DateTimeField

import pymongo


class UserData(EmbeddedMongoModel):
    first_name = CharField(default=None, blank=True)
    last_name = CharField(default=None, blank=True)
    hometown = CharField(default=None, blank=True)
    birthday_date = DateTimeField(default=None, blank=True)
    assign_date = DateTimeField(default=None, blank=True)


class User(MongoModel):
    username = CharField(required=True)
    password = CharField(required=True)
    email = CharField(required=True)
    data = EmbeddedDocumentField(UserData, blank=True, default=None)

    class Meta:
        collection_name = "users"
        indexes = [
            pymongo.IndexModel([("username", 1)], unique=True),
            pymongo.IndexModel([("email", 1)], unique=True),
        ]
