from __future__ import annotations

from typing import Any

from sqlalchemy import extract, or_
from sqlalchemy.orm import Session

from app.models.police_models import (
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    District,
    Unit,
)
from app.services.ai_query_service import extract_ai_intent


def calculate_relevance_score(
    case: CaseMaster,
    intent: dict[str, Any],
    district_name: str | None,
    police_station_name: str | None,
    crime_head_name: str | None,
    crime_sub_head_name: str | None,
    status_name: str | None,
) -> float:
    score = 0.20
    matched_signals = 0
    total_signals = 0

    case_text = (case.brief_facts or "").lower()

    if intent["crime_types"]:
        total_signals += 1

        crime_matches = [
            keyword
            for keyword in intent["crime_types"]
            if (
                keyword in case_text
                or keyword in (crime_head_name or "").lower()
                or keyword in (crime_sub_head_name or "").lower()
            )
        ]

        if crime_matches:
            matched_signals += 1

    if intent["locations"]:
        total_signals += 1

        location_text = " ".join(
            [
                district_name or "",
                police_station_name or "",
                case.brief_facts or "",
            ]
        ).lower()

        if any(
            location in location_text
            for location in intent["locations"]
        ):
            matched_signals += 1

    if intent["status"]:
        total_signals += 1

        if intent["status"].lower() in (status_name or "").lower():
            matched_signals += 1

    if intent["year"]:
        total_signals += 1

        if (
            case.crime_registered_date
            and case.crime_registered_date.year == intent["year"]
        ):
            matched_signals += 1

    if intent["case_number"]:
        total_signals += 1

        if case.case_no == intent["case_number"]:
            matched_signals += 1

    if intent["crime_number"]:
        total_signals += 1

        if case.crime_no == intent["crime_number"]:
            matched_signals += 1

    if total_signals > 0:
        score += (matched_signals / total_signals) * 0.80

    return round(min(score, 1.0), 2)


def retrieve_matching_cases(
    db: Session,
    query_text: str,
    limit: int = 10,
) -> dict[str, Any]:
    intent = extract_ai_intent(query_text)

    query = (
        db.query(
            CaseMaster,
            District.district_name.label("district_name"),
            Unit.unit_name.label("police_station_name"),
            CrimeHead.crime_group_name.label("crime_head_name"),
            CrimeSubHead.crime_head_name.label("crime_sub_head_name"),
            CaseStatusMaster.case_status_name.label("status_name"),
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
    )

    if intent["crime_types"]:
        crime_filters = []

        for keyword in intent["crime_types"]:
            pattern = f"%{keyword}%"

            crime_filters.extend(
                [
                    CaseMaster.brief_facts.ilike(pattern),
                    CrimeHead.crime_group_name.ilike(pattern),
                    CrimeSubHead.crime_head_name.ilike(pattern),
                ]
            )

        query = query.filter(or_(*crime_filters))

    if intent["locations"]:
        location_filters = []

        for location in intent["locations"]:
            pattern = f"%{location}%"

            location_filters.extend(
                [
                    District.district_name.ilike(pattern),
                    Unit.unit_name.ilike(pattern),
                    CaseMaster.brief_facts.ilike(pattern),
                ]
            )

        query = query.filter(or_(*location_filters))
    if intent["status"]:
        query = query.filter(
            CaseStatusMaster.case_status_name.ilike(
                f"%{intent['status']}%"
            )
        )

    if intent["year"]:
        query = query.filter(
            extract(
                "year",
                CaseMaster.crime_registered_date,
            )
            == intent["year"]
        )

    if intent["case_number"]:
        query = query.filter(
            CaseMaster.case_no == intent["case_number"]
        )

    if intent["crime_number"]:
        query = query.filter(
            CaseMaster.crime_no == intent["crime_number"]
        )

    rows = query.limit(limit).all()

    evidence = []

    for row in rows:
        case = row.CaseMaster

        relevance_score = calculate_relevance_score(
            case=case,
            intent=intent,
            district_name=row.district_name,
            police_station_name=row.police_station_name,
            crime_head_name=row.crime_head_name,
            crime_sub_head_name=row.crime_sub_head_name,
            status_name=row.status_name,
        )
        evidence.append(
            {
                "case_master_id": case.case_master_id,
                "crime_no": case.crime_no,
                "case_no": case.case_no,
                "crime_registered_date": (
                    case.crime_registered_date.isoformat()
                    if case.crime_registered_date
                    else None
                ),
                "district": row.district_name,
                "police_station": row.police_station_name,
                "crime_head": row.crime_head_name,
                "crime_sub_head": row.crime_sub_head_name,
                "status": row.status_name,
                "brief_facts": case.brief_facts,
                "latitude": (
                    float(case.latitude)
                    if case.latitude is not None
                    else None
                ),
                "longitude": (
                    float(case.longitude)
                    if case.longitude is not None
                    else None
                ),
                "relevance_score": relevance_score,
            }
        )

    evidence.sort(
        key=lambda item: item["relevance_score"],
        reverse=True,
    )

    return {
        "query": query_text,
        "intent": intent,
        "total_matches": len(evidence),
        "evidence": evidence,
    }


def generate_grounded_answer(
    query_text: str,
    retrieval_result: dict[str, Any],
) -> str:
    evidence = retrieval_result["evidence"]
    intent = retrieval_result["intent"]

    if not evidence:
        return (
            "No matching FIR records were found for this query.\n\n"
            "Detected filters:\n"
            f"- Crime types: {', '.join(intent['crime_types']) or 'Any'}\n"
            f"- Locations: {', '.join(intent['locations']) or 'Any'}\n"
            f"- Status: {intent['status'] or 'Any'}\n"
            f"- Year: {intent['year'] or 'Any'}"
        )

    lines = [
        f"I found {len(evidence)} matching FIR record(s).",
        "",
        "Query Understanding:",
        f"- Intent: {intent['intent']}",
        f"- Crime types: {', '.join(intent['crime_types']) or 'Any'}",
        f"- Locations: {', '.join(intent['locations']) or 'Any'}",
        f"- Status: {intent['status'] or 'Any'}",
        f"- Year: {intent['year'] or 'Any'}",
        f"- Confidence: {int(intent['confidence'] * 100)}%",
        "",
        "Evidence:",
    ]

    for index, item in enumerate(evidence, start=1):
        lines.extend(
            [
                "",
                f"{index}. Crime No: {item['crime_no']}",
                f"   Case No: {item['case_no']}",
                f"   District: {item['district'] or 'Not available'}",
                f"   Police Station: {item['police_station'] or 'Not available'}",
                f"   Crime Type: {item['crime_sub_head'] or item['crime_head'] or 'Not available'}",
                f"   Status: {item['status'] or 'Not available'}",
                f"   Date: {item['crime_registered_date'] or 'Not available'}",
                f"   Relevance: {int(item['relevance_score'] * 100)}%",
                f"   Facts: {item['brief_facts'] or 'No brief facts available'}",
            ]
        )

    lines.extend(
        [
            "",
            "Grounding Note:",
            "This response is generated only from FIR records retrieved from the PostgreSQL crime database.",
        ]
    )

    return "\n".join(lines)