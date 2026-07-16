from typing import Any

from sqlalchemy.orm import Session

from app.models.police_models import (
    Accused,
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    District,
    Unit,
    Victim,
)


def build_evidence_checklist(
    crime_type: str,
    brief_facts: str,
) -> list[str]:
    text = f"{crime_type} {brief_facts}".lower()

    checklist = [
        "Verify FIR facts and complainant statement",
        "Record witness statements",
        "Preserve scene-of-crime documentation",
        "Review related FIR and criminal-history records",
    ]

    if any(word in text for word in ["cyber", "online", "bank fraud", "fraud"]):
        checklist.extend(
            [
                "Collect bank transaction records",
                "Preserve mobile, email and device evidence",
                "Request IP address and login-session logs",
                "Trace beneficiary accounts and digital payment trail",
            ]
        )

    if any(word in text for word in ["theft", "vehicle theft", "mobile theft"]):
        checklist.extend(
            [
                "Collect CCTV footage from nearby locations",
                "Verify ownership and purchase documents",
                "Check stolen-property and vehicle databases",
                "Review suspect movement around the incident location",
            ]
        )

    if "robbery" in text:
        checklist.extend(
            [
                "Document victim injuries and medical records",
                "Collect weapon-related evidence",
                "Identify escape route and nearby surveillance footage",
                "Conduct suspect identification procedures",
            ]
        )

    return list(dict.fromkeys(checklist))


def build_investigation_steps(
    crime_type: str,
    status: str,
    accused_count: int,
) -> list[dict[str, Any]]:
    steps = [
        {
            "priority": "High",
            "title": "Validate FIR information",
            "description": (
                "Cross-check the complaint, incident timeline, location "
                "and available supporting records."
            ),
        },
        {
            "priority": "High",
            "title": "Secure and preserve evidence",
            "description": (
                "Collect physical or digital evidence using documented "
                "chain-of-custody procedures."
            ),
        },
        {
            "priority": "Medium",
            "title": "Search related historical cases",
            "description": (
                "Review similar FIR recommendations for recurring methods, "
                "locations and suspect patterns."
            ),
        },
    ]

    if accused_count == 0:
        steps.append(
            {
                "priority": "High",
                "title": "Identify unknown accused",
                "description": (
                    "Use witness accounts, CCTV, digital traces and local "
                    "intelligence to identify possible suspects."
                ),
            }
        )
    else:
        steps.append(
            {
                "priority": "High",
                "title": "Verify accused identity and links",
                "description": (
                    "Validate identity, known associates, previous cases "
                    "and links to the current incident."
                ),
            }
        )

    if "open" in status.lower() or "investigation" in status.lower():
        steps.append(
            {
                "priority": "Medium",
                "title": "Prepare investigation progress review",
                "description": (
                    "Summarize completed actions, pending evidence and "
                    "next investigative deadlines."
                ),
            }
        )

    return steps


def build_risk_alerts(
    crime_type: str,
    status: str,
    brief_facts: str,
) -> list[dict[str, str]]:
    text = f"{crime_type} {brief_facts}".lower()
    alerts = []

    if "open" in status.lower():
        alerts.append(
            {
                "level": "Medium",
                "message": "Case remains open and requires follow-up actions.",
            }
        )

    if "investigation" in status.lower():
        alerts.append(
            {
                "level": "Medium",
                "message": "Investigation is active; pending evidence should be reviewed.",
            }
        )

    if any(word in text for word in ["cyber", "fraud", "online"]):
        alerts.append(
            {
                "level": "High",
                "message": (
                    "Digital evidence may be time-sensitive. Preserve logs "
                    "and transaction data promptly."
                ),
            }
        )

    if "robbery" in text:
        alerts.append(
            {
                "level": "High",
                "message": (
                    "Violent-offence indicators detected. Review victim safety "
                    "and suspect threat level."
                ),
            }
        )

    if not alerts:
        alerts.append(
            {
                "level": "Low",
                "message": "No immediate high-risk rule-based alert detected.",
            }
        )

    return alerts


def get_investigation_assistance(
    db: Session,
    case_id: int,
) -> dict[str, Any] | None:
    row = (
        db.query(
            CaseMaster,
            District.district_name.label("district"),
            Unit.unit_name.label("police_station"),
            CrimeHead.crime_group_name.label("crime_head"),
            CrimeSubHead.crime_head_name.label("crime_sub_head"),
            CaseStatusMaster.case_status_name.label("status"),
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
        .filter(CaseMaster.case_master_id == case_id)
        .first()
    )

    if not row:
        return None

    case = row.CaseMaster
    crime_type = (
        row.crime_sub_head
        or row.crime_head
        or "Not available"
    )
    status = row.status or "Not available"
    brief_facts = case.brief_facts or ""

    victim_count = (
        db.query(Victim)
        .filter(Victim.case_master_id == case_id)
        .count()
    )

    accused_count = (
        db.query(Accused)
        .filter(Accused.case_master_id == case_id)
        .count()
    )

    return {
        "case_master_id": case.case_master_id,
        "crime_no": case.crime_no,
        "case_no": case.case_no,
        "crime_type": crime_type,
        "district": row.district,
        "police_station": row.police_station,
        "status": status,
        "brief_facts": brief_facts,
        "case_entities": {
            "victim_count": victim_count,
            "accused_count": accused_count,
        },
        "evidence_checklist": build_evidence_checklist(
            crime_type=crime_type,
            brief_facts=brief_facts,
        ),
        "recommended_steps": build_investigation_steps(
            crime_type=crime_type,
            status=status,
            accused_count=accused_count,
        ),
        "risk_alerts": build_risk_alerts(
            crime_type=crime_type,
            status=status,
            brief_facts=brief_facts,
        ),
        "assistant_note": (
            "This is a rule-based decision-support output grounded in the "
            "selected FIR. Final investigative decisions must be made by "
            "authorized police personnel."
        ),
    }