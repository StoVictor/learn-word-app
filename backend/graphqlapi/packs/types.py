from graphene import String, Field, Boolean, List, ID
from graphene.types.objecttype import ObjectType

from backend.account import proxies


class Word(ObjectType):
    word_from = String()
    word_to = String()


class Pack(ObjectType):
    id = ID()
    name = String()
    owner = Field('backend.graphqlapi.account.types.User')
    public = Boolean()
    from_language = String()
    to_language = String()
    words = List(Word)
    subscribed_packs = List(lambda: Pack)

    def resolve_owner(self, _info):
        return proxies.User(self.owner)

    def resolve_subscribed_packs(self, _info):
        return [proxies.Pack(pack) for pack in self.subscribed_packs]
