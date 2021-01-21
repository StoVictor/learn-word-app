import typing


class ModelProxy:
    class Meta:
        model = None

    @classmethod
    def create_instance(cls, **kwargs) -> typing.Any:
        model_instance = cls.Meta.model(**kwargs)
        return cls(model_instance)

    @property
    def id(self):
        return self._obj._id

    @property
    def origin(self):
        return self._obj

    def __init__(self, obj: typing.Any) -> None:
        self._obj = obj

    def __getattr__(self, name: str) -> typing.Any:
        return getattr(self._obj, name)

    def update(self, **kwargs) -> None:
        self.change(**kwargs)
        self.save()

    def change(self, **kwargs) -> None:
        for field in kwargs:
            setattr(self._obj, field, kwargs[field])

    def save(self) -> typing.Any:
        self._obj.save()
        return self

    def delete(self) -> None:
        self._obj.delete()
