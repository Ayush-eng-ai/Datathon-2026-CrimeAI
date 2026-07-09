from sqlalchemy import or_, extract
from sqlalchemy.orm import Session

from app.models.ai_models import ChatMessage
from app.models.police_models import CaseMaster, Unit, District, CaseStatusMaster
from app.schemas.chat_schema import ChatRequest


def extract_search_intent(question: str):
    text = question.lower()

    intent = {
        "crime_keywords": [],
        "location_keywords": [],
        "status": None,
        "year": None,
    }

    crime_words = [
        "theft",
        "robbery",
        "cyber",
        "fraud",
        "vehicle theft",
        "mobile theft",
        "bank fraud",
        "online fraud",
    ]

    location_words = [
        "bengaluru",
        "bangalore",
        "mysuru",
        "mangaluru",
        "hubballi",
        "belagavi",
    ]

    for word in crime_words:
        if word in text:
            intent["crime_keywords"].append(word)

    for word in location_words:
        if word in text:
            intent["location_keywords"].append(word)

    if "solved" in text:
        intent["status"] = "Solved"
    elif "open" in text:
        intent["status"] = "Open"
    elif "investigation" in text:
        intent["status"] = "Under Investigation"

    import re

    year = re.search(r"\b20\d{2}\b", text)
    if year:
        intent["year"] = int(year.group())

    return intent


def search_cases_from_intent(db: Session, intent: dict):
    query = db.query(CaseMaster)

    for keyword in intent["crime_keywords"]:
        query = query.filter(CaseMaster.brief_facts.ilike(f"%{keyword}%"))

    if intent["location_keywords"]:
        query = query.join(Unit, CaseMaster.police_station_id == Unit.unit_id)
        query = query.join(District, Unit.district_id == District.district_id)

        location_filters = []

        for location in intent["location_keywords"]:
            if location == "bangalore":
                location = "bengaluru"

            location_filters.append(
                District.district_name.ilike(f"%{location}%")
            )

        query = query.filter(or_(*location_filters))

    if intent["year"]:
        query = query.filter(
            extract("year", CaseMaster.crime_registered_date) == intent["year"]
        )

    if intent["status"]:
        query = query.join(
            CaseStatusMaster,
            CaseMaster.case_status_id == CaseStatusMaster.case_status_id
        )

        query = query.filter(
            CaseStatusMaster.case_status_name.ilike(f"%{intent['status']}%")
        )

    return query.limit(10).all()


def generate_database_answer(db: Session, question: str):
    intent = extract_search_intent(question)
    results = search_cases_from_intent(db, intent)

    if not results:
        return (
            "No matching crime records found in the current database.\n"
            "Try asking: 'Show theft cases in Bengaluru' or 'Find cyber fraud cases in Mysuru'."
        )

    lines = [
        f"I found {len(results)} matching crime record(s).",
        "",
        "Search Understanding:",
        f"- Crime Keywords: {', '.join(intent['crime_keywords']) or 'Not specified'}",
        f"- Location Keywords: {', '.join(intent['location_keywords']) or 'Not specified'}",
        f"- Status: {intent['status'] or 'Any'}",
        f"- Year: {intent['year'] or 'Any'}",
        "",
        "Matching FIR Records:",
    ]

    for case in results:
        lines.append(
            f"- Crime No: {case.crime_no}\n"
            f"  Case No: {case.case_no}\n"
            f"  Date: {case.crime_registered_date}\n"
            f"  Details: {case.brief_facts}"
        )

    return "\n".join(lines)


def create_chat_message(db: Session, chat_request: ChatRequest):
    answer = generate_database_answer(db, chat_request.question)

    chat_message = ChatMessage(
        question=chat_request.question,
        answer=answer,
        language=chat_request.language
    )

    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)

    return chat_message


def get_chat_history(db: Session):
    return db.query(ChatMessage).order_by(ChatMessage.created_at.desc()).all()


def clear_chat_history(db: Session):
    deleted_count = db.query(ChatMessage).delete()
    db.commit()

    return deleted_count