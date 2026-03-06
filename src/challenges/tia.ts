import { Challenge } from "./types";

export const tiaChallenges: Challenge[] = [
  // TIER 1 — Foundations
  {
    id: "tia-1-01",
    tier: 1,
    title: "Member Directory",
    businessQuestion:
      "The ops team needs a list of all patients in the NYC region, sorted alphabetically by last name. Show their first name, last name, insurance type, and enrolled date.",
    hint: "Filter by region, order by last_name",
    syntaxHint: "SELECT ... FROM patients WHERE region = '...' ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, insurance_type, enrolled_date FROM patients WHERE region = 'NYC' ORDER BY last_name;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },
  {
    id: "tia-1-02",
    tier: 1,
    title: "Premium Members",
    businessQuestion:
      "Marketing wants to see all active memberships on the Premium plan. Show the membership ID, patient ID, start date, and billing cycle.",
    hint: "Join memberships to membership_plans, filter by plan_name and status",
    syntaxHint:
      "SELECT ... FROM memberships WHERE plan_id = ... AND status = '...'",
    expectedQuery:
      "SELECT id, patient_id, start_date, billing_cycle FROM memberships WHERE plan_id = 3 AND status = 'Active';",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "tia-1-03",
    tier: 1,
    title: "Recent Virtual Visits",
    businessQuestion:
      "Show the 20 most recent virtual appointments that were completed. Include appointment ID, patient ID, appointment date, and duration.",
    hint: "Filter by appointment_type and status, order by date descending, limit to 20",
    syntaxHint:
      "SELECT ... FROM appointments WHERE appointment_type = '...' AND status = '...' ORDER BY ... DESC LIMIT ...",
    expectedQuery:
      "SELECT id, patient_id, appointment_date, duration_minutes FROM appointments WHERE appointment_type = 'Virtual' AND status = 'Completed' ORDER BY appointment_date DESC LIMIT 20;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY", "LIMIT"],
  },
  {
    id: "tia-1-04",
    tier: 1,
    title: "High-Value Claims",
    businessQuestion:
      "Finance needs all denied claims where the amount billed exceeded $500. Show claim ID, patient ID, amount billed, amount paid, and claim date.",
    hint: "Two conditions: status = 'Denied' AND amount_billed > 500",
    syntaxHint: "SELECT ... FROM claims WHERE status = '...' AND amount_billed > ...",
    expectedQuery:
      "SELECT id, patient_id, amount_billed, amount_paid, claim_date FROM claims WHERE status = 'Denied' AND amount_billed > 500;",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "tia-1-05",
    tier: 1,
    title: "Service Menu",
    businessQuestion:
      "Product wants a list of all services that are NOT eligible for insurance coverage, sorted by price descending. Show the service name, category, and base price.",
    hint: "insurance_eligible is 0 for not covered",
    syntaxHint: "SELECT ... FROM services WHERE insurance_eligible = ... ORDER BY ... DESC",
    expectedQuery:
      "SELECT service_name, category, base_price FROM services WHERE insurance_eligible = 0 ORDER BY base_price DESC;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },

  // TIER 2 — Joins
  {
    id: "tia-2-01",
    tier: 2,
    title: "Member Appointments",
    businessQuestion:
      "Show all completed appointments with the patient's full name and the provider's name. Sort by appointment date descending.",
    hint: "Join appointments to patients and providers",
    syntaxHint:
      "SELECT ... FROM appointments a JOIN patients p ON ... JOIN providers pr ON ... WHERE ... ORDER BY ...",
    expectedQuery:
      "SELECT p.first_name || ' ' || p.last_name AS patient_name, pr.name AS provider_name, a.appointment_date, a.appointment_type FROM appointments a JOIN patients p ON a.patient_id = p.id JOIN providers pr ON a.provider_id = pr.id WHERE a.status = 'Completed' ORDER BY a.appointment_date DESC;",
    concepts: ["JOIN", "multiple joins", "concatenation", "ORDER BY"],
  },
  {
    id: "tia-2-02",
    tier: 2,
    title: "Provider Clinic Directory",
    businessQuestion:
      "HR needs all OB-GYN providers with their clinic name and city. Include providers even if they don't have an assigned location.",
    hint: "Use LEFT JOIN from providers to locations, filter by specialty",
    syntaxHint:
      "SELECT ... FROM providers pr LEFT JOIN locations l ON ... WHERE pr.specialty = '...'",
    expectedQuery:
      "SELECT pr.name, pr.specialty, l.name AS clinic_name, l.city FROM providers pr LEFT JOIN locations l ON pr.location_id = l.id WHERE pr.specialty = 'OB-GYN';",
    concepts: ["LEFT JOIN", "aliases", "WHERE"],
  },
  {
    id: "tia-2-03",
    tier: 2,
    title: "Membership Details",
    businessQuestion:
      "Show all active memberships with the patient's name, plan name, monthly fee, and start date. Sort by start date.",
    hint: "Join memberships to patients and membership_plans",
    syntaxHint:
      "SELECT ... FROM memberships m JOIN patients p ON ... JOIN membership_plans mp ON ... WHERE ... ORDER BY ...",
    expectedQuery:
      "SELECT p.first_name || ' ' || p.last_name AS member_name, mp.plan_name, mp.monthly_fee, m.start_date FROM memberships m JOIN patients p ON m.patient_id = p.id JOIN membership_plans mp ON m.plan_id = mp.id WHERE m.status = 'Active' ORDER BY m.start_date;",
    concepts: ["JOIN", "multiple joins", "concatenation", "WHERE"],
  },
  {
    id: "tia-2-04",
    tier: 2,
    title: "Referral Network",
    businessQuestion:
      "Show all referrals with the referring provider's name and specialty, the referred provider's name and specialty, and the referral reason.",
    hint: "Self-join: join referrals to providers TWICE with different aliases",
    syntaxHint:
      "SELECT ... FROM referrals r JOIN providers p1 ON r.referring_provider_id = p1.id JOIN providers p2 ON r.referred_provider_id = p2.id",
    expectedQuery:
      "SELECT p1.name AS referring_provider, p1.specialty AS referring_specialty, p2.name AS referred_provider, p2.specialty AS referred_specialty, r.reason FROM referrals r JOIN providers p1 ON r.referring_provider_id = p1.id JOIN providers p2 ON r.referred_provider_id = p2.id;",
    concepts: ["self-join", "multiple joins", "aliases"],
  },
  {
    id: "tia-2-05",
    tier: 2,
    title: "Patients Without Appointments",
    businessQuestion:
      "Find patients who have NEVER had an appointment. Show their ID, name, region, and enrolled date. These are members who need engagement outreach.",
    hint: "Use LEFT JOIN and filter WHERE appointment is NULL",
    syntaxHint:
      "SELECT ... FROM patients p LEFT JOIN appointments a ON ... WHERE a.id IS NULL",
    expectedQuery:
      "SELECT p.id, p.first_name, p.last_name, p.region, p.enrolled_date FROM patients p LEFT JOIN appointments a ON p.id = a.patient_id WHERE a.id IS NULL;",
    concepts: ["LEFT JOIN", "IS NULL", "anti-join pattern"],
  },

  // TIER 3 — Aggregation
  {
    id: "tia-3-01",
    tier: 3,
    title: "Revenue by Plan",
    businessQuestion:
      "Finance needs total membership revenue by plan. Show plan name, total paid payments, count of payments, and average payment amount. Only include payments with status 'Paid'.",
    hint: "Join membership_payments to memberships to membership_plans. GROUP BY plan_name.",
    syntaxHint:
      "SELECT ... SUM(...) ... COUNT(*) ... AVG(...) FROM membership_payments mp JOIN memberships m ON ... JOIN membership_plans pl ON ... WHERE ... GROUP BY ...",
    expectedQuery:
      "SELECT pl.plan_name, SUM(mp.amount) AS total_revenue, COUNT(*) AS payment_count, ROUND(AVG(mp.amount), 2) AS avg_payment FROM membership_payments mp JOIN memberships m ON mp.membership_id = m.id JOIN membership_plans pl ON m.plan_id = pl.id WHERE mp.status = 'Paid' GROUP BY pl.plan_name ORDER BY total_revenue DESC;",
    concepts: ["GROUP BY", "SUM", "COUNT", "AVG", "ROUND", "JOIN"],
  },
  {
    id: "tia-3-02",
    tier: 3,
    title: "Provider Caseload",
    businessQuestion:
      "Operations wants each provider's caseload: total appointments, unique patients seen, and average appointment duration. Only include providers with more than 20 appointments.",
    hint: "GROUP BY provider, use COUNT DISTINCT for unique patients, HAVING for the filter",
    syntaxHint:
      "SELECT ... COUNT(*) ... COUNT(DISTINCT ...) ... AVG(...) FROM appointments a JOIN providers pr ON ... GROUP BY ... HAVING ...",
    expectedQuery:
      "SELECT pr.name, COUNT(*) AS total_appointments, COUNT(DISTINCT a.patient_id) AS unique_patients, ROUND(AVG(a.duration_minutes), 1) AS avg_duration FROM appointments a JOIN providers pr ON a.provider_id = pr.id GROUP BY pr.id, pr.name HAVING COUNT(*) > 20 ORDER BY total_appointments DESC;",
    concepts: ["GROUP BY", "COUNT", "COUNT DISTINCT", "AVG", "HAVING", "JOIN"],
  },
  {
    id: "tia-3-03",
    tier: 3,
    title: "Denial Rate by Region",
    businessQuestion:
      "Risk management wants the claim denial rate by patient region. Show region, total claims, denied claims, and denial rate as a percentage.",
    hint: "Join claims to patients. Use SUM(CASE WHEN) to count denied. Denial rate = denied / total * 100.",
    syntaxHint:
      "SELECT ... SUM(CASE WHEN c.status = 'Denied' THEN 1 ELSE 0 END) ... FROM claims c JOIN patients p ON ... GROUP BY ...",
    expectedQuery:
      "SELECT p.region, COUNT(*) AS total_claims, SUM(CASE WHEN c.status = 'Denied' THEN 1 ELSE 0 END) AS denied_claims, ROUND(SUM(CASE WHEN c.status = 'Denied' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS denial_rate FROM claims c JOIN patients p ON c.patient_id = p.id GROUP BY p.region ORDER BY denial_rate DESC;",
    concepts: ["GROUP BY", "SUM", "CASE", "ROUND", "JOIN"],
  },
  {
    id: "tia-3-04",
    tier: 3,
    title: "Service Popularity",
    businessQuestion:
      "Product wants the top 10 most-used services. Show service name, category, usage count, total revenue (charged_amount), and average out-of-pocket cost.",
    hint: "Join patient_services to services, GROUP BY service, ORDER BY count DESC, LIMIT 10",
    syntaxHint:
      "SELECT ... COUNT(*) ... SUM(...) ... AVG(...) FROM patient_services ps JOIN services s ON ... GROUP BY ... ORDER BY ... LIMIT ...",
    expectedQuery:
      "SELECT s.service_name, s.category, COUNT(*) AS usage_count, ROUND(SUM(ps.charged_amount), 2) AS total_revenue, ROUND(AVG(ps.out_of_pocket), 2) AS avg_oop FROM patient_services ps JOIN services s ON ps.service_id = s.id GROUP BY s.id, s.service_name, s.category ORDER BY usage_count DESC LIMIT 10;",
    concepts: ["GROUP BY", "COUNT", "SUM", "AVG", "JOIN", "ORDER BY", "LIMIT"],
  },
  {
    id: "tia-3-05",
    tier: 3,
    title: "Monthly Appointment Volume",
    businessQuestion:
      "Show monthly completed appointment counts for 2025. Include the month and the count of completed appointments.",
    hint: "Use substr to extract year-month from appointment_date. Filter for 2025 and Completed status.",
    syntaxHint:
      "SELECT substr(appointment_date, 1, 7) AS month ... FROM appointments WHERE ... GROUP BY month ORDER BY month",
    expectedQuery:
      "SELECT substr(appointment_date, 1, 7) AS month, COUNT(*) AS completed_count FROM appointments WHERE status = 'Completed' AND appointment_date >= '2025-01-01' AND appointment_date < '2026-01-01' GROUP BY month ORDER BY month;",
    concepts: ["GROUP BY", "COUNT", "substr", "WHERE"],
  },

  // TIER 4 — Subqueries & Logic
  {
    id: "tia-4-01",
    tier: 4,
    title: "High-Value Members",
    businessQuestion:
      "Find patients whose total membership payments exceed the average total payment per patient. Show patient name, total paid, and the overall average for comparison.",
    hint: "Use a subquery to get total per patient, then compare against average of those totals",
    syntaxHint:
      "SELECT ... FROM (...) WHERE total_paid > (SELECT AVG(total_paid) FROM (...))",
    expectedQuery:
      "SELECT p.first_name, p.last_name, pt.total_paid FROM (SELECT patient_id, SUM(amount) AS total_paid FROM membership_payments WHERE status = 'Paid' GROUP BY patient_id) pt JOIN patients p ON pt.patient_id = p.id WHERE pt.total_paid > (SELECT AVG(total_paid) FROM (SELECT SUM(amount) AS total_paid FROM membership_payments WHERE status = 'Paid' GROUP BY patient_id)) ORDER BY pt.total_paid DESC;",
    concepts: ["subquery", "JOIN", "GROUP BY", "AVG", "SUM"],
  },
  {
    id: "tia-4-02",
    tier: 4,
    title: "Revenue Mix Breakdown",
    businessQuestion:
      "Calculate Tia's revenue from each channel: membership payments (Paid), insurance claims (Paid), and out-of-pocket service charges. Show channel name and total revenue.",
    hint: "Use UNION ALL to stack three separate queries",
    syntaxHint:
      "SELECT 'Memberships' AS channel, SUM(...) AS revenue FROM ... UNION ALL SELECT 'Insurance' ... UNION ALL SELECT 'Services' ...",
    expectedQuery:
      "SELECT 'Memberships' AS channel, SUM(amount) AS revenue FROM membership_payments WHERE status = 'Paid' UNION ALL SELECT 'Insurance', SUM(amount_paid) FROM claims WHERE status = 'Paid' UNION ALL SELECT 'Services (OOP)', SUM(out_of_pocket) FROM patient_services;",
    concepts: ["UNION ALL", "SUM", "WHERE"],
  },
  {
    id: "tia-4-03",
    tier: 4,
    title: "Member Engagement Tiers",
    businessQuestion:
      "Categorize patients by appointment activity: 'Highly Active' (10+ completed), 'Active' (4-9), 'Low' (1-3), 'Inactive' (0). Show the category and patient count for each.",
    hint: "Use a CASE statement on a subquery of completed appointment counts per patient. Include patients with 0 appointments via LEFT JOIN.",
    syntaxHint:
      "SELECT CASE WHEN ... END AS engagement_tier, COUNT(*) FROM ... GROUP BY engagement_tier",
    expectedQuery:
      "SELECT CASE WHEN COALESCE(ac.completed, 0) >= 10 THEN 'Highly Active' WHEN COALESCE(ac.completed, 0) >= 4 THEN 'Active' WHEN COALESCE(ac.completed, 0) >= 1 THEN 'Low' ELSE 'Inactive' END AS engagement_tier, COUNT(*) AS patient_count FROM patients p LEFT JOIN (SELECT patient_id, COUNT(*) AS completed FROM appointments WHERE status = 'Completed' GROUP BY patient_id) ac ON p.id = ac.patient_id GROUP BY engagement_tier ORDER BY patient_count DESC;",
    concepts: ["CASE", "COALESCE", "subquery", "LEFT JOIN", "GROUP BY"],
  },
  {
    id: "tia-4-04",
    tier: 4,
    title: "Partner Activation Rate",
    businessQuestion:
      "For each clinical partner, show the partner name, type, covered lives, actual enrolled patients, and activation rate (enrolled / covered_lives * 100). Sort by activation rate descending.",
    hint: "Join clinical_partners to a count from partner_patients",
    syntaxHint:
      "SELECT ... FROM clinical_partners cp LEFT JOIN (SELECT partner_id, COUNT(*) ... GROUP BY ...) enrolled ON ...",
    expectedQuery:
      "SELECT cp.partner_name, cp.partner_type, cp.covered_lives, COALESCE(e.enrolled_count, 0) AS enrolled_patients, ROUND(COALESCE(e.enrolled_count, 0) * 100.0 / cp.covered_lives, 1) AS activation_rate FROM clinical_partners cp LEFT JOIN (SELECT partner_id, COUNT(*) AS enrolled_count FROM partner_patients GROUP BY partner_id) e ON cp.id = e.partner_id ORDER BY activation_rate DESC;",
    concepts: ["subquery", "LEFT JOIN", "COALESCE", "ROUND", "GROUP BY"],
  },
  {
    id: "tia-4-05",
    tier: 4,
    title: "No-Show Impact",
    businessQuestion:
      "For each provider, calculate the no-show rate as a percentage of total appointments. Show provider name, total appointments, no-shows, and no-show rate. Only include providers with at least 10 appointments.",
    hint: "Use SUM(CASE WHEN) for no-show count, divide by total, multiply by 100",
    syntaxHint:
      "SELECT ... SUM(CASE WHEN a.status = 'No-show' THEN 1 ELSE 0 END) ... FROM appointments a JOIN providers pr ON ... GROUP BY ... HAVING ...",
    expectedQuery:
      "SELECT pr.name, COUNT(*) AS total_appointments, SUM(CASE WHEN a.status = 'No-show' THEN 1 ELSE 0 END) AS no_shows, ROUND(SUM(CASE WHEN a.status = 'No-show' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS no_show_rate FROM appointments a JOIN providers pr ON a.provider_id = pr.id GROUP BY pr.id, pr.name HAVING COUNT(*) >= 10 ORDER BY no_show_rate DESC;",
    concepts: ["CASE", "SUM", "ROUND", "GROUP BY", "HAVING", "JOIN"],
  },

  // TIER 5 — Window Functions & CTEs
  {
    id: "tia-5-01",
    tier: 5,
    title: "Provider Revenue Rankings",
    businessQuestion:
      "Rank providers within each specialty by total claim revenue (amount_paid from Paid claims). Show provider name, specialty, total revenue, and rank within specialty.",
    hint: "Use RANK() with PARTITION BY specialty",
    syntaxHint:
      "SELECT ... RANK() OVER (PARTITION BY ... ORDER BY ... DESC) ... FROM claims c JOIN providers pr ON ... WHERE ... GROUP BY ...",
    expectedQuery:
      "SELECT pr.name, pr.specialty, ROUND(SUM(c.amount_paid), 2) AS total_revenue, RANK() OVER (PARTITION BY pr.specialty ORDER BY SUM(c.amount_paid) DESC) AS specialty_rank FROM claims c JOIN providers pr ON c.provider_id = pr.id WHERE c.status = 'Paid' GROUP BY pr.id, pr.name, pr.specialty;",
    concepts: ["RANK", "OVER", "PARTITION BY", "GROUP BY", "JOIN"],
  },
  {
    id: "tia-5-02",
    tier: 5,
    title: "MRR Trend with Running Total",
    businessQuestion:
      "Calculate monthly membership revenue (MRR) for 2025 with a running total. Show month, monthly MRR, and cumulative MRR up to that month.",
    hint: "CTE for monthly totals, then SUM() OVER (ORDER BY month) for running total",
    syntaxHint:
      "WITH monthly AS (SELECT ... GROUP BY ...) SELECT month, mrr, SUM(mrr) OVER (ORDER BY month) AS cumulative_mrr FROM monthly",
    expectedQuery:
      "WITH monthly AS (SELECT substr(payment_date, 1, 7) AS month, ROUND(SUM(amount), 2) AS mrr FROM membership_payments WHERE status = 'Paid' AND payment_date >= '2025-01-01' AND payment_date < '2026-01-01' GROUP BY month) SELECT month, mrr, SUM(mrr) OVER (ORDER BY month) AS cumulative_mrr FROM monthly ORDER BY month;",
    concepts: ["CTE", "WITH", "SUM OVER", "window function", "GROUP BY"],
  },
  {
    id: "tia-5-03",
    tier: 5,
    title: "Month-over-Month Growth",
    businessQuestion:
      "Calculate the month-over-month change in completed appointment volume. Show month, completed count, previous month's count, and the percentage change.",
    hint: "Use a CTE for monthly counts, then LAG to get previous month",
    syntaxHint:
      "WITH monthly AS (...) SELECT month, count, LAG(count) OVER (...) AS prev, ... FROM monthly",
    expectedQuery:
      "WITH monthly AS (SELECT substr(appointment_date, 1, 7) AS month, COUNT(*) AS completed_count FROM appointments WHERE status = 'Completed' GROUP BY month) SELECT month, completed_count, LAG(completed_count) OVER (ORDER BY month) AS prev_month, ROUND((completed_count - LAG(completed_count) OVER (ORDER BY month)) * 100.0 / LAG(completed_count) OVER (ORDER BY month), 1) AS growth_pct FROM monthly ORDER BY month;",
    concepts: ["CTE", "LAG", "window function", "GROUP BY"],
  },
  {
    id: "tia-5-04",
    tier: 5,
    title: "Patient Lifetime Value",
    businessQuestion:
      "Calculate each patient's total lifetime value across all revenue streams (membership payments + insurance claim payments + out-of-pocket service charges). Show the top 20 by LTV with their name and total from each channel.",
    hint: "Use three CTEs for each revenue stream, then join all to patients",
    syntaxHint:
      "WITH mem AS (...), ins AS (...), svc AS (...) SELECT ... COALESCE(..., 0) + COALESCE(..., 0) + ... AS total_ltv FROM patients p LEFT JOIN mem ON ... LEFT JOIN ins ON ... LEFT JOIN svc ON ... ORDER BY total_ltv DESC LIMIT 20",
    expectedQuery:
      "WITH mem AS (SELECT patient_id, SUM(amount) AS mem_rev FROM membership_payments WHERE status = 'Paid' GROUP BY patient_id), ins AS (SELECT patient_id, SUM(amount_paid) AS ins_rev FROM claims WHERE status = 'Paid' GROUP BY patient_id), svc AS (SELECT patient_id, SUM(out_of_pocket) AS svc_rev FROM patient_services GROUP BY patient_id) SELECT p.first_name || ' ' || p.last_name AS patient_name, COALESCE(mem.mem_rev, 0) AS membership_revenue, COALESCE(ins.ins_rev, 0) AS insurance_revenue, COALESCE(svc.svc_rev, 0) AS service_revenue, ROUND(COALESCE(mem.mem_rev, 0) + COALESCE(ins.ins_rev, 0) + COALESCE(svc.svc_rev, 0), 2) AS total_ltv FROM patients p LEFT JOIN mem ON p.id = mem.patient_id LEFT JOIN ins ON p.id = ins.patient_id LEFT JOIN svc ON p.id = svc.patient_id ORDER BY total_ltv DESC LIMIT 20;",
    concepts: ["CTE", "multiple CTEs", "COALESCE", "LEFT JOIN", "SUM"],
  },
  {
    id: "tia-5-05",
    tier: 5,
    title: "Enrollment Cohort Retention",
    businessQuestion:
      "Group patients by enrollment quarter. For each cohort, count total patients and the number who had at least 1 completed appointment within 90 days of enrolling. Show cohort, total, activated count, and activation rate.",
    hint: "Use CTEs. Cohort = substr of enrolled_date truncated to quarter. Join to appointments checking date range.",
    syntaxHint:
      "WITH cohorts AS (...), activated AS (...) SELECT cohort, total, activated, ROUND(activated * 100.0 / total, 1) ...",
    expectedQuery:
      "WITH cohorts AS (SELECT id AS patient_id, CASE WHEN CAST(substr(enrolled_date, 6, 2) AS INTEGER) <= 3 THEN substr(enrolled_date, 1, 4) || '-Q1' WHEN CAST(substr(enrolled_date, 6, 2) AS INTEGER) <= 6 THEN substr(enrolled_date, 1, 4) || '-Q2' WHEN CAST(substr(enrolled_date, 6, 2) AS INTEGER) <= 9 THEN substr(enrolled_date, 1, 4) || '-Q3' ELSE substr(enrolled_date, 1, 4) || '-Q4' END AS cohort, enrolled_date FROM patients), activated AS (SELECT DISTINCT c.patient_id FROM cohorts c JOIN appointments a ON c.patient_id = a.patient_id WHERE a.status = 'Completed' AND a.appointment_date <= date(c.enrolled_date, '+90 days')) SELECT c.cohort, COUNT(*) AS total_patients, COUNT(act.patient_id) AS activated, ROUND(COUNT(act.patient_id) * 100.0 / COUNT(*), 1) AS activation_rate FROM cohorts c LEFT JOIN activated act ON c.patient_id = act.patient_id GROUP BY c.cohort ORDER BY c.cohort;",
    concepts: ["CTE", "CASE", "date function", "LEFT JOIN", "GROUP BY"],
  },
];
