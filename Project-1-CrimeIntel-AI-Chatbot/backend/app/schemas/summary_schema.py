from typing import Optional

from pydantic import BaseModel


class SummaryRequest(BaseModel):
    case_master_id: Optional[int] = None
    input_text: str


class SummaryResponse(BaseModel):
    generated_summary: str
    source: str