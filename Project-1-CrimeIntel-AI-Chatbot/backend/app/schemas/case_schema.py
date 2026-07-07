from datetime import date, datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class CaseBase(BaseModel):
    crime_no: str
    case_no: str
    crime_registered_date: date

    police_person_id: Optional[int] = None
    police_station_id: Optional[int] = None
    case_category_id: Optional[int] = None
    gravity_offence_id: Optional[int] = None
    crime_major_head_id: Optional[int] = None
    crime_minor_head_id: Optional[int] = None
    case_status_id: Optional[int] = None
    court_id: Optional[int] = None

    incident_from_date: Optional[datetime] = None
    incident_to_date: Optional[datetime] = None
    info_received_ps_date: Optional[datetime] = None

    latitude: Optional[Decimal] = None
    longitude: Optional[Decimal] = None
    brief_facts: Optional[str] = None


class CaseCreate(CaseBase):
    pass


class CaseUpdate(BaseModel):
    crime_no: Optional[str] = None
    case_no: Optional[str] = None
    crime_registered_date: Optional[date] = None

    police_person_id: Optional[int] = None
    police_station_id: Optional[int] = None
    case_category_id: Optional[int] = None
    gravity_offence_id: Optional[int] = None
    crime_major_head_id: Optional[int] = None
    crime_minor_head_id: Optional[int] = None
    case_status_id: Optional[int] = None
    court_id: Optional[int] = None

    incident_from_date: Optional[datetime] = None
    incident_to_date: Optional[datetime] = None
    info_received_ps_date: Optional[datetime] = None

    latitude: Optional[Decimal] = None
    longitude: Optional[Decimal] = None
    brief_facts: Optional[str] = None


class CaseResponse(CaseBase):
    case_master_id: int

    class Config:
        from_attributes = True