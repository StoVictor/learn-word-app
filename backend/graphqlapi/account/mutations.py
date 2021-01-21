import graphene
from flask_graphql_auth import create_access_token, create_refresh_token, get_jwt_identity
from werkzeug.security import check_password_hash

from backend.graphqlapi.account import types
from backend.account.objects import UserObjects
from backend.graphqlapi.decorators import mutation_refresh_token_required


class CreateUser(graphene.Mutation):
    user = graphene.Field(types.User)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username: str, password: str, email: str):
        user = UserObjects.create(username, password, email)
        return CreateUser(user=user)


class AuthMutation(graphene.Mutation):
    access_token = graphene.String()
    refresh_token = graphene.String()
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    def mutate(self, info, email: str, password: str):
        user = UserObjects.from_email(email)
        if not check_password_hash(user.password, password):
            raise Exception('Authenication Failure : User password is not correct!')
        return AuthMutation(
            access_token=create_access_token(user.email),
            refresh_token=create_refresh_token(user.email)
        )


class RefreshMutation(graphene.Mutation):
    new_token = graphene.String()

    @mutation_refresh_token_required
    def mutate(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return RefreshMutation(new_token=new_access_token)


class Mutation(graphene.ObjectType):
    authenticate_user = AuthMutation.Field()
    create_user = CreateUser.Field()
    refresh = RefreshMutation.Field()
