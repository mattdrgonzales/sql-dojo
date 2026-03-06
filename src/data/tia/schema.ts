export const tiaSchema = `
CREATE TABLE locations (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  opened_date TEXT NOT NULL
);

CREATE TABLE providers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  hire_date TEXT NOT NULL
);

CREATE TABLE membership_plans (
  id INTEGER PRIMARY KEY,
  plan_name TEXT NOT NULL,
  monthly_fee REAL NOT NULL,
  annual_fee REAL NOT NULL,
  includes_virtual INTEGER NOT NULL DEFAULT 0,
  max_covered_visits INTEGER
);

CREATE TABLE patients (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  gender TEXT NOT NULL,
  insurance_type TEXT,
  enrolled_date TEXT NOT NULL,
  region TEXT NOT NULL
);

CREATE TABLE memberships (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  plan_id INTEGER REFERENCES membership_plans(id),
  start_date TEXT NOT NULL,
  end_date TEXT,
  billing_cycle TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE membership_payments (
  id INTEGER PRIMARY KEY,
  membership_id INTEGER REFERENCES memberships(id),
  patient_id INTEGER REFERENCES patients(id),
  payment_date TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  provider_id INTEGER REFERENCES providers(id),
  appointment_date TEXT NOT NULL,
  appointment_type TEXT NOT NULL,
  status TEXT NOT NULL,
  duration_minutes INTEGER
);

CREATE TABLE diagnoses (
  id INTEGER PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id),
  patient_id INTEGER REFERENCES patients(id),
  icd_code TEXT NOT NULL,
  description TEXT NOT NULL,
  diagnosed_date TEXT NOT NULL
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id),
  patient_id INTEGER REFERENCES patients(id),
  provider_id INTEGER REFERENCES providers(id),
  amount_billed REAL NOT NULL,
  amount_paid REAL NOT NULL,
  claim_date TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE services (
  id INTEGER PRIMARY KEY,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_price REAL NOT NULL,
  insurance_eligible INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE patient_services (
  id INTEGER PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id),
  patient_id INTEGER REFERENCES patients(id),
  service_id INTEGER REFERENCES services(id),
  charged_amount REAL NOT NULL,
  covered_by_insurance INTEGER NOT NULL DEFAULT 0,
  out_of_pocket REAL NOT NULL
);

CREATE TABLE insurance_partners (
  id INTEGER PRIMARY KEY,
  payer_name TEXT NOT NULL,
  contract_start TEXT NOT NULL,
  contract_end TEXT,
  reimbursement_rate REAL NOT NULL,
  covered_regions TEXT NOT NULL
);

CREATE TABLE clinical_partners (
  id INTEGER PRIMARY KEY,
  partner_name TEXT NOT NULL,
  partner_type TEXT NOT NULL,
  contract_start TEXT NOT NULL,
  contract_end TEXT,
  annual_contract_value REAL NOT NULL,
  covered_lives INTEGER NOT NULL,
  region TEXT NOT NULL
);

CREATE TABLE partner_patients (
  partner_id INTEGER REFERENCES clinical_partners(id),
  patient_id INTEGER REFERENCES patients(id),
  enrolled_date TEXT NOT NULL,
  PRIMARY KEY (partner_id, patient_id)
);

CREATE TABLE referrals (
  id INTEGER PRIMARY KEY,
  referring_provider_id INTEGER REFERENCES providers(id),
  referred_provider_id INTEGER REFERENCES providers(id),
  patient_id INTEGER REFERENCES patients(id),
  referral_date TEXT NOT NULL,
  reason TEXT NOT NULL
);
`;

export const tiaTableInfo = [
  {
    name: "locations",
    description: "Tia clinic locations",
    columns: ["id", "name", "city", "state", "opened_date"],
  },
  {
    name: "providers",
    description: "Doctors, NPs, specialists",
    columns: ["id", "name", "specialty", "location_id", "hire_date"],
  },
  {
    name: "membership_plans",
    description: "Subscription tiers (Essential, Complete, Premium)",
    columns: ["id", "plan_name", "monthly_fee", "annual_fee", "includes_virtual", "max_covered_visits"],
  },
  {
    name: "patients",
    description: "Tia members and patients",
    columns: ["id", "first_name", "last_name", "date_of_birth", "gender", "insurance_type", "enrolled_date", "region"],
  },
  {
    name: "memberships",
    description: "Patient membership subscriptions",
    columns: ["id", "patient_id", "plan_id", "start_date", "end_date", "billing_cycle", "status"],
  },
  {
    name: "membership_payments",
    description: "Monthly/annual membership payment ledger",
    columns: ["id", "membership_id", "patient_id", "payment_date", "amount", "status"],
  },
  {
    name: "appointments",
    description: "Patient visits (in-person and virtual)",
    columns: ["id", "patient_id", "provider_id", "appointment_date", "appointment_type", "status", "duration_minutes"],
  },
  {
    name: "diagnoses",
    description: "Diagnoses recorded during appointments",
    columns: ["id", "appointment_id", "patient_id", "icd_code", "description", "diagnosed_date"],
  },
  {
    name: "claims",
    description: "Insurance claims for appointments",
    columns: ["id", "appointment_id", "patient_id", "provider_id", "amount_billed", "amount_paid", "claim_date", "status"],
  },
  {
    name: "services",
    description: "Add-on services (labs, wellness, specialty)",
    columns: ["id", "service_name", "category", "base_price", "insurance_eligible"],
  },
  {
    name: "patient_services",
    description: "Services rendered to patients",
    columns: ["id", "appointment_id", "patient_id", "service_id", "charged_amount", "covered_by_insurance", "out_of_pocket"],
  },
  {
    name: "insurance_partners",
    description: "Insurance payers Tia contracts with",
    columns: ["id", "payer_name", "contract_start", "contract_end", "reimbursement_rate", "covered_regions"],
  },
  {
    name: "clinical_partners",
    description: "Employer and health system partnerships",
    columns: ["id", "partner_name", "partner_type", "contract_start", "contract_end", "annual_contract_value", "covered_lives", "region"],
  },
  {
    name: "partner_patients",
    description: "Patients enrolled via clinical partners",
    columns: ["partner_id", "patient_id", "enrolled_date"],
  },
  {
    name: "referrals",
    description: "Provider-to-provider referrals",
    columns: ["id", "referring_provider_id", "referred_provider_id", "patient_id", "referral_date", "reason"],
  },
];
