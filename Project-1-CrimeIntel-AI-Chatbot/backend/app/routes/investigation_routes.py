from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.investigation_service import (
    get_investigation_assistance,
)


router = APIRouter(
    prefix="/api/investigation",
    tags=["AI Investigation Assistant"],
)


@router.get("/case/{case_id}")
def investigation_assistance(
    case_id: int,
    db: Session = Depends(get_db),
):
    result = get_investigation_assistance(
        db=db,
        case_id=case_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Selected case not found",
        )

    return result