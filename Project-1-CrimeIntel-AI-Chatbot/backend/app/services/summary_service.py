from sqlalchemy.orm import Session

from app.models.ai_models import CaseSummary
from app.schemas.summary_schema import SummaryRequest


def generate_placeholder_summary(input_text: str):
    short_text = input_text.strip()

    if len(short_text) > 300:
        short_text = short_text[:300] + "..."

    return (
        "AI Generated Case Summary: "
        f"{short_text} "
        "This summary highlights the key facts, incident context, and relevant case details for quick police review."
    )


def create_case_summary(db: Session, summary_request: SummaryRequest):
    generated_summary = generate_placeholder_summary(summary_request.input_text)

    case_summary = CaseSummary(
        case_master_id=summary_request.case_master_id,
        input_text=summary_request.input_text,
        generated_summary=generated_summary
    )

    db.add(case_summary)
    db.commit()
    db.refresh(case_summary)

    return case_summary


def get_all_summaries(db: Session):
    return db.query(CaseSummary).order_by(CaseSummary.created_at.desc()).all()