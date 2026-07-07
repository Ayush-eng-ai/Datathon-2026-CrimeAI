from sqlalchemy.orm import Session

from app.models.ai_models import ChatMessage
from app.schemas.chat_schema import ChatRequest


def generate_placeholder_answer(question: str):
    question_lower = question.lower()

    if "theft" in question_lower:
        return "I found theft-related crime records. You can refine the search by district, police station, or date range."

    if "murder" in question_lower:
        return "I found murder-related FIR records. Please provide location or time period for more accurate results."

    if "accused" in question_lower:
        return "You can search accused details using accused name, case number, or FIR number."

    if "summary" in question_lower:
        return "You can paste case facts in the Case Summary page to generate an AI-style case summary."

    return "CrimeIntel AI is ready. Please ask a crime-related question such as search by FIR number, accused name, victim name, district, or crime category."


def create_chat_message(db: Session, chat_request: ChatRequest):
    answer = generate_placeholder_answer(chat_request.question)

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