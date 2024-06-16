from pydantic import Field
from pydantic_settings import BaseSettings


class AppSettings(BaseSettings):
    app_host: str = Field("192.168.0.105", env="APP_HOST")
    app_port: str = Field("8000", env="APP_PORT")


settings: AppSettings = AppSettings()