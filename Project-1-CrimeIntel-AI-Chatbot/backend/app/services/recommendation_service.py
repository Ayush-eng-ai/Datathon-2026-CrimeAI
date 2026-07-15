import re
from collections import Counter
from typing import Any

from sqlalchemy.orm import Session

from app.models.police_models import (
    CaseMaster,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    District,
    Unit,
)


STOP_WORDS = {
    "the",
    "a",
    "an",
    "and",
    "or",
    "in",
    "on",
    "at",
    "to",
    "from",
    "of",
    "for",
    "was",
    "were",
    "is",
    "are",
    "with",
    "after",
    "before",
    "this",
    "that",
    "case",
    "reported",
    "complaint",
}


def extract_keywords(text: str | None) -> set[str]:
    if not text:
        return set()

    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())

    return {
        word
        for word in words
        if word not in STOP_WORDS
    }


def calculate_keyword_similarity(
    source_text: str | None,
    candidate_text: str | None,
) -> float:
    source_keywords = extract_keywords(source_text)
    candidate_keywords = extract_keywords(candidate_text)

    if not source_keywords or not candidate_keywords:
        return 0.0

    common_keywords = source_keywords.intersection(candidate_keywords)
    total_keywords = source_keywords.union(candidate_keywords)

    return len(common_keywords) / len(total_keywords)


def calculate_similarity(
    selected_case: CaseMaster,
    candidate_case: CaseMaster,
    selected_data: dict[str, Any],
    candidate_data: dict[str, Any],
) -> dict[str, Any]:
    score = 0.0
    reasons = []

    selected_crime_type = (
        selected_data.get("crime_sub_head")
        or selected_data.get("crime_head")
        or ""
    ).lower()

    candidate_crime_type = (
        candidate_data.get("crime_sub_head")
        or candidate_data.get("crime_head")
        or ""
    ).lower()

    if (
        selected_crime_type
        and candidate_crime_type
        and selected_crime_type == candidate_crime_type
    ):
        score += 40
        reasons.append("Same crime type")

    selected_district = (
        selected_data.get("district") or ""
    ).lower()

    candidate_district = (
        candidate_data.get("district") or ""
    ).lower()

    if (
        selected_district
        and candidate_district
        and selected_district == candidate_district
    ):
        score += 20
        reasons.append("Same district")

    selected_status = (
        selected_data.get("status") or ""
    ).lower()

    candidate_status = (
        candidate_data.get("status") or ""
    ).lower()

    if (
        selected_status
        and candidate_status
        and selected_status == candidate_status
    ):
        score += 15
        reasons.append("Same investigation status")

    keyword_similarity = calculate_keyword_similarity(
        selected_case.brief_facts,
        candidate_case.brief_facts,
    )

    keyword_score = keyword_similarity * 25
    score += keyword_score

    if keyword_similarity > 0:
        reasons.append(
            f"Shared case narrative keywords ({round(keyword_similarity * 100)}%)"
        )

    return {
        "similarity_score": round(min(score, 100), 2),
        "match_reasons": reasons,
        "keyword_similarity": round(keyword_similarity, 2),
    }


def get_case_details_query(db: Session):
    return (
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
    )


def get_similar_cases(
    db: Session,
    case_id: int,
    limit: int = 5,
) -> dict[str, Any] | None:
    query = get_case_details_query(db)

    selected_row = (
        query
        .filter(CaseMaster.case_master_id == case_id)
        .first()
    )

    if not selected_row:
        return None

    selected_case = selected_row.CaseMaster

    selected_data = {
        "district": selected_row.district,
        "police_station": selected_row.police_station,
        "crime_head": selected_row.crime_head,
        "crime_sub_head": selected_row.crime_sub_head,
        "status": selected_row.status,
    }

    candidate_rows = (
        query
        .filter(CaseMaster.case_master_id != case_id)
        .all()
    )

    recommendations = []

    for candidate_row in candidate_rows:
        candidate_case = candidate_row.CaseMaster

        candidate_data = {
            "district": candidate_row.district,
            "police_station": candidate_row.police_station,
            "crime_head": candidate_row.crime_head,
            "crime_sub_head": candidate_row.crime_sub_head,
            "status": candidate_row.status,
        }

        similarity = calculate_similarity(
            selected_case=selected_case,
            candidate_case=candidate_case,
            selected_data=selected_data,
            candidate_data=candidate_data,
        )

        if similarity["similarity_score"] <= 0:
            continue

        recommendations.append(
            {
                "case_master_id": candidate_case.case_master_id,
                "crime_no": candidate_case.crime_no,
                "case_no": candidate_case.case_no,
                "crime_registered_date": (
                    candidate_case.crime_registered_date.isoformat()
                    if candidate_case.crime_registered_date
                    else None
                ),
                "crime_type": (
                    candidate_row.crime_sub_head
                    or candidate_row.crime_head
                    or "Not available"
                ),
                "district": candidate_row.district,
                "police_station": candidate_row.police_station,
                "status": candidate_row.status,
                "brief_facts": candidate_case.brief_facts,
                "similarity_score": similarity["similarity_score"],
                "keyword_similarity": similarity["keyword_similarity"],
                "match_reasons": similarity["match_reasons"],
            }
        )

    recommendations.sort(
        key=lambda item: item["similarity_score"],
        reverse=True,
    )

    recommendations = recommendations[:limit]

    return {
        "selected_case": {
            "case_master_id": selected_case.case_master_id,
            "crime_no": selected_case.crime_no,
            "case_no": selected_case.case_no,
            "crime_type": (
                selected_row.crime_sub_head
                or selected_row.crime_head
                or "Not available"
            ),
            "district": selected_row.district,
            "status": selected_row.status,
        },
        "total_recommendations": len(recommendations),
        "recommendations": recommendations,
        "scoring_method": {
            "crime_type": 40,
            "district": 20,
            "status": 15,
            "case_narrative_keywords": 25,
        },
    }