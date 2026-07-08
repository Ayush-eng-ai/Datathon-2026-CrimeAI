from datetime import date, datetime

from app.db.database import SessionLocal
from app.models.police_models import (
    State,
    District,
    Unit,
    Employee,
    Court,
    CaseCategory,
    GravityOffence,
    CaseStatusMaster,
    CrimeHead,
    CrimeSubHead,
    CaseMaster,
    Victim,
    Accused,
)


def seed_database():
    db = SessionLocal()

    try:
        if db.query(CaseMaster).first():
            print("Seed data already exists. Skipping...")
            return

        state = State(state_id=1, state_name="Karnataka", nationality_id=1, active=True)
        district = District(district_id=1, district_name="Bengaluru Urban", state_id=1, active=True)
        station = Unit(unit_id=1, unit_name="Bengaluru Central Police Station", state_id=1, district_id=1, active=True)

        employee = Employee(
            employee_id=1,
            district_id=1,
            unit_id=1,
            kgid="KGID001",
            first_name="Inspector Rajesh",
            gender_id=1,
            appointment_date=date(2012, 6, 10),
        )

        court = Court(court_id=1, court_name="Bengaluru City Civil Court", district_id=1, state_id=1, active=True)

        case_category = CaseCategory(case_category_id=1, lookup_value="FIR")
        gravity = GravityOffence(gravity_offence_id=1, lookup_value="Non-Heinous")
        status = CaseStatusMaster(case_status_id=1, case_status_name="Under Investigation")

        crime_head = CrimeHead(crime_head_id=1, crime_group_name="Property Crime", active=True)
        crime_sub_head = CrimeSubHead(
            crime_sub_head_id=1,
            crime_head_id=1,
            crime_head_name="Theft",
            seq_id=1,
        )

        db.add_all([
            state, district, station, employee, court,
            case_category, gravity, status, crime_head, crime_sub_head
        ])
        db.commit()

        case1 = CaseMaster(
            case_master_id=1,
            crime_no="104430006202600001",
            case_no="202600001",
            crime_registered_date=date(2026, 7, 7),
            police_person_id=1,
            police_station_id=1,
            case_category_id=1,
            gravity_offence_id=1,
            crime_major_head_id=1,
            crime_minor_head_id=1,
            case_status_id=1,
            court_id=1,
            incident_from_date=datetime(2026, 7, 7, 10, 0, 0),
            incident_to_date=datetime(2026, 7, 7, 11, 0, 0),
            info_received_ps_date=datetime(2026, 7, 7, 11, 30, 0),
            latitude=12.9715987,
            longitude=77.5945627,
            brief_facts="A mobile phone theft was reported near Bengaluru bus stand. The accused escaped from the location after the incident.",
        )

        victim1 = Victim(
            victim_master_id=1,
            case_master_id=1,
            victim_name="Ravi Kumar",
            age_year=28,
            gender_id=1,
            victim_police="0",
        )

        accused1 = Accused(
            accused_master_id=1,
            case_master_id=1,
            accused_name="Unknown Person",
            age_year=None,
            gender_id=1,
            person_id="A1",
        )

        db.add_all([case1, victim1, accused1])
        db.commit()

        print("Seed data inserted successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()