from sqlalchemy import extract, func
from sqlalchemy.orm import Session

from app.models.police_models import (
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    District,
    Unit,
)


def get_crime_by_district(db: Session):
    results = (
        db.query(
            District.district_name.label("district"),
            func.count(CaseMaster.case_master_id).label("total_cases"),
        )
        .join(Unit, Unit.district_id == District.district_id)
        .join(CaseMaster, CaseMaster.police_station_id == Unit.unit_id)
        .group_by(District.district_id, District.district_name)
        .order_by(func.count(CaseMaster.case_master_id).desc())
        .all()
    )

    return [
        {
            "district": row.district,
            "total_cases": row.total_cases,
        }
        for row in results
    ]


def get_crime_by_type(db: Session):
    results = (
        db.query(
            CrimeHead.crime_group_name.label("crime_type"),
            func.count(CaseMaster.case_master_id).label("total_cases"),
        )
        .join(
            CaseMaster,
            CaseMaster.crime_major_head_id == CrimeHead.crime_head_id,
        )
        .group_by(CrimeHead.crime_head_id, CrimeHead.crime_group_name)
        .order_by(func.count(CaseMaster.case_master_id).desc())
        .all()
    )

    return [
        {
            "crime_type": row.crime_type,
            "total_cases": row.total_cases,
        }
        for row in results
    ]


def get_monthly_trend(db: Session):
    results = (
        db.query(
            extract("year", CaseMaster.crime_registered_date).label("year"),
            extract("month", CaseMaster.crime_registered_date).label("month"),
            func.count(CaseMaster.case_master_id).label("total_cases"),
        )
        .group_by(
            extract("year", CaseMaster.crime_registered_date),
            extract("month", CaseMaster.crime_registered_date),
        )
        .order_by(
            extract("year", CaseMaster.crime_registered_date),
            extract("month", CaseMaster.crime_registered_date),
        )
        .all()
    )

    return [
        {
            "year": int(row.year),
            "month": int(row.month),
            "total_cases": row.total_cases,
        }
        for row in results
    ]


def get_case_status_analytics(db: Session):
    results = (
        db.query(
            CaseStatusMaster.case_status_name.label("status"),
            func.count(CaseMaster.case_master_id).label("total_cases"),
        )
        .join(
            CaseMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id,
        )
        .group_by(
            CaseStatusMaster.case_status_id,
            CaseStatusMaster.case_status_name,
        )
        .order_by(func.count(CaseMaster.case_master_id).desc())
        .all()
    )

    return [
        {
            "status": row.status,
            "total_cases": row.total_cases,
        }
        for row in results
    ]


def get_dashboard_summary(db: Session):
    total_cases = db.query(CaseMaster).count()

    solved_cases = (
        db.query(CaseMaster)
        .join(
            CaseStatusMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id,
        )
        .filter(CaseStatusMaster.case_status_name.ilike("%solved%"))
        .count()
    )

    open_cases = (
        db.query(CaseMaster)
        .join(
            CaseStatusMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id,
        )
        .filter(CaseStatusMaster.case_status_name.ilike("%open%"))
        .count()
    )

    investigation_cases = (
        db.query(CaseMaster)
        .join(
            CaseStatusMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id,
        )
        .filter(
            CaseStatusMaster.case_status_name.ilike(
                "%under investigation%"
            )
        )
        .count()
    )

    return {
        "total_cases": total_cases,
        "solved_cases": solved_cases,
        "open_cases": open_cases,
        "under_investigation": investigation_cases,
    }