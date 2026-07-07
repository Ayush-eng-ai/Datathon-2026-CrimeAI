from sqlalchemy.orm import Session

from app.models.police_models import CaseMaster
from app.schemas.case_schema import CaseCreate, CaseUpdate


def get_all_cases(db: Session):
    return db.query(CaseMaster).all()


def get_case_by_id(db: Session, case_id: int):
    return db.query(CaseMaster).filter(
        CaseMaster.case_master_id == case_id
    ).first()


def create_case(db: Session, case_data: CaseCreate):
    new_case = CaseMaster(**case_data.model_dump())

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case


def update_case(db: Session, case_id: int, case_data: CaseUpdate):
    case = get_case_by_id(db, case_id)

    if not case:
        return None

    update_data = case_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(case, key, value)

    db.commit()
    db.refresh(case)

    return case


def delete_case(db: Session, case_id: int):
    case = get_case_by_id(db, case_id)

    if not case:
        return None

    db.delete(case)
    db.commit()

    return case_id