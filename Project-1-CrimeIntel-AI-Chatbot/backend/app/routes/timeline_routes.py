from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.timeline_service import get_case_timeline


router = APIRouter(
    prefix="/api/timeline",
    tags=["Investigation Timeline"],
)


@router.get("/case/{case_id}")
def case_timeline(
    case_id: int,
    db: Session = Depends(get_db),
):
    timeline = get_case_timeline(
        db=db,
        case_id=case_id,
    )

    if not timeline:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    return timeline