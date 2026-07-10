from typing import Optional

from pydantic import BaseModel, Field


class AIQueryRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=3,
        description="Natural-language crime intelligence query",
    )
    language: str = Field(default="english")


class ExtractedIntent(BaseModel):
    intent: str
    crime_types: list[str]
    locations: list[str]
    status: Optional[str] = None
    year: Optional[int] = None
    case_number: Optional[str] = None
    crime_number: Optional[str] = None
    confidence: float
    explanation: list[str]


class AIQueryResponse(BaseModel):
    original_query: str
    extracted_intent: ExtractedIntent