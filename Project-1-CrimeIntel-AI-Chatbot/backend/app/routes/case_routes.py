from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.police_models import CaseMaster
from app.schemas.case_schema import CaseCreate, CaseUpdate

router = APIRouter(
    prefix="/api/cases",
    tags=["Case Management"]
)


@router.get("/")
def get_all_cases(db: Session = Depends(get_db)):
    cases = db.query(CaseMaster).all()
    return cases


@router.get("/{case_id}")
def get_case_by_id(case_id: int, db: Session = Depends(get_db)):
    case = db.query(CaseMaster).filter(CaseMaster.case_master_id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return case


@router.post("/")
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    new_case = CaseMaster(**case.model_dump())

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

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
    case = db.query(CaseMaster).filter(CaseMaster.case_master_id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    update_data = case_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(case, key, value)

    db.commit()
    db.refresh(case)

    return {
        "message": "Case updated successfully",
        "data": case
    }


@router.delete("/{case_id}")
def delete_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(CaseMaster).filter(CaseMaster.case_master_id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    db.delete(case)
    db.commit()

    return {
        "message": "Case deleted successfully",
        "deleted_case_id": case_id
    }