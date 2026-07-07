from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    question: str
    language: Optional[str] = "english"


class ChatResponse(BaseModel):
    answer: str
    source: str