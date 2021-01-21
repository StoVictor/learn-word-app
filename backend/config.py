import os

from pymodm.connection import connect

from dotenv import load_dotenv

load_dotenv()

MONGO_CONNECTION_URL = os.getenv('MONGO_CONNECTION_URL')
SECRET_KEY = os.getenv('SECRET_KEY')

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ACCESS_EXP_LENGTH = int(os.getenv('ACCESS_EXP_LENGTH'))
REFRESH_EXP_LENGTH = int(os.getenv('REFRESH_EXP_LENGTH'))
JWT_TOKEN_ARGUMENT_NAME = os.getenv('JWT_TOKEN_ARGUMENT_NAME')
JWT_REFRESH_TOKEN_ARGUMENT_NAME = os.getenv('JWT_REFRESH_TOKEN_ARGUMENT_NAME')
DEBUG = os.getenv('DEBUG') == 'True'

connect(MONGO_CONNECTION_URL)
