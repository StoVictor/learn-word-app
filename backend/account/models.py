from pymodm import MongoModel, EmbeddedMongoModel, ReferenceField
from pymodm.fields import CharField, EmbeddedDocumentField, DateTimeField, ListField, IntegerField, BooleanField, FloatField

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

    friends = ListField(ReferenceField('User'), blank=True, default=[])
    subscribed_packs = ListField(ReferenceField('Pack'), blank=True, default=[])

    class Meta:
        collection_name = "users"
        indexes = [
            pymongo.IndexModel([("username", 1)], unique=True),
            pymongo.IndexModel([("email", 1)], unique=True),
        ]


class Word(EmbeddedMongoModel):
    word_from = CharField(required=True)
    word_to = CharField(required=True)


class Pack(MongoModel):
    name = CharField(required=True)
    owner = ReferenceField(User, required=True)
    public = BooleanField(blank=True, default=False)
    from_language = CharField(required=True)
    to_language = CharField(required=True)
    words = ListField(EmbeddedDocumentField(Word), blank=True, default=[])
    subscribed_packs = ListField(ReferenceField('Pack'), blank=True, default=[])

    class Meta:
        collection_name = "packs"
        indexes = [
            pymongo.IndexModel("name"),
            pymongo.IndexModel("owner")
        ]


class TrainingStatistic(MongoModel):
    user = ReferenceField(User, required=True, on_delete=ReferenceField.CASCADE)
    pack = ReferenceField(Pack, required=True, on_delete=ReferenceField.CASCADE)
    created_at = DateTimeField(required=True)
    correct_answers_number = IntegerField(required=True)
    correct_answers_percentage = FloatField(required=True)
    words_number = IntegerField(required=True)

    class Meta:
        collection_name = "training_statistics"
        indexes = [
            pymongo.IndexModel("user"),
            pymongo.IndexModel("pack")
        ]


User.register_delete_rule(User, 'friends', ReferenceField.PULL)  # pop User from friend list if User was deleted
User.register_delete_rule(Pack, 'owner', ReferenceField.CASCADE)  # delete Pack, if Owner was deleted
Pack.register_delete_rule(User, 'subscribed_packs', ReferenceField.PULL)  # pop Pack from subscribed packs if Pack was deleted
Pack.register_delete_rule(Pack, 'subscribed_packs', ReferenceField.PULL)  # pop Pack from subscribed packs if Pack was deleted
