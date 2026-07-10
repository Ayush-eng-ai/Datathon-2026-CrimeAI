from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.ai_query_schema import AIQueryRequest
from app.services.retrieval_service import (
    generate_grounded_answer,
    retrieve_matching_cases,
)


router = APIRouter(
    prefix="/api/ai",
    tags=["AI Investigation Engine"],
)


@router.post("/retrieve-cases")
def retrieve_cases(
    request: AIQueryRequest,
    db: Session = Depends(get_db),
):
    result = retrieve_matching_cases(
        db=db,
        query_text=request.query,
    )

    return result


@router.post("/grounded-answer")
def grounded_answer(
    request: AIQueryRequest,
    limit: int = Query(default=5, ge=1, le=20),
    db: Session = Depends(get_db),
):
    result = retrieve_matching_cases(
        db=db,
        query_text=request.query,
        limit=limit,
    )

    answer = generate_grounded_answer(
        query_text=request.query,
        retrieval_result=result,
    )

    return {
        "query": request.query,
        "answer": answer,
        "intent": result["intent"],
        "total_matches": result["total_matches"],
        "sources": result["evidence"],
    }