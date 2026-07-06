from pydantic import BaseModel


class Settings(BaseModel):
    PROJECT_NAME: str = "CrimeIntel AI Backend"
    API_VERSION: str = "1.0.0"

    FRONTEND_URL: str = "http://localhost:5173"


settings = Settings()