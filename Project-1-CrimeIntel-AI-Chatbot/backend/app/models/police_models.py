from sqlalchemy import Column, Integer, String, Date, DateTime, DECIMAL, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class State(Base):
    __tablename__ = "states"

    state_id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String(100), nullable=False)
    nationality_id = Column(Integer, nullable=True)
    active = Column(Boolean, default=True)


class District(Base):
    __tablename__ = "districts"

    district_id = Column(Integer, primary_key=True, index=True)
    district_name = Column(String(100), nullable=False)
    state_id = Column(Integer, ForeignKey("states.state_id"))
    active = Column(Boolean, default=True)


class Unit(Base):
    __tablename__ = "units"

    unit_id = Column(Integer, primary_key=True, index=True)
    unit_name = Column(String(150), nullable=False)
    state_id = Column(Integer, ForeignKey("states.state_id"))
    district_id = Column(Integer, ForeignKey("districts.district_id"))
    active = Column(Boolean, default=True)


class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.district_id"))
    unit_id = Column(Integer, ForeignKey("units.unit_id"))
    kgid = Column(String(50), unique=True, nullable=True)
    first_name = Column(String(100), nullable=False)
    gender_id = Column(Integer, nullable=True)
    appointment_date = Column(Date, nullable=True)


class Court(Base):
    __tablename__ = "courts"

    court_id = Column(Integer, primary_key=True, index=True)
    court_name = Column(String(200), nullable=False)
    district_id = Column(Integer, ForeignKey("districts.district_id"))
    state_id = Column(Integer, ForeignKey("states.state_id"))
    active = Column(Boolean, default=True)


class CaseCategory(Base):
    __tablename__ = "case_categories"

    case_category_id = Column(Integer, primary_key=True, index=True)
    lookup_value = Column(String(100), nullable=False)


class GravityOffence(Base):
    __tablename__ = "gravity_offences"

    gravity_offence_id = Column(Integer, primary_key=True, index=True)
    lookup_value = Column(String(100), nullable=False)


class CaseStatusMaster(Base):
    __tablename__ = "case_status_master"

    case_status_id = Column(Integer, primary_key=True, index=True)
    case_status_name = Column(String(100), nullable=False)


class CrimeHead(Base):
    __tablename__ = "crime_heads"

    crime_head_id = Column(Integer, primary_key=True, index=True)
    crime_group_name = Column(String(150), nullable=False)
    active = Column(Boolean, default=True)


class CrimeSubHead(Base):
    __tablename__ = "crime_sub_heads"

    crime_sub_head_id = Column(Integer, primary_key=True, index=True)
    crime_head_id = Column(Integer, ForeignKey("crime_heads.crime_head_id"))
    crime_head_name = Column(String(150), nullable=False)
    seq_id = Column(Integer, nullable=True)


class CaseMaster(Base):
    __tablename__ = "case_master"

    case_master_id = Column(Integer, primary_key=True, index=True)

    crime_no = Column(String(30), unique=True, nullable=False)
    case_no = Column(String(20), nullable=False)
    crime_registered_date = Column(Date, nullable=False)

    police_person_id = Column(Integer, ForeignKey("employees.employee_id"))
    police_station_id = Column(Integer, ForeignKey("units.unit_id"))
    case_category_id = Column(Integer, ForeignKey("case_categories.case_category_id"))
    gravity_offence_id = Column(Integer, ForeignKey("gravity_offences.gravity_offence_id"))
    crime_major_head_id = Column(Integer, ForeignKey("crime_heads.crime_head_id"))
    crime_minor_head_id = Column(Integer, ForeignKey("crime_sub_heads.crime_sub_head_id"))
    case_status_id = Column(Integer, ForeignKey("case_status_master.case_status_id"))
    court_id = Column(Integer, ForeignKey("courts.court_id"))

    incident_from_date = Column(DateTime, nullable=True)
    incident_to_date = Column(DateTime, nullable=True)
    info_received_ps_date = Column(DateTime, nullable=True)

    latitude = Column(DECIMAL(10, 7), nullable=True)
    longitude = Column(DECIMAL(10, 7), nullable=True)

    brief_facts = Column(Text, nullable=True)

    victims = relationship("Victim", back_populates="case")
    accused = relationship("Accused", back_populates="case")
    complainants = relationship("ComplainantDetails", back_populates="case")


class Victim(Base):
    __tablename__ = "victims"

    victim_master_id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"))
    victim_name = Column(String(150), nullable=False)
    age_year = Column(Integer, nullable=True)
    gender_id = Column(Integer, nullable=True)
    victim_police = Column(String(10), nullable=True)

    case = relationship("CaseMaster", back_populates="victims")


class Accused(Base):
    __tablename__ = "accused"

    accused_master_id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"))
    accused_name = Column(String(150), nullable=False)
    age_year = Column(Integer, nullable=True)
    gender_id = Column(Integer, nullable=True)
    person_id = Column(String(20), nullable=True)

    case = relationship("CaseMaster", back_populates="accused")


class ComplainantDetails(Base):
    __tablename__ = "complainant_details"

    complainant_id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"))
    complainant_name = Column(String(150), nullable=False)
    age_year = Column(Integer, nullable=True)
    gender_id = Column(Integer, nullable=True)

    case = relationship("CaseMaster", back_populates="complainants")


class Act(Base):
    __tablename__ = "acts"

    act_code = Column(String(50), primary_key=True, index=True)
    act_description = Column(String(255), nullable=False)
    short_name = Column(String(50), nullable=True)
    active = Column(Boolean, default=True)


class Section(Base):
    __tablename__ = "sections"

    section_id = Column(Integer, primary_key=True, index=True)
    act_code = Column(String(50), ForeignKey("acts.act_code"))
    section_code = Column(String(50), nullable=False)
    section_description = Column(String(255), nullable=True)
    active = Column(Boolean, default=True)


class ActSectionAssociation(Base):
    __tablename__ = "act_section_associations"

    id = Column(Integer, primary_key=True, index=True)
    case_master_id = Column(Integer, ForeignKey("case_master.case_master_id"))
    act_id = Column(String(50), ForeignKey("acts.act_code"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))
    act_order_id = Column(Integer, nullable=True)
    section_order_id = Column(Integer, nullable=True)