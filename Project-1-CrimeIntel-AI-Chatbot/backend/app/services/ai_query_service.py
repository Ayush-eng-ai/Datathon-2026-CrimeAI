import re
from typing import Any


CRIME_KEYWORDS = [
    "theft",
    "vehicle theft",
    "mobile theft",
    "robbery",
    "cyber crime",
    "cyber",
    "online fraud",
    "bank fraud",
    "fraud",
    "murder",
    "assault",
    "ndps",
]

LOCATION_KEYWORDS = [
    "bengaluru",
    "bangalore",
    "mysuru",
    "mangaluru",
    "hubballi",
    "belagavi",
]

STATUS_KEYWORDS = {
    "solved": "Solved",
    "open": "Open",
    "under investigation": "Under Investigation",
    "investigation": "Under Investigation",
}


def _find_phrases(text: str, phrases: list[str]) -> list[str]:
    """
    Find phrases without returning unnecessary duplicates.

    Example:
    'vehicle theft' should be preferred over both
    'vehicle theft' and 'theft'.
    """
    matches: list[str] = []

    for phrase in sorted(phrases, key=len, reverse=True):
        if phrase in text:
            if not any(phrase in existing or existing in phrase for existing in matches):
                matches.append(phrase)

    return matches


def _detect_intent(text: str) -> str:
    if any(word in text for word in ["summary", "summarize", "brief"]):
        return "case_summary"

    if any(word in text for word in ["report", "pdf", "export"]):
        return "report_generation"

    if any(word in text for word in ["similar", "related", "matching case"]):
        return "similar_case_search"

    return "crime_search"


def _calculate_confidence(intent_data: dict[str, Any]) -> float:
    signals = 0
    matched_signals = 0

    checks = [
        bool(intent_data["crime_types"]),
        bool(intent_data["locations"]),
        intent_data["status"] is not None,
        intent_data["year"] is not None,
        intent_data["case_number"] is not None,
        intent_data["crime_number"] is not None,
    ]

    for check in checks:
        signals += 1
        if check:
            matched_signals += 1

    # Base confidence represents successful intent classification.
    confidence = 0.40 + (matched_signals / signals) * 0.60

    return round(min(confidence, 1.0), 2)


def extract_ai_intent(query: str) -> dict[str, Any]:
    text = query.strip().lower()

    crime_types = _find_phrases(text, CRIME_KEYWORDS)
    locations = _find_phrases(text, LOCATION_KEYWORDS)

    locations = [
        "bengaluru" if location == "bangalore" else location
        for location in locations
    ]

    status = None
    for keyword, normalized_status in STATUS_KEYWORDS.items():
        if keyword in text:
            status = normalized_status
            break

    year_match = re.search(r"\b(20\d{2})\b", text)
    year = int(year_match.group(1)) if year_match else None

    case_number_match = re.search(
        r"\b20\d{7}\b",
        text,
    )
    case_number = (
        case_number_match.group(0)
        if case_number_match
        else None
    )

    crime_number_match = re.search(
        r"\b\d{18}\b",
        text,
    )
    crime_number = (
        crime_number_match.group(0)
        if crime_number_match
        else None
    )

    detected_intent = _detect_intent(text)

    explanation = [
        f"Detected user intent: {detected_intent}.",
    ]

    if crime_types:
        explanation.append(
            f"Detected crime type keywords: {', '.join(crime_types)}."
        )

    if locations:
        explanation.append(
            f"Detected location keywords: {', '.join(locations)}."
        )

    if status:
        explanation.append(
            f"Detected case status: {status}."
        )

    if year:
        explanation.append(
            f"Detected registration year: {year}."
        )

    if case_number:
        explanation.append(
            f"Detected case number: {case_number}."
        )

    if crime_number:
        explanation.append(
            f"Detected crime number: {crime_number}."
        )

    intent_data = {
        "intent": detected_intent,
        "crime_types": crime_types,
        "locations": locations,
        "status": status,
        "year": year,
        "case_number": case_number,
        "crime_number": crime_number,
    }

    intent_data["confidence"] = _calculate_confidence(intent_data)
    intent_data["explanation"] = explanation

    return intent_data