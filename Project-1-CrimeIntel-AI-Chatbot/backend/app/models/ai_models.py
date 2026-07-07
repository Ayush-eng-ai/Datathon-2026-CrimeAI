from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    role = Column(String(50), default="officer")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    message_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    language = Column(String(20), default="english")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CaseSummary(Base):
    __tablename__ = "case_summaries"

    summary_id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"))
    input_text = Column(Text, nullable=False)
    generated_summary = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PDFReport(Base):
    __tablename__ = "pdf_reports"

    report_id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"), nullable=True)
    report_title = Column(String(200), nullable=False)
    report_type = Column(String(50), default="case_report")
    file_path = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())