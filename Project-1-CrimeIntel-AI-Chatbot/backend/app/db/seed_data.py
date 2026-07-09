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
        if db.query(CaseMaster).count() >= 5:
            print("Seed data already exists. Skipping...")
            return

        db.query(Accused).delete()
        db.query(Victim).delete()
        db.query(CaseMaster).delete()
        db.query(CrimeSubHead).delete()
        db.query(CrimeHead).delete()
        db.query(CaseStatusMaster).delete()
        db.query(GravityOffence).delete()
        db.query(CaseCategory).delete()
        db.query(Court).delete()
        db.query(Employee).delete()
        db.query(Unit).delete()
        db.query(District).delete()
        db.query(State).delete()
        db.commit()

        states = [
            State(state_id=1, state_name="Karnataka", nationality_id=1, active=True),
        ]

        districts = [
            District(district_id=1, district_name="Bengaluru Urban", state_id=1, active=True),
            District(district_id=2, district_name="Mysuru", state_id=1, active=True),
            District(district_id=3, district_name="Dakshina Kannada", state_id=1, active=True),
            District(district_id=4, district_name="Dharwad", state_id=1, active=True),
            District(district_id=5, district_name="Belagavi", state_id=1, active=True),
        ]

        units = [
            Unit(unit_id=1, unit_name="Bengaluru Central Police Station", state_id=1, district_id=1, active=True),
            Unit(unit_id=2, unit_name="Mysuru Lakshmipuram Police Station", state_id=1, district_id=2, active=True),
            Unit(unit_id=3, unit_name="Mangaluru Central Police Station", state_id=1, district_id=3, active=True),
            Unit(unit_id=4, unit_name="Hubballi Town Police Station", state_id=1, district_id=4, active=True),
            Unit(unit_id=5, unit_name="Belagavi Market Police Station", state_id=1, district_id=5, active=True),
        ]

        employees = [
            Employee(employee_id=1, district_id=1, unit_id=1, kgid="KGID001", first_name="Inspector Rajesh", gender_id=1, appointment_date=date(2012, 6, 10)),
            Employee(employee_id=2, district_id=2, unit_id=2, kgid="KGID002", first_name="Inspector Kavitha", gender_id=2, appointment_date=date(2015, 3, 18)),
            Employee(employee_id=3, district_id=3, unit_id=3, kgid="KGID003", first_name="Inspector Prakash", gender_id=1, appointment_date=date(2011, 8, 22)),
        ]

        courts = [
            Court(court_id=1, court_name="Bengaluru City Civil Court", district_id=1, state_id=1, active=True),
            Court(court_id=2, court_name="Mysuru District Court", district_id=2, state_id=1, active=True),
            Court(court_id=3, court_name="Mangaluru District Court", district_id=3, state_id=1, active=True),
        ]

        categories = [
            CaseCategory(case_category_id=1, lookup_value="FIR"),
            CaseCategory(case_category_id=2, lookup_value="UDR"),
        ]

        gravities = [
            GravityOffence(gravity_offence_id=1, lookup_value="Non-Heinous"),
            GravityOffence(gravity_offence_id=2, lookup_value="Heinous"),
        ]

        statuses = [
            CaseStatusMaster(case_status_id=1, case_status_name="Under Investigation"),
            CaseStatusMaster(case_status_id=2, case_status_name="Solved"),
            CaseStatusMaster(case_status_id=3, case_status_name="Open"),
        ]

        crime_heads = [
            CrimeHead(crime_head_id=1, crime_group_name="Property Crime", active=True),
            CrimeHead(crime_head_id=2, crime_group_name="Cyber Crime", active=True),
            CrimeHead(crime_head_id=3, crime_group_name="Violent Crime", active=True),
            CrimeHead(crime_head_id=4, crime_group_name="Financial Crime", active=True),
        ]

        crime_sub_heads = [
            CrimeSubHead(crime_sub_head_id=1, crime_head_id=1, crime_head_name="Theft", seq_id=1),
            CrimeSubHead(crime_sub_head_id=2, crime_head_id=2, crime_head_name="Online Fraud", seq_id=2),
            CrimeSubHead(crime_sub_head_id=3, crime_head_id=3, crime_head_name="Robbery", seq_id=3),
            CrimeSubHead(crime_sub_head_id=4, crime_head_id=1, crime_head_name="Vehicle Theft", seq_id=4),
            CrimeSubHead(crime_sub_head_id=5, crime_head_id=4, crime_head_name="Bank Fraud", seq_id=5),
        ]

        db.add_all(states)
        db.commit()

        db.add_all(districts)
        db.commit()

        db.add_all(units)
        db.commit()

        db.add_all(employees)
        db.commit()

        db.add_all(courts)
        db.commit()

        db.add_all(categories)
        db.commit()

        db.add_all(gravities)
        db.commit()

        db.add_all(statuses)
        db.commit()

        db.add_all(crime_heads)
        db.commit()

        db.add_all(crime_sub_heads)
        db.commit()

        cases = [
            CaseMaster(
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
                brief_facts="A mobile phone theft was reported near Bengaluru bus stand. The victim reported that the accused escaped from the location after the incident.",
            ),
            CaseMaster(
                case_master_id=2,
                crime_no="104430007202600002",
                case_no="202600002",
                crime_registered_date=date(2026, 7, 8),
                police_person_id=2,
                police_station_id=2,
                case_category_id=1,
                gravity_offence_id=1,
                crime_major_head_id=2,
                crime_minor_head_id=2,
                case_status_id=3,
                court_id=2,
                incident_from_date=datetime(2026, 7, 8, 15, 0, 0),
                incident_to_date=datetime(2026, 7, 8, 16, 0, 0),
                info_received_ps_date=datetime(2026, 7, 8, 16, 30, 0),
                latitude=12.2958104,
                longitude=76.6393805,
                brief_facts="A cyber crime complaint was registered in Mysuru after the complainant lost money through an online payment fraud link.",
            ),
            CaseMaster(
                case_master_id=3,
                crime_no="104430008202600003",
                case_no="202600003",
                crime_registered_date=date(2026, 7, 9),
                police_person_id=3,
                police_station_id=3,
                case_category_id=1,
                gravity_offence_id=2,
                crime_major_head_id=3,
                crime_minor_head_id=3,
                case_status_id=1,
                court_id=3,
                incident_from_date=datetime(2026, 7, 9, 21, 0, 0),
                incident_to_date=datetime(2026, 7, 9, 21, 30, 0),
                info_received_ps_date=datetime(2026, 7, 9, 22, 0, 0),
                latitude=12.9141417,
                longitude=74.8559568,
                brief_facts="A robbery case was reported near Mangaluru central area where two accused allegedly threatened the victim and took valuables.",
            ),
            CaseMaster(
                case_master_id=4,
                crime_no="104430009202600004",
                case_no="202600004",
                crime_registered_date=date(2026, 7, 10),
                police_person_id=1,
                police_station_id=4,
                case_category_id=1,
                gravity_offence_id=1,
                crime_major_head_id=1,
                crime_minor_head_id=4,
                case_status_id=2,
                court_id=1,
                incident_from_date=datetime(2026, 7, 10, 8, 0, 0),
                incident_to_date=datetime(2026, 7, 10, 9, 0, 0),
                info_received_ps_date=datetime(2026, 7, 10, 9, 30, 0),
                latitude=15.3647083,
                longitude=75.1239547,
                brief_facts="A vehicle theft complaint was filed in Hubballi after a two-wheeler was stolen from a market parking area.",
            ),
            CaseMaster(
                case_master_id=5,
                crime_no="104430010202600005",
                case_no="202600005",
                crime_registered_date=date(2026, 7, 11),
                police_person_id=2,
                police_station_id=5,
                case_category_id=1,
                gravity_offence_id=1,
                crime_major_head_id=4,
                crime_minor_head_id=5,
                case_status_id=3,
                court_id=2,
                incident_from_date=datetime(2026, 7, 11, 12, 0, 0),
                incident_to_date=datetime(2026, 7, 11, 13, 0, 0),
                info_received_ps_date=datetime(2026, 7, 11, 13, 20, 0),
                latitude=15.8496953,
                longitude=74.4976741,
                brief_facts="A financial fraud complaint was registered in Belagavi involving fake bank verification calls and unauthorized account withdrawal.",
            ),
        ]

        victims = [
            Victim(victim_master_id=1, case_master_id=1, victim_name="Ravi Kumar", age_year=28, gender_id=1, victim_police="0"),
            Victim(victim_master_id=2, case_master_id=2, victim_name="Anita Rao", age_year=34, gender_id=2, victim_police="0"),
            Victim(victim_master_id=3, case_master_id=3, victim_name="Mohammed Imran", age_year=41, gender_id=1, victim_police="0"),
            Victim(victim_master_id=4, case_master_id=4, victim_name="Suresh Patil", age_year=30, gender_id=1, victim_police="0"),
            Victim(victim_master_id=5, case_master_id=5, victim_name="Meena Desai", age_year=45, gender_id=2, victim_police="0"),
        ]

        accused = [
            Accused(accused_master_id=1, case_master_id=1, accused_name="Unknown Person", age_year=None, gender_id=1, person_id="A1"),
            Accused(accused_master_id=2, case_master_id=2, accused_name="Unknown Cyber Fraudster", age_year=None, gender_id=1, person_id="A1"),
            Accused(accused_master_id=3, case_master_id=3, accused_name="Ramesh", age_year=26, gender_id=1, person_id="A1"),
            Accused(accused_master_id=4, case_master_id=3, accused_name="Mahesh", age_year=29, gender_id=1, person_id="A2"),
            Accused(accused_master_id=5, case_master_id=4, accused_name="Unknown Vehicle Thief", age_year=None, gender_id=1, person_id="A1"),
            Accused(accused_master_id=6, case_master_id=5, accused_name="Fake Bank Caller", age_year=None, gender_id=1, person_id="A1"),
        ]

        db.add_all(cases + victims + accused)
        db.commit()

        print("Realistic seed data inserted successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
