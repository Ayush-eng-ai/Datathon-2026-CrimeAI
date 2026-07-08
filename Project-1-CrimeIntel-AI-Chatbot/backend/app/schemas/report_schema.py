from typing import Optional

from pydantic import BaseModel


class PDFReportRequest(BaseModel):
    case_master_id: Optional[int] = None
    report_title: str
    report_type: Optional[str] = "case_report"


class PDFReportResponse(BaseModel):
    report_title: str
    report_type: str
    file_path: Optional[str] = None