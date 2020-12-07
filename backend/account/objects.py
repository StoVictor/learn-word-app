from werkzeug.security import generate_password_hash

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
