import graphene

from bson.objectid import ObjectId

from backend.account.objects import PackObjects, TrainingStatistic
from backend.account.proxies import User
from backend.graphqlapi.packs import types, exceptions
from backend.graphqlapi.decorators import access_token_required


class CreatePack(graphene.Mutation):
    pack = graphene.Field(types.Pack)

    class Arguments:
        name = graphene.String(required=True, description="Pack name")
        from_language = graphene.String(required=True, description="Pack from language")
        to_language = graphene.String(required=True, description="Pack to language")
        public = graphene.Boolean(required=False, default_value=False, description="Pack type")

    @access_token_required
    def mutate(self, _info, user, **kwargs):
        return CreatePack(pack=PackObjects.create(owner=user.id, **kwargs))


class EditPack(graphene.Mutation):
    pack = graphene.Field(types.Pack)

    class Arguments:
        pack_id = graphene.ID(required=True, description="Pack id")
        name = graphene.String(required=False, description="Pack name")
        from_language = graphene.String(required=False, description="Pack from language")
        to_language = graphene.String(required=False, description="Pack to language")
        public = graphene.Boolean(required=False, description="Pack type")

    @access_token_required
    def mutate(self, _info, user, pack_id: str, **kwargs):
        if len(kwargs) == 0:
            raise exceptions.EditPackInputError
        pack = PackObjects.from_id(ObjectId(pack_id))
        if not pack.is_user_owner_of_pack(user.id):
            raise exceptions.EditPackError
        pack.update(**kwargs)
        return CreatePack(pack=pack)


class DeletePack(graphene.Mutation):
    output = graphene.Boolean()

    class Arguments:
        pack_id = graphene.ID(required=True, description="Pack id")

    @access_token_required
    def mutate(self, _info, user, pack_id: str):
        pack = PackObjects.from_id(ObjectId(pack_id))
        if not pack.is_user_owner_of_pack(user.id):
            raise exceptions.EditPackError
        pack.delete()
        return DeletePack(output=True)


class WordInput(graphene.InputObjectType):
    word_from = graphene.String(required=True)
    word_to = graphene.String(required=True)


class AddWordsToPack(graphene.Mutation):
    pack = graphene.Field(types.Pack)

    class Arguments:
        pack_id = graphene.ID(required=True, description="Pack id")
        words = graphene.List(WordInput, required=True, description="List of words to add.")

    @access_token_required
    def mutate(self, _info, user, pack_id: str, words: list):
        if len(words) == 0:
            raise exceptions.AddWordsToPackInputError
        pack = PackObjects.from_id(ObjectId(pack_id))
        if not pack.is_user_owner_of_pack(user.id):
            raise exceptions.EditPackError
        pack.add_words(words)
        return AddWordsToPack(pack=pack)


class RemoveWordsFromPack(graphene.Mutation):
    pack = graphene.Field(types.Pack)

    class Arguments:
        pack_id = graphene.ID(required=True, description="Pack id")
        indexes = graphene.List(graphene.Int, required=True, description="List of words indexes to remove.")

    @access_token_required
    def mutate(self, _info, user, pack_id: str, indexes: list):
        if len(indexes) == 0:
            raise exceptions.RemoveWordsFromPackInputError
        pack = PackObjects.from_id(ObjectId(pack_id))
        if not pack.is_user_owner_of_pack(user.id):
            raise exceptions.EditPackError
        pack.remove_words(indexes)
        return AddWordsToPack(pack=pack)


class CreateTrainingStatistic(graphene.Mutation):
    training_statistic = graphene.Field(types.TrainingStatistic)

    class Arguments:
        pack = graphene.ID(required=True)
        correct_answers_number = graphene.Int(required=True)
        words_number = graphene.Int(required=True)

    @access_token_required
    def mutate(self, _info, user, **kwargs):
        training_statistic = TrainingStatistic.create(user=user.id, **kwargs)
        return CreateTrainingStatistic(training_statistic=training_statistic)


class DeleteTrainingStatistic(graphene.Mutation):
    output = graphene.Field(graphene.Boolean)

    class Arguments:
        id = graphene.ID(required=True)

    @access_token_required
    def mutate(self, _info, user, id: str):
        training_statistic = TrainingStatistic.from_id(ObjectId(id))
        if user.id == training_statistic.user:
            training_statistic.delete()
            return DeleteTrainingStatistic(output=True)
        return DeleteTrainingStatistic(output=False)


class Mutation(graphene.ObjectType):
    create_pack = CreatePack.Field()
    add_words_to_pack = AddWordsToPack.Field()
    remove_words_from_pack = RemoveWordsFromPack.Field()
    edit_pack = EditPack.Field()
    delete_pack = DeletePack.Field()

    create_training_statistic = CreateTrainingStatistic.Field()
    delete_training_statistic = DeleteTrainingStatistic.Field()
