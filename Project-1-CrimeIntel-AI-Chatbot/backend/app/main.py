from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Karnataka State Police CrimeIntel AI Chatbot",
    version=settings.API_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "CrimeIntel AI Backend is running successfully!",
        "frontend_allowed": settings.FRONTEND_URL,
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CrimeIntel AI Backend",
        "version": settings.API_VERSION,
    }