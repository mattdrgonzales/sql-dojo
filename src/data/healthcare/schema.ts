export const healthcareSchema = `
CREATE TABLE facilities (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  bed_count INTEGER,
  founded_year INTEGER
);

CREATE TABLE providers (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  facility_id INTEGER REFERENCES facilities(id),
  npi TEXT UNIQUE,
  hire_date TEXT
);

CREATE TABLE patients (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  gender TEXT NOT NULL,
  city TEXT,
  state TEXT,
  insurance_type TEXT,
  enrolled_date TEXT
);

CREATE TABLE diagnoses (
  code TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  chronic INTEGER DEFAULT 0
);

CREATE TABLE procedures (
  code TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  avg_cost REAL
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  provider_id INTEGER REFERENCES providers(id),
  diagnosis_code TEXT REFERENCES diagnoses(code),
  procedure_code TEXT REFERENCES procedures(code),
  amount REAL NOT NULL,
  status TEXT NOT NULL,
  submitted_date TEXT NOT NULL,
  resolved_date TEXT
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  provider_id INTEGER REFERENCES providers(id),
  scheduled_date TEXT NOT NULL,
  status TEXT NOT NULL,
  visit_type TEXT NOT NULL,
  duration_min INTEGER
);
`;

export const healthcareTableInfo = [
  {
    name: "facilities",
    description: "Hospitals and clinics",
    columns: ["id", "name", "type", "city", "state", "bed_count", "founded_year"],
  },
  {
    name: "providers",
    description: "Doctors and specialists",
    columns: ["id", "first_name", "last_name", "specialty", "facility_id", "npi", "hire_date"],
  },
  {
    name: "patients",
    description: "Patient demographics",
    columns: ["id", "first_name", "last_name", "dob", "gender", "city", "state", "insurance_type", "enrolled_date"],
  },
  {
    name: "diagnoses",
    description: "Medical diagnosis codes",
    columns: ["code", "description", "category", "chronic"],
  },
  {
    name: "procedures",
    description: "Medical procedure codes",
    columns: ["code", "description", "category", "avg_cost"],
  },
  {
    name: "claims",
    description: "Insurance claims submitted",
    columns: ["id", "patient_id", "provider_id", "diagnosis_code", "procedure_code", "amount", "status", "submitted_date", "resolved_date"],
  },
  {
    name: "appointments",
    description: "Patient appointments",
    columns: ["id", "patient_id", "provider_id", "scheduled_date", "status", "visit_type", "duration_min"],
  },
];
