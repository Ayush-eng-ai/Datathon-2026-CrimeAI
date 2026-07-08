from sqlalchemy.orm import Session

from app.models.ai_models import ChatMessage
from app.models.police_models import CaseMaster
from app.schemas.chat_schema import ChatRequest


def search_cases_from_question(db: Session, question: str):
    question_lower = question.lower()

    query = db.query(CaseMaster)

    if "theft" in question_lower:
        query = query.filter(CaseMaster.brief_facts.ilike("%theft%"))

    if "bengaluru" in question_lower or "bangalore" in question_lower:
        query = query.filter(CaseMaster.brief_facts.ilike("%bengaluru%"))

    if "mobile" in question_lower:
        query = query.filter(CaseMaster.brief_facts.ilike("%mobile%"))

    results = query.limit(5).all()
    return results


def generate_database_answer(db: Session, question: str):
    results = search_cases_from_question(db, question)

    if not results:
        return "No matching crime records found in the current database. Try searching by FIR number, theft, Bengaluru, victim, accused, or case facts."

    lines = [
        f"I found {len(results)} matching crime record(s):"
    ]

    for case in results:
        lines.append(
            f"- Crime No: {case.crime_no}, Case No: {case.case_no}, Date: {case.crime_registered_date}, Details: {case.brief_facts}"
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