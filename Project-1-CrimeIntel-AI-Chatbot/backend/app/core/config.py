from pydantic import BaseModel
from dotenv import load_dotenv
import os


load_dotenv()


class Settings(BaseModel):
    PROJECT_NAME: str = "CrimeIntel AI Backend"
    API_VERSION: str = "1.0.0"

    FRONTEND_URL: str = "http://localhost:5173"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:your_password@localhost:5432/crimeintel_db"
    )


settings = Settings()