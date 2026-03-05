import { Challenge } from "./types";

export const healthcareChallenges: Challenge[] = [
  // TIER 1 — Foundations
  {
    id: "hc-1-01",
    tier: 1,
    title: "Patient Directory",
    businessQuestion:
      "The front desk needs a list of all patients in California, sorted alphabetically by last name. Show their full name, city, and insurance type.",
    hint: "Filter by state, order by last_name",
    syntaxHint: "SELECT ... FROM patients WHERE state = '...' ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, city, insurance_type FROM patients WHERE state = 'CA' ORDER BY last_name;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },
  {
    id: "hc-1-02",
    tier: 1,
    title: "Recent High-Value Claims",
    businessQuestion:
      "Finance wants to see the 20 most expensive claims submitted in 2025. Show the claim ID, amount, status, and submitted date.",
    hint: "Filter by year in submitted_date, order by amount descending, limit to 20",
    syntaxHint:
      "SELECT ... FROM claims WHERE submitted_date >= '...' ORDER BY ... DESC LIMIT ...",
    expectedQuery:
      "SELECT id, amount, status, submitted_date FROM claims WHERE submitted_date >= '2025-01-01' ORDER BY amount DESC LIMIT 20;",
    concepts: ["SELECT", "WHERE", "ORDER BY", "LIMIT"],
  },
  {
    id: "hc-1-03",
    tier: 1,
    title: "Denied Claims",
    businessQuestion:
      "The billing team needs all denied claims over $500. Show claim ID, patient ID, amount, and submitted date.",
    hint: "Two conditions: status AND amount",
    syntaxHint: "SELECT ... FROM claims WHERE status = '...' AND amount > ...",
    expectedQuery:
      "SELECT id, patient_id, amount, submitted_date FROM claims WHERE status = 'denied' AND amount > 500;",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "hc-1-04",
    tier: 1,
    title: "Facility Census",
    businessQuestion:
      "Administration wants a list of all hospitals (not clinics or urgent care) with more than 300 beds, sorted by bed count descending.",
    hint: "Filter on type and bed_count",
    syntaxHint: "SELECT ... FROM facilities WHERE type = '...' AND bed_count > ... ORDER BY ...",
    expectedQuery:
      "SELECT name, city, state, bed_count FROM facilities WHERE type = 'Hospital' AND bed_count > 300 ORDER BY bed_count DESC;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "hc-1-05",
    tier: 1,
    title: "Chronic Conditions",
    businessQuestion:
      "The care management team needs all chronic diagnoses. Show the code, description, and category.",
    hint: "chronic is stored as 1 (true) or 0 (false)",
    syntaxHint: "SELECT ... FROM diagnoses WHERE chronic = ...",
    expectedQuery:
      "SELECT code, description, category FROM diagnoses WHERE chronic = 1;",
    concepts: ["SELECT", "WHERE"],
  },
  // TIER 2 — Joins
  {
    id: "hc-2-01",
    tier: 2,
    title: "Claims with Patient Names",
    businessQuestion:
      "The billing department needs a report of all pending claims showing the patient's full name, claim amount, and submitted date.",
    hint: "Join claims to patients on patient_id",
    syntaxHint:
      "SELECT ... FROM claims JOIN patients ON claims.patient_id = patients.id WHERE ...",
    expectedQuery:
      "SELECT p.first_name, p.last_name, c.amount, c.submitted_date FROM claims c JOIN patients p ON c.patient_id = p.id WHERE c.status = 'pending';",
    concepts: ["JOIN", "aliases", "WHERE"],
  },
  {
    id: "hc-2-02",
    tier: 2,
    title: "Provider Facility Roster",
    businessQuestion:
      "HR needs a directory of all cardiologists with their facility name and city.",
    hint: "Join providers to facilities, filter by specialty",
    syntaxHint:
      "SELECT ... FROM providers p JOIN facilities f ON p.facility_id = f.id WHERE ...",
    expectedQuery:
      "SELECT p.first_name, p.last_name, f.name AS facility_name, f.city FROM providers p JOIN facilities f ON p.facility_id = f.id WHERE p.specialty = 'Cardiology';",
    concepts: ["JOIN", "aliases", "WHERE", "AS"],
  },
  {
    id: "hc-2-03",
    tier: 2,
    title: "Claims with Diagnosis Details",
    businessQuestion:
      "The quality team wants to see all claims for cardiovascular diagnoses. Show claim ID, patient ID, diagnosis description, and amount.",
    hint: "Join claims to diagnoses on diagnosis_code = code, filter by category",
    syntaxHint:
      "SELECT ... FROM claims c JOIN diagnoses d ON c.diagnosis_code = d.code WHERE d.category = '...'",
    expectedQuery:
      "SELECT c.id, c.patient_id, d.description, c.amount FROM claims c JOIN diagnoses d ON c.diagnosis_code = d.code WHERE d.category = 'Cardiovascular';",
    concepts: ["JOIN", "aliases", "WHERE"],
  },
  {
    id: "hc-2-04",
    tier: 2,
    title: "Appointment History",
    businessQuestion:
      "Show all completed appointments with the patient name, provider name, date, and visit type. Sort by date descending.",
    hint: "You need to join appointments to BOTH patients and providers",
    syntaxHint:
      "SELECT ... FROM appointments a JOIN patients p ON ... JOIN providers pr ON ... WHERE ... ORDER BY ...",
    expectedQuery:
      "SELECT p.first_name || ' ' || p.last_name AS patient_name, pr.first_name || ' ' || pr.last_name AS provider_name, a.scheduled_date, a.visit_type FROM appointments a JOIN patients p ON a.patient_id = p.id JOIN providers pr ON a.provider_id = pr.id WHERE a.status = 'completed' ORDER BY a.scheduled_date DESC;",
    concepts: ["JOIN", "multiple joins", "concatenation", "ORDER BY"],
  },
  // TIER 3 — Aggregation
  {
    id: "hc-3-01",
    tier: 3,
    title: "Claims by Specialty",
    businessQuestion:
      "The CFO wants to know: which medical specialties have the highest average claim amount? Only show specialties with more than 50 claims.",
    hint: "Join claims to providers, GROUP BY specialty, use HAVING for the count filter",
    syntaxHint:
      "SELECT ... AVG(...) FROM claims c JOIN providers p ON ... GROUP BY ... HAVING COUNT(*) > ... ORDER BY ...",
    expectedQuery:
      "SELECT p.specialty, COUNT(*) AS claim_count, ROUND(AVG(c.amount), 2) AS avg_amount FROM claims c JOIN providers p ON c.provider_id = p.id GROUP BY p.specialty HAVING COUNT(*) > 50 ORDER BY avg_amount DESC;",
    concepts: ["GROUP BY", "HAVING", "AVG", "COUNT", "ROUND", "JOIN"],
  },
  {
    id: "hc-3-02",
    tier: 3,
    title: "Denial Rate by Insurance",
    businessQuestion:
      "Risk management wants the claim denial rate by insurance type. Show the insurance type, total claims, denied claims, and denial percentage.",
    hint: "Join claims to patients. Use SUM with CASE to count denied claims. Denial rate = denied / total * 100",
    syntaxHint:
      "SELECT ... SUM(CASE WHEN ... THEN 1 ELSE 0 END) ... FROM claims c JOIN patients p ON ... GROUP BY ...",
    expectedQuery:
      "SELECT p.insurance_type, COUNT(*) AS total_claims, SUM(CASE WHEN c.status = 'denied' THEN 1 ELSE 0 END) AS denied_claims, ROUND(SUM(CASE WHEN c.status = 'denied' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS denial_rate FROM claims c JOIN patients p ON c.patient_id = p.id GROUP BY p.insurance_type ORDER BY denial_rate DESC;",
    concepts: ["GROUP BY", "SUM", "CASE", "ROUND", "JOIN"],
  },
  {
    id: "hc-3-03",
    tier: 3,
    title: "Busiest Facilities",
    businessQuestion:
      "Operations wants the top 10 facilities by appointment volume. Show facility name, city, and total appointments.",
    hint: "Join appointments to providers to facilities. Group by facility.",
    syntaxHint:
      "SELECT ... COUNT(*) FROM appointments a JOIN providers p ON ... JOIN facilities f ON ... GROUP BY ... ORDER BY ... LIMIT ...",
    expectedQuery:
      "SELECT f.name, f.city, COUNT(*) AS total_appointments FROM appointments a JOIN providers p ON a.provider_id = p.id JOIN facilities f ON p.facility_id = f.id GROUP BY f.id, f.name, f.city ORDER BY total_appointments DESC LIMIT 10;",
    concepts: ["GROUP BY", "COUNT", "JOIN", "ORDER BY", "LIMIT"],
  },
  {
    id: "hc-3-04",
    tier: 3,
    title: "Monthly Claim Trends",
    businessQuestion:
      "Finance needs monthly claim totals for 2025. Show the month, number of claims, and total dollar amount.",
    hint: "Use substr or strftime to extract year-month from submitted_date",
    syntaxHint:
      "SELECT substr(submitted_date, 1, 7) AS month ... GROUP BY month ORDER BY month",
    expectedQuery:
      "SELECT substr(submitted_date, 1, 7) AS month, COUNT(*) AS claim_count, ROUND(SUM(amount), 2) AS total_amount FROM claims WHERE submitted_date >= '2025-01-01' AND submitted_date < '2026-01-01' GROUP BY month ORDER BY month;",
    concepts: ["GROUP BY", "substr", "SUM", "COUNT", "WHERE"],
  },
  // TIER 4 — Subqueries & Logic
  {
    id: "hc-4-01",
    tier: 4,
    title: "Above-Average Spenders",
    businessQuestion:
      "The analytics team wants patients whose total claim amount exceeds the overall average total per patient. Show patient name, total claims, and total amount.",
    hint: "First calculate total per patient (subquery or CTE), then compare against the average of those totals",
    syntaxHint:
      "SELECT ... FROM (...) WHERE total_amount > (SELECT AVG(total_amount) FROM (...))",
    expectedQuery:
      "SELECT p.first_name, p.last_name, pt.claim_count, pt.total_amount FROM (SELECT patient_id, COUNT(*) AS claim_count, ROUND(SUM(amount), 2) AS total_amount FROM claims GROUP BY patient_id) pt JOIN patients p ON pt.patient_id = p.id WHERE pt.total_amount > (SELECT AVG(total_amount) FROM (SELECT SUM(amount) AS total_amount FROM claims GROUP BY patient_id)) ORDER BY pt.total_amount DESC;",
    concepts: ["subquery", "JOIN", "GROUP BY", "AVG", "SUM"],
  },
  {
    id: "hc-4-02",
    tier: 4,
    title: "Diagnosis Category Breakdown",
    businessQuestion:
      "Create a report showing each diagnosis category, the number of claims, total amount, and a label: 'High Volume' if over 500 claims, 'Medium' if 200-500, 'Low' if under 200.",
    hint: "Use CASE to create the label based on COUNT",
    syntaxHint:
      "SELECT ... CASE WHEN COUNT(*) > 500 THEN '...' WHEN ... END AS volume_label ... GROUP BY ...",
    expectedQuery:
      "SELECT d.category, COUNT(*) AS claim_count, ROUND(SUM(c.amount), 2) AS total_amount, CASE WHEN COUNT(*) > 500 THEN 'High Volume' WHEN COUNT(*) >= 200 THEN 'Medium' ELSE 'Low' END AS volume_label FROM claims c JOIN diagnoses d ON c.diagnosis_code = d.code GROUP BY d.category ORDER BY claim_count DESC;",
    concepts: ["CASE", "GROUP BY", "JOIN", "COUNT", "SUM"],
  },
  // TIER 5 — Window Functions & CTEs
  {
    id: "hc-5-01",
    tier: 5,
    title: "Provider Claim Rankings",
    businessQuestion:
      "Rank all providers within their specialty by total claim amount. Show provider name, specialty, total amount, and their rank within the specialty.",
    hint: "Use RANK() or ROW_NUMBER() with PARTITION BY specialty",
    syntaxHint:
      "SELECT ... RANK() OVER (PARTITION BY ... ORDER BY ... DESC) AS rank ... FROM ...",
    expectedQuery:
      "SELECT p.first_name || ' ' || p.last_name AS provider_name, p.specialty, ROUND(SUM(c.amount), 2) AS total_amount, RANK() OVER (PARTITION BY p.specialty ORDER BY SUM(c.amount) DESC) AS specialty_rank FROM claims c JOIN providers p ON c.provider_id = p.id GROUP BY p.id, p.first_name, p.last_name, p.specialty;",
    concepts: ["RANK", "OVER", "PARTITION BY", "GROUP BY", "JOIN"],
  },
  {
    id: "hc-5-02",
    tier: 5,
    title: "Running Monthly Totals",
    businessQuestion:
      "Finance wants a running total of claim amounts by month for 2025. Show each month, the monthly total, and the cumulative total up to that month.",
    hint: "Use a CTE to get monthly totals, then SUM() OVER (ORDER BY month) for the running total",
    syntaxHint:
      "WITH monthly AS (SELECT ... GROUP BY ...) SELECT month, monthly_total, SUM(monthly_total) OVER (ORDER BY month) AS running_total FROM monthly",
    expectedQuery:
      "WITH monthly AS (SELECT substr(submitted_date, 1, 7) AS month, ROUND(SUM(amount), 2) AS monthly_total FROM claims WHERE submitted_date >= '2025-01-01' AND submitted_date < '2026-01-01' GROUP BY month) SELECT month, monthly_total, SUM(monthly_total) OVER (ORDER BY month) AS running_total FROM monthly ORDER BY month;",
    concepts: ["CTE", "WITH", "SUM OVER", "window function", "GROUP BY"],
  },
];
