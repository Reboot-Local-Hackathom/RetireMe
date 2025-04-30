# Env vars

## FACILITATES ENVIRONMENT VARIABLES

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Retire me"
    MONGO_HOST: str
    MONGO_PORT: int  # Is this int or str?
    MONGO_DB: str
    JWT_PRIV_KEY: str
    

    model_config = SettingsConfigDict(env_file="../.env")


settings = Settings()
