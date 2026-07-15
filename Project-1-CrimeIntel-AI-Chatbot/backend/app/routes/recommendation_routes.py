from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.recommendation_service import get_similar_cases


router = APIRouter(
    prefix="/api/recommendations",
    tags=["AI Case Recommendations"],
)


@router.get("/case/{case_id}")
def similar_case_recommendations(
    case_id: int,
    limit: int = Query(default=5, ge=1, le=10),
    db: Session = Depends(get_db),
):
    result = get_similar_cases(
        db=db,
        case_id=case_id,
        limit=limit,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Selected case not found",
        )

    return result