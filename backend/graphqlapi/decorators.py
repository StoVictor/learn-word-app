from functools import wraps
import jwt
import base64
from flask import request, current_app
from flask_graphql_auth import get_jwt_identity

from flask_graphql_auth.decorators import (
    verify_jwt_in_argument,
    verify_refresh_jwt_in_argument,
    _extract_header_token_value
)

from backend.account.objects import UserObjects


def access_token_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(request.headers)
        token = _extract_header_token_value(request.headers)
        verify_jwt_in_argument(token)
        current_user_email = get_jwt_identity()
        user = UserObjects.from_email(current_user_email)
        return function(*args, user, **kwargs)

    return wrapper


def mutation_refresh_token_required(function):
    @wraps(function)
    def wrapper(cls, info, **kwargs):
        token = _extract_header_token_value(request.headers)
        verify_refresh_jwt_in_argument(token)
        return function(info, **kwargs)

    return wrapper
