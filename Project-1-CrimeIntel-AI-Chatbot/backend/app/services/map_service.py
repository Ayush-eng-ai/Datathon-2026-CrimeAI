from sqlalchemy.orm import Session

from app.models.police_models import (
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    District,
    GravityOffence,
    Unit,
)


def calculate_risk_level(
    gravity_name: str | None,
    status_name: str | None,
) -> str:
    gravity = (gravity_name or "").lower()
    status = (status_name or "").lower()

    if "heinous" in gravity:
        return "High"

    if "open" in status or "investigation" in status:
        return "Medium"

    return "Low"


def get_crime_locations(db: Session):
    rows = (
        db.query(
            CaseMaster,
            District.district_name.label("district_name"),
            Unit.unit_name.label("police_station_name"),
            CrimeHead.crime_group_name.label("crime_head_name"),
            CrimeSubHead.crime_head_name.label("crime_sub_head_name"),
            CaseStatusMaster.case_status_name.label("status_name"),
            GravityOffence.lookup_value.label("gravity_name"),
        )
        .outerjoin(
            Unit,
            CaseMaster.police_station_id == Unit.unit_id,
        )
        .outerjoin(
            District,
            Unit.district_id == District.district_id,
        )
        .outerjoin(
            CrimeHead,
            CaseMaster.crime_major_head_id == CrimeHead.crime_head_id,
        )
        .outerjoin(
            CrimeSubHead,
            CaseMaster.crime_minor_head_id == CrimeSubHead.crime_sub_head_id,
        )
        .outerjoin(
            CaseStatusMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id,
        )
        .outerjoin(
            GravityOffence,
            CaseMaster.gravity_offence_id
            == GravityOffence.gravity_offence_id,
        )
        .filter(CaseMaster.latitude.isnot(None))
        .filter(CaseMaster.longitude.isnot(None))
        .all()
    )

    locations = []

    for row in rows:
        case = row.CaseMaster

        locations.append(
            {
                "case_master_id": case.case_master_id,
                "crime_no": case.crime_no,
                "case_no": case.case_no,
                "registered_date": (
                    case.crime_registered_date.isoformat()
                    if case.crime_registered_date
                    else None
                ),
                "latitude": float(case.latitude),
                "longitude": float(case.longitude),
                "district": row.district_name,
                "police_station": row.police_station_name,
                "crime_head": row.crime_head_name,
                "crime_type": (
                    row.crime_sub_head_name
                    or row.crime_head_name
                ),
                "status": row.status_name,
                "gravity": row.gravity_name,
                "risk_level": calculate_risk_level(
                    gravity_name=row.gravity_name,
                    status_name=row.status_name,
                ),
                "brief_facts": case.brief_facts,
            }
        )

    return locations


def get_map_summary(db: Session):
    locations = get_crime_locations(db)

    high_risk = sum(
        1 for item in locations
        if item["risk_level"] == "High"
    )

    medium_risk = sum(
        1 for item in locations
        if item["risk_level"] == "Medium"
    )

    low_risk = sum(
        1 for item in locations
        if item["risk_level"] == "Low"
    )

    districts = {
        item["district"]
        for item in locations
        if item["district"]
    }

    return {
        "total_locations": len(locations),
        "total_districts": len(districts),
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk,
    }