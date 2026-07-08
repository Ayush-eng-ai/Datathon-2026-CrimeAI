from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services import dashboard_service


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard Analytics"]
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    return dashboard_service.get_dashboard_stats(db)