from werkzeug.security import generate_password_hash

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
