export const insuranceSchema = `
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  gender TEXT NOT NULL,
  state TEXT NOT NULL,
  credit_score INTEGER,
  member_since TEXT NOT NULL
);

CREATE TABLE adjusters (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  region TEXT NOT NULL,
  years_experience INTEGER,
  hire_date TEXT NOT NULL
);

CREATE TABLE policies (
  id INTEGER PRIMARY KEY,
  member_id INTEGER REFERENCES members(id),
  policy_type TEXT NOT NULL,
  premium REAL NOT NULL,
  deductible REAL NOT NULL,
  coverage_limit REAL NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY,
  policy_id INTEGER REFERENCES policies(id),
  member_id INTEGER REFERENCES members(id),
  incident_date TEXT NOT NULL,
  filed_date TEXT NOT NULL,
  claim_type TEXT NOT NULL,
  amount_claimed REAL NOT NULL,
  amount_approved REAL,
  status TEXT NOT NULL,
  adjuster_id INTEGER REFERENCES adjusters(id)
);

CREATE TABLE coverages (
  id INTEGER PRIMARY KEY,
  policy_id INTEGER REFERENCES policies(id),
  coverage_type TEXT NOT NULL,
  coverage_amount REAL NOT NULL,
  copay REAL
);
`;

export const insuranceTableInfo = [
  {
    name: "members",
    description: "Insurance policyholders",
    columns: ["id", "first_name", "last_name", "dob", "gender", "state", "credit_score", "member_since"],
  },
  {
    name: "adjusters",
    description: "Claims adjusters who evaluate claims",
    columns: ["id", "first_name", "last_name", "region", "years_experience", "hire_date"],
  },
  {
    name: "policies",
    description: "Insurance policies held by members",
    columns: ["id", "member_id", "policy_type", "premium", "deductible", "coverage_limit", "start_date", "end_date", "status"],
  },
  {
    name: "claims",
    description: "Claims filed against policies",
    columns: ["id", "policy_id", "member_id", "incident_date", "filed_date", "claim_type", "amount_claimed", "amount_approved", "status", "adjuster_id"],
  },
  {
    name: "coverages",
    description: "Coverage line items on policies",
    columns: ["id", "policy_id", "coverage_type", "coverage_amount", "copay"],
  },
];
