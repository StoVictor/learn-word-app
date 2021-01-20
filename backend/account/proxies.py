import typing
from bson.objectid import ObjectId

from backend.account import models
from backend.database.proxies import ModelProxy


class User(ModelProxy):
    class Meta:
        model = models.User


class TrainingStatistic(ModelProxy):
    class Meta:
        model = models.TrainingStatistic


class Pack(ModelProxy):
    class Meta:
        model = models.Pack

    def is_user_owner_of_pack(self, user_id: ObjectId):
        return User(self.owner).id == user_id

    def add_words(self, words: typing.List) -> None:
        self.words.extend([models.Word(**word) for word in words])
        self.save()

    def remove_words(self, indexes: typing.List[int]) -> None:
        for index in sorted(indexes, reverse=True):
            self.words.pop(index)
        self.save()
