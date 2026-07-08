from sqlalchemy.orm import Session

from app.models.ai_models import PDFReport
from app.schemas.report_schema import PDFReportRequest


def create_pdf_report_placeholder(
    db: Session,
    report_request: PDFReportRequest
):
    file_path = f"reports/{report_request.report_title.replace(' ', '_').lower()}.pdf"

    report = PDFReport(
        case_master_id=report_request.case_master_id,
        report_title=report_request.report_title,
        report_type=report_request.report_type,
        file_path=file_path
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


def get_all_reports(db: Session):
    return db.query(PDFReport).order_by(PDFReport.created_at.desc()).all()