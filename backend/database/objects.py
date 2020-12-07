import typing
from bson.objectid import ObjectId
from pymodm import MongoModel


class ModelObjects:
    class Meta:
        proxy = None

    @classmethod
    def objects(cls) -> typing.Any:
        return cls.Meta.proxy.Meta.model.objects

    @classmethod
    def from_id(cls, object_id: ObjectId) -> typing.Any:
        if isinstance(object_id, ObjectId) is False:
            raise TypeError()

        instance = cls.objects().get({'_id': object_id})
        return cls.to_proxy(instance)

    @classmethod
    def get(cls, query: dict) -> typing.Any:
        instance = cls.objects().raw(query).first()
        return cls.to_proxy(instance)

    @classmethod
    def query(cls, query: dict) -> typing.Any:
        queryset = cls.objects().raw(query)
        return cls.queryset_to_proxies(queryset)

    @classmethod
    def all(cls) -> typing.List[typing.Any]:
        queryset = cls.objects().all()
        return cls.queryset_to_proxies(queryset)

    @classmethod
    def count(cls, query: dict = {}) -> int:
        return cls.objects().raw(query).count()

    @classmethod
    def queryset_to_proxies(cls, queryset: typing.Iterable) -> typing.List[typing.Any]:
        return [cls.to_proxy(i) for i in queryset]

    @classmethod
    def to_proxy(cls, obj: MongoModel) -> typing.Any:
        return cls.Meta.proxy(obj)
