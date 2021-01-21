import typing
from datetime import datetime

from werkzeug.security import generate_password_hash

import pymongo

from bson.objectid import ObjectId

from backend.database.objects import ModelObjects

from . import proxies


class UserObjects(ModelObjects):
    class Meta:
        proxy = proxies.User

    @classmethod
    def from_email(cls, email: str) -> proxies.User:
        return cls.get({"email": email})

    @classmethod
    def create(cls, username: str, password: str, email: str) -> proxies.User:
        user = cls.Meta.proxy.create_instance(username=username,
                                              password=generate_password_hash(password),
                                              email=email)
        return user.save()


class PackObjects(ModelObjects):
    class Meta:
        proxy = proxies.Pack

    @classmethod
    def create(cls, name: str, owner: ObjectId, from_language: str, to_language: str, public: bool = False) -> proxies.Pack:
        pack = cls.Meta.proxy.create_instance(name=name,
                                              owner=owner,
                                              from_language=from_language,
                                              to_language=to_language,
                                              public=public,
                                              words=[],
                                              subscribed_packs=[])
        return pack.save()


class TrainingStatistic(ModelObjects):
    class Meta:
        proxy = proxies.TrainingStatistic

    @classmethod
    def create(cls, user: ObjectId, pack: ObjectId, correct_answers_number: int, words_number: int) -> proxies.TrainingStatistic:
        percentage = round(correct_answers_number / words_number * 100, 1)
        instance = cls.Meta.proxy.create_instance(user=user,
                                                  pack=pack,
                                                  correct_answers_number=correct_answers_number,
                                                  correct_answers_percentage=percentage,
                                                  words_number=words_number,
                                                  created_at=datetime.utcnow())
        return instance.save()

    @classmethod
    def get_user_statistics(cls, user: ObjectId) -> typing.List[proxies.TrainingStatistic]:
        queryset = cls.objects().raw({'user': user}).order_by([('created_at', pymongo.DESCENDING)])
        return cls.queryset_to_proxies(queryset)

    @classmethod
    def get_pack_statistics(cls, pack: ObjectId) -> typing.List[proxies.TrainingStatistic]:
        queryset = cls.objects().raw({'pack': pack}).order_by([('created_at', pymongo.DESCENDING)])
        return cls.queryset_to_proxies(queryset)
