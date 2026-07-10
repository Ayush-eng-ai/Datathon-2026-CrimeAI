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
    """
    Understand the officer's natural-language query,
    retrieve matching FIR evidence from PostgreSQL,
    generate a grounded answer, and save the conversation.
    """

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

    return chat_message


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