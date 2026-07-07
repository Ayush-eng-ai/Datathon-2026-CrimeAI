from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine, Base
from app.models import police_models, ai_models
from app.routes.case_routes import router as case_router
from app.routes.search_routes import router as search_router

Base.metadata.create_all(bind=engine)

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
app.include_router(case_router)
app.include_router(search_router)

@app.get("/")
def root():
    return {
        "message": "CrimeIntel AI Backend is running successfully!",
        "database": "Tables created successfully",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CrimeIntel AI Backend",
        "version": settings.API_VERSION,
        "database": "connected",
    }