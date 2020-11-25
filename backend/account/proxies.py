from backend.account import models

from backend.database.proxies import ModelProxy


class User(ModelProxy):
    class Meta:
        model = models.User
