from sqlalchemy.orm import Session

from app.models.ai_models import ChatMessage
from app.schemas.chat_schema import ChatRequest
from app.services.retrieval_service import (
    generate_grounded_answer,
    retrieve_matching_cases,
)


def create_chat_message(
    db: Session,
    chat_request: ChatRequest,
):
    retrieval_result = retrieve_matching_cases(
        db=db,
        query_text=chat_request.question,
        limit=5,
    )

    answer = generate_grounded_answer(
        query_text=chat_request.question,
        retrieval_result=retrieval_result,
    )

    chat_message = ChatMessage(
        question=chat_request.question,
        answer=answer,
        language=chat_request.language,
    )

    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)

    return {
        "message_id": chat_message.message_id,
        "question": chat_message.question,
        "answer": chat_message.answer,
        "language": chat_message.language,
        "created_at": chat_message.created_at,
        "intent": retrieval_result["intent"],
        "total_matches": retrieval_result["total_matches"],
        "sources": retrieval_result["evidence"],
    }


def get_chat_history(db: Session):
    return (
        db.query(ChatMessage)
        .order_by(ChatMessage.created_at.desc())
        .all()
    )


def clear_chat_history(db: Session):
    deleted_count = db.query(ChatMessage).delete()
    db.commit()

    return deleted_count