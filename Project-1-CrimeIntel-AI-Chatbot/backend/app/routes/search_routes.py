from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.db.database import get_db
from app.models.police_models import CaseMaster, Victim, Accused, Unit
from app.schemas.search_schema import CrimeSearchParams


router = APIRouter(
    prefix="/api/search",
    tags=["Crime Search"]
)


@router.get("/crimes")
def search_crimes(
    crime_no: str | None = Query(default=None),
    case_no: str | None = Query(default=None),
    keyword: str | None = Query(default=None),
    start_date: str | None = Query(default=None),
    end_date: str | None = Query(default=None),
    police_station_id: int | None = Query(default=None),
    district_id: int | None = Query(default=None),
    crime_major_head_id: int | None = Query(default=None),
    crime_minor_head_id: int | None = Query(default=None),
    case_status_id: int | None = Query(default=None),
    victim_name: str | None = Query(default=None),
    accused_name: str | None = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(CaseMaster)

    if crime_no:
        query = query.filter(CaseMaster.crime_no.ilike(f"%{crime_no}%"))

    if case_no:
        query = query.filter(CaseMaster.case_no.ilike(f"%{case_no}%"))

    if keyword:
        query = query.filter(CaseMaster.brief_facts.ilike(f"%{keyword}%"))

    if start_date:
        query = query.filter(CaseMaster.crime_registered_date >= start_date)

    if end_date:
        query = query.filter(CaseMaster.crime_registered_date <= end_date)

    if police_station_id:
        query = query.filter(CaseMaster.police_station_id == police_station_id)

    if crime_major_head_id:
        query = query.filter(CaseMaster.crime_major_head_id == crime_major_head_id)

    if crime_minor_head_id:
        query = query.filter(CaseMaster.crime_minor_head_id == crime_minor_head_id)

    if case_status_id:
        query = query.filter(CaseMaster.case_status_id == case_status_id)

    if district_id:
        query = query.join(Unit, CaseMaster.police_station_id == Unit.unit_id)
        query = query.filter(Unit.district_id == district_id)

    if victim_name:
        query = query.join(Victim, CaseMaster.case_master_id == Victim.case_master_id)
        query = query.filter(Victim.victim_name.ilike(f"%{victim_name}%"))

    if accused_name:
        query = query.join(Accused, CaseMaster.case_master_id == Accused.case_master_id)
        query = query.filter(Accused.accused_name.ilike(f"%{accused_name}%"))

    results = query.all()

    return {
        "total_results": len(results),
        "filters_applied": {
            "crime_no": crime_no,
            "case_no": case_no,
            "keyword": keyword,
            "start_date": start_date,
            "end_date": end_date,
            "police_station_id": police_station_id,
            "district_id": district_id,
            "crime_major_head_id": crime_major_head_id,
            "crime_minor_head_id": crime_minor_head_id,
            "case_status_id": case_status_id,
            "victim_name": victim_name,
            "accused_name": accused_name
        },
        "data": results
    }
