import { Challenge } from "./types";

export const insuranceChallenges: Challenge[] = [
  // TIER 1 — Foundations
  {
    id: "ins-1-01",
    tier: 1,
    title: "Member Directory",
    businessQuestion:
      "The customer service team needs a list of all members in California, sorted by last name. Show their full name, state, and credit score.",
    hint: "Filter by state, order by last_name",
    syntaxHint: "SELECT ... FROM members WHERE state = '...' ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, state, credit_score FROM members WHERE state = 'CA' ORDER BY last_name;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },
  {
    id: "ins-1-02",
    tier: 1,
    title: "High-Premium Policies",
    businessQuestion:
      "The underwriting team wants the 20 most expensive active policies. Show policy ID, type, premium, and coverage limit.",
    hint: "Filter by status, order by premium descending, limit to 20",
    syntaxHint:
      "SELECT ... FROM policies WHERE status = '...' ORDER BY ... DESC LIMIT ...",
    expectedQuery:
      "SELECT id, policy_type, premium, coverage_limit FROM policies WHERE status = 'active' ORDER BY premium DESC LIMIT 20;",
    concepts: ["SELECT", "WHERE", "ORDER BY", "LIMIT"],
  },
  {
    id: "ins-1-03",
    tier: 1,
    title: "Denied Claims",
    businessQuestion:
      "Risk management needs all denied claims over $10,000. Show claim ID, member ID, amount claimed, and filed date.",
    hint: "Two conditions: status AND amount_claimed",
    syntaxHint: "SELECT ... FROM claims WHERE status = '...' AND amount_claimed > ...",
    expectedQuery:
      "SELECT id, member_id, amount_claimed, filed_date FROM claims WHERE status = 'denied' AND amount_claimed > 10000;",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "ins-1-04",
    tier: 1,
    title: "Experienced Adjusters",
    businessQuestion:
      "HR needs all adjusters in the West region with more than 15 years of experience, sorted by experience descending.",
    hint: "Filter on region and years_experience",
    syntaxHint: "SELECT ... FROM adjusters WHERE region = '...' AND years_experience > ... ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, region, years_experience FROM adjusters WHERE region = 'West' AND years_experience > 15 ORDER BY years_experience DESC;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "ins-1-05",
    tier: 1,
    title: "Open Investigations",
    businessQuestion:
      "The fraud unit needs all claims currently under investigation. Show claim ID, claim type, amount claimed, and incident date.",
    hint: "Filter by status = 'under_investigation'",
    syntaxHint: "SELECT ... FROM claims WHERE status = '...'",
    expectedQuery:
      "SELECT id, claim_type, amount_claimed, incident_date FROM claims WHERE status = 'under_investigation';",
    concepts: ["SELECT", "WHERE"],
  },
  // TIER 2 — Joins
  {
    id: "ins-2-01",
    tier: 2,
    title: "Claims with Member Names",
    businessQuestion:
      "The claims department needs a report of all open claims showing the member's full name, claim type, amount claimed, and filed date.",
    hint: "Join claims to members on member_id",
    syntaxHint:
      "SELECT ... FROM claims c JOIN members m ON c.member_id = m.id WHERE ...",
    expectedQuery:
      "SELECT m.first_name, m.last_name, c.claim_type, c.amount_claimed, c.filed_date FROM claims c JOIN members m ON c.member_id = m.id WHERE c.status = 'open';",
    concepts: ["JOIN", "aliases", "WHERE"],
  },
  {
    id: "ins-2-02",
    tier: 2,
    title: "Adjuster Caseload",
    businessQuestion:
      "Management wants to see open claims with the assigned adjuster's name and region. Show claim ID, amount claimed, adjuster name, and region.",
    hint: "Join claims to adjusters, filter by claim status",
    syntaxHint:
      "SELECT ... FROM claims c JOIN adjusters a ON c.adjuster_id = a.id WHERE ...",
    expectedQuery:
      "SELECT c.id, c.amount_claimed, a.first_name || ' ' || a.last_name AS adjuster_name, a.region FROM claims c JOIN adjusters a ON c.adjuster_id = a.id WHERE c.status = 'open';",
    concepts: ["JOIN", "aliases", "WHERE", "concatenation"],
  },
  {
    id: "ins-2-03",
    tier: 2,
    title: "Policy Coverage Details",
    businessQuestion:
      "A member services rep needs to see all coverages for auto policies. Show the policy ID, coverage type, coverage amount, and copay.",
    hint: "Join coverages to policies on policy_id, filter by policy_type",
    syntaxHint:
      "SELECT ... FROM coverages cv JOIN policies p ON cv.policy_id = p.id WHERE p.policy_type = '...'",
    expectedQuery:
      "SELECT p.id AS policy_id, cv.coverage_type, cv.coverage_amount, cv.copay FROM coverages cv JOIN policies p ON cv.policy_id = p.id WHERE p.policy_type = 'auto';",
    concepts: ["JOIN", "aliases", "WHERE", "AS"],
  },
  {
    id: "ins-2-04",
    tier: 2,
    title: "Claims with Policy Details",
    businessQuestion:
      "The analytics team wants all collision claims with the associated policy type, premium, and member name. Sort by amount claimed descending.",
    hint: "Join claims to members and policies",
    syntaxHint:
      "SELECT ... FROM claims c JOIN members m ON ... JOIN policies p ON c.policy_id = p.id WHERE ... ORDER BY ...",
    expectedQuery:
      "SELECT m.first_name, m.last_name, p.policy_type, p.premium, c.amount_claimed, c.filed_date FROM claims c JOIN members m ON c.member_id = m.id JOIN policies p ON c.policy_id = p.id WHERE c.claim_type = 'collision' ORDER BY c.amount_claimed DESC;",
    concepts: ["JOIN", "multiple joins", "WHERE", "ORDER BY"],
  },
  // TIER 3 — Aggregation
  {
    id: "ins-3-01",
    tier: 3,
    title: "Claims by Type",
    businessQuestion:
      "The CFO wants to know: which claim types have the highest average payout? Show claim type, total claims, average amount claimed, and average amount approved. Only include types with more than 200 claims.",
    hint: "GROUP BY claim_type, use HAVING for the count filter",
    syntaxHint:
      "SELECT claim_type, COUNT(*), ROUND(AVG(amount_claimed), 2), ROUND(AVG(amount_approved), 2) FROM claims GROUP BY ... HAVING ... ORDER BY ...",
    expectedQuery:
      "SELECT claim_type, COUNT(*) AS total_claims, ROUND(AVG(amount_claimed), 2) AS avg_claimed, ROUND(AVG(amount_approved), 2) AS avg_approved FROM claims GROUP BY claim_type HAVING COUNT(*) > 200 ORDER BY avg_claimed DESC;",
    concepts: ["GROUP BY", "HAVING", "AVG", "COUNT", "ROUND"],
  },
  {
    id: "ins-3-02",
    tier: 3,
    title: "Denial Rate by Policy Type",
    businessQuestion:
      "Risk management wants the claim denial rate by policy type. Show the policy type, total claims, denied claims, and denial percentage.",
    hint: "Join claims to policies. Use SUM with CASE to count denied claims.",
    syntaxHint:
      "SELECT ... SUM(CASE WHEN ... THEN 1 ELSE 0 END) ... FROM claims c JOIN policies p ON ... GROUP BY ...",
    expectedQuery:
      "SELECT p.policy_type, COUNT(*) AS total_claims, SUM(CASE WHEN c.status = 'denied' THEN 1 ELSE 0 END) AS denied_claims, ROUND(SUM(CASE WHEN c.status = 'denied' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS denial_rate FROM claims c JOIN policies p ON c.policy_id = p.id GROUP BY p.policy_type ORDER BY denial_rate DESC;",
    concepts: ["GROUP BY", "SUM", "CASE", "ROUND", "JOIN"],
  },
  {
    id: "ins-3-03",
    tier: 3,
    title: "Top Adjusters by Volume",
    businessQuestion:
      "Management wants the top 10 adjusters by number of closed claims. Show adjuster name, region, and total closed claims.",
    hint: "Join claims to adjusters, filter by claim status, group by adjuster",
    syntaxHint:
      "SELECT ... COUNT(*) FROM claims c JOIN adjusters a ON ... WHERE ... GROUP BY ... ORDER BY ... LIMIT ...",
    expectedQuery:
      "SELECT a.first_name || ' ' || a.last_name AS adjuster_name, a.region, COUNT(*) AS closed_claims FROM claims c JOIN adjusters a ON c.adjuster_id = a.id WHERE c.status = 'closed' GROUP BY a.id, a.first_name, a.last_name, a.region ORDER BY closed_claims DESC LIMIT 10;",
    concepts: ["GROUP BY", "COUNT", "JOIN", "ORDER BY", "LIMIT"],
  },
  {
    id: "ins-3-04",
    tier: 3,
    title: "Monthly Claim Trends",
    businessQuestion:
      "Finance needs monthly claim totals for 2025. Show the month, number of claims, and total amount claimed.",
    hint: "Use substr to extract year-month from filed_date",
    syntaxHint:
      "SELECT substr(filed_date, 1, 7) AS month ... GROUP BY month ORDER BY month",
    expectedQuery:
      "SELECT substr(filed_date, 1, 7) AS month, COUNT(*) AS claim_count, ROUND(SUM(amount_claimed), 2) AS total_claimed FROM claims WHERE filed_date >= '2025-01-01' AND filed_date < '2026-01-01' GROUP BY month ORDER BY month;",
    concepts: ["GROUP BY", "substr", "SUM", "COUNT", "WHERE"],
  },
  // TIER 4 — Subqueries & Logic
  {
    id: "ins-4-01",
    tier: 4,
    title: "Above-Average Claimants",
    businessQuestion:
      "The analytics team wants members whose total claims exceed the overall average total per member. Show member name, total claims count, and total amount claimed.",
    hint: "Use a subquery to calculate total per member, then compare against the average of those totals",
    syntaxHint:
      "SELECT ... FROM (...) WHERE total_claimed > (SELECT AVG(total_claimed) FROM (...))",
    expectedQuery:
      "SELECT m.first_name, m.last_name, mt.claim_count, mt.total_claimed FROM (SELECT member_id, COUNT(*) AS claim_count, ROUND(SUM(amount_claimed), 2) AS total_claimed FROM claims GROUP BY member_id) mt JOIN members m ON mt.member_id = m.id WHERE mt.total_claimed > (SELECT AVG(total_claimed) FROM (SELECT SUM(amount_claimed) AS total_claimed FROM claims GROUP BY member_id)) ORDER BY mt.total_claimed DESC;",
    concepts: ["subquery", "JOIN", "GROUP BY", "AVG", "SUM"],
  },
  {
    id: "ins-4-02",
    tier: 4,
    title: "Claim Risk Assessment",
    businessQuestion:
      "Create a report showing each claim type, the number of claims, total amount, and a risk label: 'High Risk' if over 500 claims, 'Medium' if 200-500, 'Low' if under 200.",
    hint: "Use CASE to create the label based on COUNT",
    syntaxHint:
      "SELECT ... CASE WHEN COUNT(*) > 500 THEN '...' ... END AS risk_label ... GROUP BY ...",
    expectedQuery:
      "SELECT claim_type, COUNT(*) AS claim_count, ROUND(SUM(amount_claimed), 2) AS total_amount, CASE WHEN COUNT(*) > 500 THEN 'High Risk' WHEN COUNT(*) >= 200 THEN 'Medium' ELSE 'Low' END AS risk_label FROM claims GROUP BY claim_type ORDER BY claim_count DESC;",
    concepts: ["CASE", "GROUP BY", "COUNT", "SUM"],
  },
  // TIER 5 — Window Functions & CTEs
  {
    id: "ins-5-01",
    tier: 5,
    title: "Adjuster Claim Rankings",
    businessQuestion:
      "Rank all adjusters within their region by total closed claim payouts. Show adjuster name, region, total approved amount, and their rank within the region.",
    hint: "Use RANK() with PARTITION BY region",
    syntaxHint:
      "SELECT ... RANK() OVER (PARTITION BY ... ORDER BY ... DESC) AS rank ... FROM ...",
    expectedQuery:
      "SELECT a.first_name || ' ' || a.last_name AS adjuster_name, a.region, ROUND(SUM(c.amount_approved), 2) AS total_approved, RANK() OVER (PARTITION BY a.region ORDER BY SUM(c.amount_approved) DESC) AS region_rank FROM claims c JOIN adjusters a ON c.adjuster_id = a.id WHERE c.status = 'closed' GROUP BY a.id, a.first_name, a.last_name, a.region;",
    concepts: ["RANK", "OVER", "PARTITION BY", "GROUP BY", "JOIN"],
  },
  {
    id: "ins-5-02",
    tier: 5,
    title: "Running Monthly Payouts",
    businessQuestion:
      "Finance wants a running total of approved claim payouts by month for 2025. Show each month, the monthly payout, and the cumulative total.",
    hint: "Use a CTE for monthly totals, then SUM() OVER for the running total",
    syntaxHint:
      "WITH monthly AS (SELECT ... GROUP BY ...) SELECT month, monthly_total, SUM(monthly_total) OVER (ORDER BY month) AS running_total FROM monthly",
    expectedQuery:
      "WITH monthly AS (SELECT substr(filed_date, 1, 7) AS month, ROUND(SUM(amount_approved), 2) AS monthly_payout FROM claims WHERE filed_date >= '2025-01-01' AND filed_date < '2026-01-01' AND status = 'closed' GROUP BY month) SELECT month, monthly_payout, SUM(monthly_payout) OVER (ORDER BY month) AS running_total FROM monthly ORDER BY month;",
    concepts: ["CTE", "WITH", "SUM OVER", "window function", "GROUP BY"],
  },
];
