from datetime import date
from typing import Optional

from pydantic import BaseModel


class CrimeSearchParams(BaseModel):
    crime_no: Optional[str] = None
    case_no: Optional[str] = None
    keyword: Optional[str] = None

    start_date: Optional[date] = None
    end_date: Optional[date] = None

    police_station_id: Optional[int] = None
    district_id: Optional[int] = None
    crime_major_head_id: Optional[int] = None
    crime_minor_head_id: Optional[int] = None
    case_status_id: Optional[int] = None

    victim_name: Optional[str] = None
    accused_name: Optional[str] = None