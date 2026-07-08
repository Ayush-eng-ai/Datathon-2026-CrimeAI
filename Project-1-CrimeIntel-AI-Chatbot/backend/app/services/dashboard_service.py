from sqlalchemy.orm import Session

from app.models.police_models import CaseMaster, Victim, Accused
from app.models.ai_models import PDFReport, ChatMessage, CaseSummary


def get_dashboard_stats(db: Session):
    total_cases = db.query(CaseMaster).count()
    total_victims = db.query(Victim).count()
    total_accused = db.query(Accused).count()
    total_reports = db.query(PDFReport).count()
    total_chat_messages = db.query(ChatMessage).count()
    total_summaries = db.query(CaseSummary).count()

    return {
        "total_cases": total_cases,
        "total_victims": total_victims,
        "total_accused": total_accused,
        "total_reports": total_reports,
        "total_chat_messages": total_chat_messages,
        "total_summaries": total_summaries,
    }