from fastapi import APIRouter

from app.schemas.ai_query_schema import AIQueryRequest
from app.services.ai_query_service import extract_ai_intent


router = APIRouter(
    prefix="/api/ai",
    tags=["AI Investigation Engine"],
)


@router.post("/understand-query")
def understand_query(request: AIQueryRequest):
    extracted_intent = extract_ai_intent(request.query)

    return {
        "original_query": request.query,
        "extracted_intent": extracted_intent,
    }