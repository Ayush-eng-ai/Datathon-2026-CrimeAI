from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services import map_service


router = APIRouter(
    prefix="/api/map",
    tags=["Crime Intelligence Map"],
)


@router.get("/crime-locations")
def crime_locations(db: Session = Depends(get_db)):
    locations = map_service.get_crime_locations(db)

    return {
        "total_locations": len(locations),
        "data": locations,
    }


@router.get("/summary")
def map_summary(db: Session = Depends(get_db)):
    return map_service.get_map_summary(db)