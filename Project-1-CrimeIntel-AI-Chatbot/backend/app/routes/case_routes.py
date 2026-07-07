from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.case_schema import CaseCreate, CaseUpdate
from app.services import case_service


router = APIRouter(
    prefix="/api/cases",
    tags=["Case Management"]
)


@router.get("/")
def get_all_cases(db: Session = Depends(get_db)):
    return case_service.get_all_cases(db)


@router.get("/{case_id}")
def get_case_by_id(case_id: int, db: Session = Depends(get_db)):
    case = case_service.get_case_by_id(db, case_id)

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return case


@router.post("/")
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    new_case = case_service.create_case(db, case)

    return {
        "message": "Case created successfully",
        "data": new_case
    }


@router.put("/{case_id}")
def update_case(
    case_id: int,
    case_update: CaseUpdate,
    db: Session = Depends(get_db)
):
    updated_case = case_service.update_case(db, case_id, case_update)

    if not updated_case:
        raise HTTPException(status_code=404, detail="Case not found")

    return {
        "message": "Case updated successfully",
        "data": updated_case
    }


@router.delete("/{case_id}")
def delete_case(case_id: int, db: Session = Depends(get_db)):
    deleted_case_id = case_service.delete_case(db, case_id)

    if not deleted_case_id:
        raise HTTPException(status_code=404, detail="Case not found")

    return {
        "message": "Case deleted successfully",
        "deleted_case_id": deleted_case_id
    }