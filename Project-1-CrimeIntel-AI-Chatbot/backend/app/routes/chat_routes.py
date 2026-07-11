from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat_schema import ChatRequest
from app.services import chat_service


router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chatbot"],
)


@router.post("/")
def chat_with_ai(
    chat_request: ChatRequest,
    db: Session = Depends(get_db),
):
    result = chat_service.create_chat_message(
        db=db,
        chat_request=chat_request,
    )

    return {
        "message": "Grounded AI response generated successfully",
        "data": result,
    }


@router.get("/history")
def get_chat_history(db: Session = Depends(get_db)):
    history = chat_service.get_chat_history(db)

    return {
        "total_messages": len(history),
        "data": history,
    }


@router.delete("/history")
def clear_chat_history(db: Session = Depends(get_db)):
    deleted_count = chat_service.clear_chat_history(db)

    return {
        "message": "Chat history cleared successfully",
        "deleted_messages": deleted_count,
    }