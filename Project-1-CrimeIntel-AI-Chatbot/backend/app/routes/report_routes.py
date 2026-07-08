from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.report_schema import PDFReportRequest
from app.services import report_service


router = APIRouter(
    prefix="/api/reports",
    tags=["PDF Reports"]
)


@router.post("/pdf")
def create_pdf_report(
    report_request: PDFReportRequest,
    db: Session = Depends(get_db)
):
    report = report_service.create_pdf_report_placeholder(db, report_request)

    return {
        "message": "PDF report placeholder created successfully",
        "data": report
    }


@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    reports = report_service.get_all_reports(db)

    return {
        "total_reports": len(reports),
        "data": reports
    }