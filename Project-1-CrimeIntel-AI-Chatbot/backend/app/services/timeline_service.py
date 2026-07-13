from datetime import datetime
from typing import Any

from sqlalchemy.orm import Session

from app.models.police_models import (
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    District,
    Employee,
    Unit,
)


def _to_iso(value: datetime | None) -> str | None:
    if value is None:
        return None

    return value.isoformat()


def _build_event(
    event_type: str,
    title: str,
    description: str,
    event_date: datetime | None,
    status: str,
    order: int,
) -> dict[str, Any]:
    return {
        "event_type": event_type,
        "title": title,
        "description": description,
        "event_date": _to_iso(event_date),
        "status": status,
        "order": order,
    }


def get_case_timeline(
    db: Session,
    case_id: int,
) -> dict[str, Any] | None:
    row = (
        db.query(
            CaseMaster,
            CaseStatusMaster.case_status_name.label("status_name"),
            CrimeHead.crime_group_name.label("crime_head_name"),
            CrimeSubHead.crime_head_name.label("crime_sub_head_name"),
            District.district_name.label("district_name"),
            Unit.unit_name.label("police_station_name"),
            Employee.first_name.label("officer_name"),
        )
        .outerjoin(
            CaseStatusMaster,
            CaseMaster.case_status_id
            == CaseStatusMaster.case_status_id,
        )
        .outerjoin(
            CrimeHead,
            CaseMaster.crime_major_head_id
            == CrimeHead.crime_head_id,
        )
        .outerjoin(
            CrimeSubHead,
            CaseMaster.crime_minor_head_id
            == CrimeSubHead.crime_sub_head_id,
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
            Employee,
            CaseMaster.police_person_id == Employee.employee_id,
        )
        .filter(CaseMaster.case_master_id == case_id)
        .first()
    )

    if not row:
        return None

    case = row.CaseMaster
    events = []

    if case.incident_from_date:
        events.append(
            _build_event(
                event_type="incident_started",
                title="Incident Started",
                description=(
                    "The reported crime incident began at this time."
                ),
                event_date=case.incident_from_date,
                status="completed",
                order=1,
            )
        )

    if case.incident_to_date:
        events.append(
            _build_event(
                event_type="incident_ended",
                title="Incident Ended",
                description=(
                    "The reported incident period ended at this time."
                ),
                event_date=case.incident_to_date,
                status="completed",
                order=2,
            )
        )

    if case.info_received_ps_date:
        events.append(
            _build_event(
                event_type="information_received",
                title="Information Received by Police",
                description=(
                    f"Information was received by "
                    f"{row.police_station_name or 'the police station'}."
                ),
                event_date=case.info_received_ps_date,
                status="completed",
                order=3,
            )
        )

    registration_datetime = None

    if case.crime_registered_date:
        registration_datetime = datetime.combine(
            case.crime_registered_date,
            datetime.min.time(),
        )

        events.append(
            _build_event(
                event_type="fir_registered",
                title="FIR Registered",
                description=(
                    f"Crime No. {case.crime_no} was registered by "
                    f"{row.officer_name or 'the assigned officer'}."
                ),
                event_date=registration_datetime,
                status="completed",
                order=4,
            )
        )

    events.append(
        _build_event(
            event_type="current_status",
            title="Current Case Status",
            description=(
                f"The case is currently marked as "
                f"{row.status_name or 'Status not available'}."
            ),
            event_date=registration_datetime,
            status="current",
            order=5,
        )
    )

    events.sort(
        key=lambda item: (
            item["event_date"] is None,
            item["event_date"] or "",
            item["order"],
        )
    )

    return {
        "case_master_id": case.case_master_id,
        "crime_no": case.crime_no,
        "case_no": case.case_no,
        "crime_type": (
            row.crime_sub_head_name
            or row.crime_head_name
            or "Not available"
        ),
        "district": row.district_name,
        "police_station": row.police_station_name,
        "current_status": row.status_name,
        "brief_facts": case.brief_facts,
        "total_events": len(events),
        "timeline_source": "Derived from official FIR date and status fields",
        "events": events,
    }
