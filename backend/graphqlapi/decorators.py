from functools import wraps

from flask import request

from flask_graphql_auth.decorators import (
    verify_jwt_in_argument,
    verify_refresh_jwt_in_argument,
    _extract_header_token_value
)


def query_access_token_required(function):
    @wraps(function)
    def wrapper(self, info, **kwargs):
        token = _extract_header_token_value(request.headers)
        verify_jwt_in_argument(token)
        return function(self, info, **kwargs)

    return wrapper


def query_refresh_token_required(function):
    @wraps(function)
    def wrapper(self, info, **kwargs):
        token = _extract_header_token_value(request.headers)
        verify_refresh_jwt_in_argument(token)
        return function(self, info, **kwargs)

    return wrapper


def mutation_access_token_required(function):
    @wraps(function)
    def wrapper(cls, info, **kwargs):
        token = _extract_header_token_value(request.headers)
        verify_jwt_in_argument(token)
        return function(cls, info, **kwargs)

    return wrapper


def mutation_refresh_token_required(function):
    @wraps(function)
    def wrapper(cls, info, **kwargs):
        token = _extract_header_token_value(request.headers)
        verify_refresh_jwt_in_argument(token)
        return function(info, **kwargs)

    return wrapper
