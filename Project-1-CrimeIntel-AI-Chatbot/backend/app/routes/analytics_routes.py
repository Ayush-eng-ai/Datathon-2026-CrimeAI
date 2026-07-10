from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services import analytics_service


router = APIRouter(
    prefix="/api/analytics",
    tags=["Crime Analytics"],
)


@router.get("/crime-by-district")
def crime_by_district(db: Session = Depends(get_db)):
    data = analytics_service.get_crime_by_district(db)

    return {
        "total_districts": len(data),
        "data": data,
    }


@router.get("/crime-by-type")
def crime_by_type(db: Session = Depends(get_db)):
    data = analytics_service.get_crime_by_type(db)

    return {
        "total_types": len(data),
        "data": data,
    }


@router.get("/monthly-trend")
def monthly_trend(db: Session = Depends(get_db)):
    data = analytics_service.get_monthly_trend(db)

    return {
        "total_periods": len(data),
        "data": data,
    }


@router.get("/case-status")
def case_status(db: Session = Depends(get_db)):
    data = analytics_service.get_case_status_analytics(db)

    return {
        "total_statuses": len(data),
        "data": data,
    }


@router.get("/dashboard-summary")
def dashboard_summary(db: Session = Depends(get_db)):
    return analytics_service.get_dashboard_summary(db)