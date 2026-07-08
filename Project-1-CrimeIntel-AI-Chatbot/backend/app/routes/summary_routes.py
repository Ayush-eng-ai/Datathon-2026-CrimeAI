from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.summary_schema import SummaryRequest
from app.services import summary_service


router = APIRouter(
    prefix="/api/summary",
    tags=["Case Summary"]
)


@router.post("/")
def generate_case_summary(
    summary_request: SummaryRequest,
    db: Session = Depends(get_db)
):
    summary = summary_service.create_case_summary(db, summary_request)

    return {
        "message": "Case summary generated successfully",
        "data": summary
    }


@router.get("/")
def get_case_summaries(db: Session = Depends(get_db)):
    summaries = summary_service.get_all_summaries(db)

    return {
        "total_summaries": len(summaries),
        "data": summaries
    }