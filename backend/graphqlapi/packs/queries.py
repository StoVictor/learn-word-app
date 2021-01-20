from graphene import List, String, Boolean, ObjectType, Field

from bson.objectid import ObjectId

from backend.graphqlapi.packs import types, exceptions
from backend.graphqlapi.decorators import access_token_required
from backend.account.objects import PackObjects, TrainingStatistic, UserObjects


class Query(ObjectType):
    packs = List(types.Pack,
                 owner_id=String(required=False, description="Pack owner id"),
                 private=Boolean(required=False, description="Only private packs"))

    @access_token_required
    def resolve_packs(self, _info, user, owner_id: str = None, private: bool = False):
        if owner_id is None:
            return PackObjects.query({'public': True})
        if ObjectId(owner_id) == user.id:
            query = {'owner': user.id}
            if private is True:
                query['public'] = False
            return PackObjects.query(query)
        return PackObjects.query({'owner': user.id, 'public': True})

    pack = Field(types.Pack, pack=String(required=True))

    @access_token_required
    def resolve_pack(self, _info, user, pack: str):
        pack = PackObjects.from_id(ObjectId(pack))
        if pack.is_user_owner_of_pack(user.id) is True or pack.public is True:
            return pack
        raise exceptions.PrivatePuckError()

    user_training_statistic = List(types.TrainingStatistic,
                                   user=String(required=True)
                                   )

    @access_token_required
    def resolve_user_training_statistic(self, _info, auth_user, user: str):
        user = UserObjects.from_id(ObjectId(user))
        return TrainingStatistic.get_user_statistics(user.id)

    pack_training_statistic = List(types.TrainingStatistic,
                                   pack=String(required=True)
                                   )

    @access_token_required
    def resolve_pack_training_statistic(self, _info, user, pack: str):
        pack = PackObjects.from_id(ObjectId(pack))
        return TrainingStatistic.get_pack_statistics(pack.id)
