from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine, Base
from app.models import police_models, ai_models
from app.routes.case_routes import router as case_router
from app.routes.search_routes import router as search_router
from app.routes.chat_routes import router as chat_router
from app.routes.summary_routes import router as summary_router
from app.routes.report_routes import router as report_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.ai_query_routes import router as ai_query_router
from app.routes.retrieval_routes import router as retrieval_router
from app.routes.map_routes import router as map_router
from app.routes.timeline_routes import router as timeline_router
from app.routes.recommendation_routes import router as recommendation_router


from app.routes.investigation_routes import router as investigation_router
from app.routes.gemini_routes import router as gemini_router

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
app.include_router(chat_router)
app.include_router(summary_router)
app.include_router(report_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(ai_query_router)
app.include_router(retrieval_router)
app.include_router(map_router)
app.include_router(timeline_router)
app.include_router(recommendation_router)
app.include_router(investigation_router)
app.include_router(gemini_router)

from app.routes.investigation_routes import router as investigation_router

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