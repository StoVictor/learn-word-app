from flask import Flask, render_template
from flask_graphql import GraphQLView
from flask_graphql_auth import GraphQLAuth
from flask_cors import CORS

from backend.graphqlapi.schema import schema
from backend import config

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
app.config["ACCESS_EXP_LENGTH"] = config.ACCESS_EXP_LENGTH
app.config["REFRESH_EXP_LENGTH"] = config.REFRESH_EXP_LENGTH
app.config["JWT_TOKEN_ARGUMENT_NAME"] = config.JWT_TOKEN_ARGUMENT_NAME
app.config["JWT_REFRESH_TOKEN_ARGUMENT_NAME"] = config.JWT_REFRESH_TOKEN_ARGUMENT_NAME

auth = GraphQLAuth(app)

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)


@app.route('/')
def hello_world():
    return render_template('index.html')

app.run()
