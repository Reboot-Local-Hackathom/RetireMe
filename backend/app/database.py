from mongoengine.connection import connect
from app.env_settings import get_settings


def connect_db():
    connect(db=get_settings().MONGO_DB, host=get_settings().MONGO_HOST,
            port=get_settings().MONGO_PORT)
