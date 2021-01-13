from graphene import List, String, Boolean, ObjectType

from bson.objectid import ObjectId

from backend.graphqlapi.packs import types
from backend.graphqlapi.decorators import access_token_required
from backend.account.objects import PackObjects


class Query(ObjectType):
    packs = List(types.Pack,
                 owner_id=String(required=False, description="Pack owner id"),
                 private=Boolean(required=False, description="Only private packs"))

    @access_token_required
    def resolve_packs(self, _info, user, owner_id: str = None, private: bool = False):
        # TODO: add arg like "me" to get current user packs
        if owner_id is None:
            return PackObjects.query({'public': True})
        if ObjectId(owner_id) == user.id:
            query = {'owner': user.id}
            if private is True:
                query['public'] = False
            return PackObjects.query(query)
        return PackObjects.query({'owner': user.id, 'public': True})
