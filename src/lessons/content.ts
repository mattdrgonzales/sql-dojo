import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // ─── MODULE 1: THE BASICS ───
  {
    id: "select-all",
    module: "basics",
    title: "SELECT * (all columns)",
    order: 1,
    explanation:
      "Every SQL query starts with SELECT. The asterisk (*) means 'give me every column.' FROM tells the database which table to look in. Think of a table like a spreadsheet — SELECT picks the columns, FROM picks the sheet.",
    syntax: "SELECT * FROM table_name;",
    examples: [
      {
        description: "Get everything from the facilities table",
        query: "SELECT * FROM facilities LIMIT 5;",
      },
      {
        description: "Get everything from the diagnoses table",
        query: "SELECT * FROM diagnoses LIMIT 5;",
      },
    ],
    tryIt:
      "Try: SELECT * FROM patients LIMIT 10; — see what columns exist in the patients table.",
  },
  {
    id: "select-columns",
    module: "basics",
    title: "SELECT specific columns",
    order: 2,
    explanation:
      "Instead of *, list the exact columns you want, separated by commas. This is better practice than SELECT * because you only get the data you need and the output is cleaner.",
    syntax: "SELECT column1, column2 FROM table_name;",
    examples: [
      {
        description: "Get just names and cities from facilities",
        query: "SELECT name, city, state FROM facilities LIMIT 5;",
      },
      {
        description: "Get patient names and insurance type",
        query:
          "SELECT first_name, last_name, insurance_type FROM patients LIMIT 5;",
      },
    ],
    tryIt:
      "Try: SELECT first_name, last_name, specialty FROM providers LIMIT 10;",
  },
  {
    id: "aliases",
    module: "basics",
    title: "AS (column aliases)",
    order: 3,
    explanation:
      "AS lets you rename a column in the output. The data doesn't change — just the header. Useful for making results more readable or when doing calculations.",
    syntax: "SELECT column AS alias_name FROM table_name;",
    examples: [
      {
        description: "Rename columns for clarity",
        query:
          "SELECT name AS facility_name, bed_count AS beds FROM facilities LIMIT 5;",
      },
      {
        description: "Label a calculation",
        query:
          "SELECT name, bed_count * 2 AS double_beds FROM facilities WHERE bed_count > 0 LIMIT 5;",
      },
    ],
    tryIt:
      "Try: SELECT first_name AS fname, last_name AS lname FROM patients LIMIT 5;",
  },
  {
    id: "distinct",
    module: "basics",
    title: "DISTINCT (unique values)",
    order: 4,
    explanation:
      "DISTINCT removes duplicate rows from your results. Put it right after SELECT. Handy when you want to know what unique values exist in a column.",
    syntax: "SELECT DISTINCT column FROM table_name;",
    examples: [
      {
        description: "What insurance types exist?",
        query: "SELECT DISTINCT insurance_type FROM patients;",
      },
      {
        description: "What states do our facilities operate in?",
        query: "SELECT DISTINCT state FROM facilities ORDER BY state;",
      },
    ],
    tryIt:
      "Try: SELECT DISTINCT specialty FROM providers ORDER BY specialty; — see all specialties.",
  },

  // ─── MODULE 2: FILTERING ───
  {
    id: "where-equals",
    module: "filtering",
    title: "WHERE = (exact match)",
    order: 1,
    explanation:
      "WHERE filters rows. Only rows that match the condition are returned. Use = for exact matches. Text values must be wrapped in single quotes. Numbers don't need quotes.",
    syntax: "SELECT * FROM table WHERE column = 'value';",
    examples: [
      {
        description: "Find all hospitals (not clinics or urgent care)",
        query:
          "SELECT name, city, state FROM facilities WHERE type = 'Hospital' LIMIT 5;",
      },
      {
        description: "Find facilities with exactly 0 beds",
        query:
          "SELECT name, type FROM facilities WHERE bed_count = 0 LIMIT 5;",
      },
    ],
    tryIt:
      "Try: SELECT * FROM patients WHERE state = 'CA' LIMIT 10; — all California patients.",
  },
  {
    id: "where-comparison",
    module: "filtering",
    title: "Comparison operators (>, <, >=, <=, !=)",
    order: 2,
    explanation:
      "Beyond =, you can use: > (greater than), < (less than), >= (greater or equal), <= (less or equal), != or <> (not equal). These work on numbers, text (alphabetical), and dates (chronological).",
    syntax: "SELECT * FROM table WHERE column > value;",
    examples: [
      {
        description: "Facilities with more than 500 beds",
        query:
          "SELECT name, type, bed_count FROM facilities WHERE bed_count > 500;",
      },
      {
        description: "Claims over $1000",
        query:
          "SELECT id, amount, status FROM claims WHERE amount > 1000 LIMIT 10;",
      },
      {
        description: "Claims NOT approved",
        query:
          "SELECT id, amount, status FROM claims WHERE status != 'approved' LIMIT 5;",
      },
    ],
    tryIt:
      "Try: SELECT * FROM claims WHERE amount >= 5000 LIMIT 10; — find expensive claims.",
  },
  {
    id: "where-and-or",
    module: "filtering",
    title: "AND, OR, NOT",
    order: 3,
    explanation:
      "Combine multiple conditions: AND means both must be true. OR means either can be true. NOT inverts a condition. Use parentheses to control grouping — just like math: (A OR B) AND C is different from A OR (B AND C).",
    syntax:
      "SELECT * FROM table WHERE condition1 AND condition2;\nSELECT * FROM table WHERE condition1 OR condition2;\nSELECT * FROM table WHERE NOT condition;",
    examples: [
      {
        description: "Denied claims over $500",
        query:
          "SELECT id, amount, status FROM claims WHERE status = 'denied' AND amount > 500 LIMIT 5;",
      },
      {
        description: "Patients in CA or TX",
        query:
          "SELECT first_name, last_name, state FROM patients WHERE state = 'CA' OR state = 'TX' LIMIT 10;",
      },
      {
        description: "Hospitals with 200-500 beds",
        query:
          "SELECT name, bed_count FROM facilities WHERE type = 'Hospital' AND bed_count >= 200 AND bed_count <= 500;",
      },
    ],
    tryIt:
      "Try: SELECT * FROM claims WHERE status = 'pending' AND amount > 2000 LIMIT 10;",
  },
  {
    id: "where-in",
    module: "filtering",
    title: "IN (match a list)",
    order: 4,
    explanation:
      "IN is shorthand for multiple OR conditions on the same column. Instead of writing state = 'CA' OR state = 'TX' OR state = 'FL', write state IN ('CA', 'TX', 'FL'). Cleaner and easier to read.",
    syntax: "SELECT * FROM table WHERE column IN ('value1', 'value2', ...);",
    examples: [
      {
        description: "Patients with specific insurance types",
        query:
          "SELECT first_name, last_name, insurance_type FROM patients WHERE insurance_type IN ('Medicare', 'Medicaid') LIMIT 10;",
      },
      {
        description: "Claims that are still open (pending or under review)",
        query:
          "SELECT id, amount, status FROM claims WHERE status IN ('pending', 'under_review') LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT name, state FROM facilities WHERE state IN ('CA', 'TX', 'FL');",
  },
  {
    id: "where-between",
    module: "filtering",
    title: "BETWEEN (range)",
    order: 5,
    explanation:
      "BETWEEN is shorthand for >= AND <=. It's inclusive on both ends. Works great for number ranges, date ranges, and even alphabetical ranges.",
    syntax: "SELECT * FROM table WHERE column BETWEEN low AND high;",
    examples: [
      {
        description: "Claims between $100 and $500",
        query:
          "SELECT id, amount, status FROM claims WHERE amount BETWEEN 100 AND 500 LIMIT 10;",
      },
      {
        description: "Claims submitted in January 2025",
        query:
          "SELECT id, amount, submitted_date FROM claims WHERE submitted_date BETWEEN '2025-01-01' AND '2025-01-31' LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT name, bed_count FROM facilities WHERE bed_count BETWEEN 100 AND 300;",
  },
  {
    id: "where-like",
    module: "filtering",
    title: "LIKE (pattern matching)",
    order: 6,
    explanation:
      "LIKE matches text patterns using two wildcards: % matches any number of characters (including zero), _ matches exactly one character. 'San%' matches 'San Diego', 'San Jose', 'Santa Cruz'. '_ohn' matches 'John' but not 'Jonathan'.",
    syntax:
      "SELECT * FROM table WHERE column LIKE 'pattern';\n-- % = any characters, _ = one character",
    examples: [
      {
        description: "Facilities with 'Medical' in the name",
        query: "SELECT name, city FROM facilities WHERE name LIKE '%Medical%';",
      },
      {
        description: "Diagnoses starting with 'E' codes (Endocrine)",
        query:
          "SELECT code, description FROM diagnoses WHERE code LIKE 'E%';",
      },
    ],
    tryIt:
      "Try: SELECT * FROM facilities WHERE name LIKE '%View%'; — find facilities with 'View' in the name.",
  },
  {
    id: "where-null",
    module: "filtering",
    title: "IS NULL / IS NOT NULL",
    order: 7,
    explanation:
      "NULL means 'no value' or 'unknown.' You cannot use = to check for NULL — it won't work. You must use IS NULL or IS NOT NULL. This is a common gotcha.",
    syntax:
      "SELECT * FROM table WHERE column IS NULL;\nSELECT * FROM table WHERE column IS NOT NULL;",
    examples: [
      {
        description: "Claims with no resolution date (still open)",
        query:
          "SELECT id, amount, status, resolved_date FROM claims WHERE resolved_date IS NULL LIMIT 10;",
      },
      {
        description: "Claims that have been resolved",
        query:
          "SELECT id, amount, status, resolved_date FROM claims WHERE resolved_date IS NOT NULL LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT COUNT(*) AS open_claims FROM claims WHERE resolved_date IS NULL; — how many claims are still open?",
  },

  // ─── MODULE 3: SORTING & LIMITING ───
  {
    id: "order-by",
    module: "sorting-limiting",
    title: "ORDER BY (sorting results)",
    order: 1,
    explanation:
      "ORDER BY sorts your results. ASC = ascending (A-Z, 0-9, oldest first) — this is the default. DESC = descending (Z-A, 9-0, newest first). You can sort by multiple columns: the second column breaks ties in the first.",
    syntax:
      "SELECT * FROM table ORDER BY column ASC;\nSELECT * FROM table ORDER BY column DESC;\nSELECT * FROM table ORDER BY col1 DESC, col2 ASC;",
    examples: [
      {
        description: "Most expensive claims first",
        query:
          "SELECT id, amount, status FROM claims ORDER BY amount DESC LIMIT 10;",
      },
      {
        description: "Patients alphabetical by last name, then first name",
        query:
          "SELECT first_name, last_name, city FROM patients ORDER BY last_name, first_name LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT name, bed_count FROM facilities ORDER BY bed_count DESC LIMIT 10; — biggest facilities.",
  },
  {
    id: "limit-offset",
    module: "sorting-limiting",
    title: "LIMIT and OFFSET",
    order: 2,
    explanation:
      "LIMIT caps the number of rows returned. OFFSET skips rows before starting. Together they create pagination. LIMIT 10 OFFSET 20 means 'skip the first 20 rows, then give me the next 10.'",
    syntax:
      "SELECT * FROM table LIMIT 10;\nSELECT * FROM table LIMIT 10 OFFSET 20;",
    examples: [
      {
        description: "First 5 patients",
        query:
          "SELECT first_name, last_name FROM patients LIMIT 5;",
      },
      {
        description: "Patients 11-15 (page 3 of 5-per-page)",
        query:
          "SELECT first_name, last_name FROM patients LIMIT 5 OFFSET 10;",
      },
    ],
    tryIt:
      "Try: SELECT id, amount FROM claims ORDER BY amount DESC LIMIT 5 OFFSET 5; — the 6th through 10th most expensive claims.",
  },

  // ─── MODULE 4: AGGREGATION ───
  {
    id: "count",
    module: "aggregation",
    title: "COUNT (how many rows)",
    order: 1,
    explanation:
      "COUNT(*) counts all rows. COUNT(column) counts rows where that column is not NULL. Use it to answer 'how many?' questions. Almost always paired with AS to name the result.",
    syntax:
      "SELECT COUNT(*) AS total FROM table;\nSELECT COUNT(column) AS non_null_count FROM table;",
    examples: [
      {
        description: "How many patients total?",
        query: "SELECT COUNT(*) AS total_patients FROM patients;",
      },
      {
        description: "How many denied claims?",
        query:
          "SELECT COUNT(*) AS denied_count FROM claims WHERE status = 'denied';",
      },
      {
        description:
          "How many claims have been resolved vs not?",
        query:
          "SELECT COUNT(*) AS total, COUNT(resolved_date) AS resolved, COUNT(*) - COUNT(resolved_date) AS unresolved FROM claims;",
      },
    ],
    tryIt:
      "Try: SELECT COUNT(*) FROM facilities WHERE type = 'Hospital'; — how many hospitals?",
  },
  {
    id: "sum-avg",
    module: "aggregation",
    title: "SUM, AVG, MIN, MAX",
    order: 2,
    explanation:
      "SUM adds up all values. AVG gives the average. MIN and MAX find the smallest and largest. These only work on numbers (or dates for MIN/MAX). Use ROUND(value, decimals) to clean up AVG results.",
    syntax:
      "SELECT SUM(column) AS total FROM table;\nSELECT AVG(column) AS average FROM table;\nSELECT MIN(column) AS lowest, MAX(column) AS highest FROM table;",
    examples: [
      {
        description: "Total dollar amount of all claims",
        query: "SELECT ROUND(SUM(amount), 2) AS total_claims_value FROM claims;",
      },
      {
        description: "Average claim amount",
        query: "SELECT ROUND(AVG(amount), 2) AS avg_claim FROM claims;",
      },
      {
        description: "Cheapest and most expensive claim",
        query:
          "SELECT MIN(amount) AS smallest, MAX(amount) AS largest FROM claims;",
      },
    ],
    tryIt:
      "Try: SELECT ROUND(AVG(bed_count), 1) AS avg_beds FROM facilities WHERE type = 'Hospital';",
  },
  {
    id: "group-by",
    module: "aggregation",
    title: "GROUP BY (aggregate per group)",
    order: 3,
    explanation:
      "GROUP BY splits rows into groups, then applies aggregate functions to each group separately. Whatever columns you SELECT that aren't inside an aggregate function MUST appear in GROUP BY. Think of it as: 'for each ___, calculate ___.'",
    syntax:
      "SELECT column, COUNT(*) AS total\nFROM table\nGROUP BY column;",
    examples: [
      {
        description: "Claims per status",
        query:
          "SELECT status, COUNT(*) AS count FROM claims GROUP BY status;",
      },
      {
        description: "Average claim amount by status",
        query:
          "SELECT status, COUNT(*) AS count, ROUND(AVG(amount), 2) AS avg_amount FROM claims GROUP BY status;",
      },
      {
        description: "Patients per state",
        query:
          "SELECT state, COUNT(*) AS patient_count FROM patients GROUP BY state ORDER BY patient_count DESC;",
      },
    ],
    tryIt:
      "Try: SELECT insurance_type, COUNT(*) AS count FROM patients GROUP BY insurance_type ORDER BY count DESC;",
  },
  {
    id: "having",
    module: "aggregation",
    title: "HAVING (filter groups)",
    order: 4,
    explanation:
      "HAVING is WHERE for groups. WHERE filters individual rows before grouping. HAVING filters groups after aggregation. You can't use WHERE with aggregate functions — that's what HAVING is for.",
    syntax:
      "SELECT column, COUNT(*) AS total\nFROM table\nGROUP BY column\nHAVING COUNT(*) > 10;",
    examples: [
      {
        description: "States with more than 100 patients",
        query:
          "SELECT state, COUNT(*) AS patient_count FROM patients GROUP BY state HAVING COUNT(*) > 100 ORDER BY patient_count DESC;",
      },
      {
        description: "Specialties with average claim over $500",
        query:
          "SELECT p.specialty, ROUND(AVG(c.amount), 2) AS avg_claim FROM claims c JOIN providers p ON c.provider_id = p.id GROUP BY p.specialty HAVING AVG(c.amount) > 500 ORDER BY avg_claim DESC;",
      },
    ],
    tryIt:
      "Try: SELECT status, COUNT(*) AS n FROM claims GROUP BY status HAVING COUNT(*) > 1000;",
  },

  // ─── MODULE 5: JOINS ───
  {
    id: "inner-join",
    module: "joins",
    title: "JOIN / INNER JOIN",
    order: 1,
    explanation:
      "JOIN connects rows from two tables based on a matching column. INNER JOIN (or just JOIN) only returns rows that have a match in both tables. The ON clause specifies which columns to match. Think of it as 'look up related data from another table.'",
    syntax:
      "SELECT a.col, b.col\nFROM table_a a\nJOIN table_b b ON a.foreign_key = b.id;",
    examples: [
      {
        description: "Claims with patient names",
        query:
          "SELECT p.first_name, p.last_name, c.amount, c.status FROM claims c JOIN patients p ON c.patient_id = p.id LIMIT 10;",
      },
      {
        description: "Providers with their facility name",
        query:
          "SELECT p.first_name, p.last_name, p.specialty, f.name AS facility FROM providers p JOIN facilities f ON p.facility_id = f.id LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT c.id, c.amount, d.description FROM claims c JOIN diagnoses d ON c.diagnosis_code = d.code LIMIT 10;",
  },
  {
    id: "multiple-joins",
    module: "joins",
    title: "Multiple JOINs",
    order: 2,
    explanation:
      "You can chain multiple JOINs to connect three or more tables. Each JOIN adds another table. The order matters for readability but not for results. Use table aliases (short names like p, c, f) to keep things clean.",
    syntax:
      "SELECT a.col, b.col, c.col\nFROM table_a a\nJOIN table_b b ON a.id = b.a_id\nJOIN table_c c ON b.id = c.b_id;",
    examples: [
      {
        description:
          "Claims with patient name AND diagnosis description",
        query:
          "SELECT p.first_name, p.last_name, d.description AS diagnosis, c.amount FROM claims c JOIN patients p ON c.patient_id = p.id JOIN diagnoses d ON c.diagnosis_code = d.code LIMIT 10;",
      },
      {
        description:
          "Appointments with patient and provider names",
        query:
          "SELECT p.first_name AS patient, pr.first_name || ' ' || pr.last_name AS provider, a.scheduled_date, a.visit_type FROM appointments a JOIN patients p ON a.patient_id = p.id JOIN providers pr ON a.provider_id = pr.id LIMIT 10;",
      },
    ],
    tryIt:
      "Try joining claims to providers to facilities: SELECT c.id, c.amount, pr.last_name AS provider, f.name AS facility FROM claims c JOIN providers pr ON c.provider_id = pr.id JOIN facilities f ON pr.facility_id = f.id LIMIT 10;",
  },
  {
    id: "left-join",
    module: "joins",
    title: "LEFT JOIN",
    order: 3,
    explanation:
      "LEFT JOIN returns all rows from the left table, even if there's no match in the right table. Unmatched columns from the right table show up as NULL. Use it when you want to keep all records from one table and 'optionally' attach data from another.",
    syntax:
      "SELECT a.col, b.col\nFROM table_a a\nLEFT JOIN table_b b ON a.id = b.a_id;",
    examples: [
      {
        description:
          "All patients, with their claims (or NULL if they have none)",
        query:
          "SELECT p.first_name, p.last_name, c.id AS claim_id, c.amount FROM patients p LEFT JOIN claims c ON p.id = c.patient_id WHERE c.id IS NULL LIMIT 10;",
      },
    ],
    tryIt:
      "How many patients have never had a claim? Try: SELECT COUNT(*) FROM patients p LEFT JOIN claims c ON p.id = c.patient_id WHERE c.id IS NULL;",
  },

  // ─── MODULE 6: ADVANCED ───
  {
    id: "case-when",
    module: "advanced",
    title: "CASE WHEN (conditional logic)",
    order: 1,
    explanation:
      "CASE is SQL's if/else. It evaluates conditions in order and returns the first match. ELSE is the fallback. Use it to create categories, labels, or conditional calculations right inside your query.",
    syntax:
      "SELECT\n  CASE\n    WHEN condition1 THEN 'result1'\n    WHEN condition2 THEN 'result2'\n    ELSE 'default'\n  END AS label\nFROM table;",
    examples: [
      {
        description: "Categorize claims by size",
        query:
          "SELECT id, amount, CASE WHEN amount > 5000 THEN 'Large' WHEN amount > 1000 THEN 'Medium' ELSE 'Small' END AS size_category FROM claims LIMIT 15;",
      },
      {
        description: "Count claims by size category",
        query:
          "SELECT CASE WHEN amount > 5000 THEN 'Large' WHEN amount > 1000 THEN 'Medium' ELSE 'Small' END AS size_category, COUNT(*) AS count FROM claims GROUP BY size_category ORDER BY count DESC;",
      },
    ],
    tryIt:
      "Try: SELECT status, CASE WHEN amount > 10000 THEN 'High risk' ELSE 'Standard' END AS risk, COUNT(*) FROM claims GROUP BY status, risk;",
  },
  {
    id: "string-functions",
    module: "advanced",
    title: "String functions",
    order: 2,
    explanation:
      "Common string functions: || concatenates strings. UPPER/LOWER change case. LENGTH counts characters. SUBSTR(string, start, length) extracts a substring (1-indexed). REPLACE swaps text. TRIM removes whitespace.",
    syntax:
      "SELECT first_name || ' ' || last_name AS full_name FROM table;\nSELECT UPPER(column), LENGTH(column) FROM table;\nSELECT SUBSTR(column, 1, 3) FROM table;",
    examples: [
      {
        description: "Full names by concatenation",
        query:
          "SELECT first_name || ' ' || last_name AS full_name, city FROM patients LIMIT 5;",
      },
      {
        description: "Extract year from a date string",
        query:
          "SELECT SUBSTR(submitted_date, 1, 4) AS year, COUNT(*) AS claims FROM claims GROUP BY year;",
      },
      {
        description: "Diagnosis codes and their lengths",
        query:
          "SELECT code, LENGTH(code) AS code_length, UPPER(category) AS cat FROM diagnoses LIMIT 10;",
      },
    ],
    tryIt:
      "Try: SELECT SUBSTR(submitted_date, 1, 7) AS month, COUNT(*) FROM claims GROUP BY month ORDER BY month;",
  },
  {
    id: "subqueries",
    module: "advanced",
    title: "Subqueries",
    order: 3,
    explanation:
      "A subquery is a query inside another query. Use them in WHERE to filter by a calculated value, in FROM to create a temporary table, or in SELECT for a per-row calculation. The inner query runs first, then the outer query uses its result.",
    syntax:
      "-- In WHERE (scalar subquery)\nSELECT * FROM table WHERE column > (SELECT AVG(column) FROM table);\n\n-- In FROM (derived table)\nSELECT * FROM (SELECT col, COUNT(*) AS n FROM table GROUP BY col) sub WHERE sub.n > 5;",
    examples: [
      {
        description: "Claims above the average amount",
        query:
          "SELECT id, amount, status FROM claims WHERE amount > (SELECT AVG(amount) FROM claims) ORDER BY amount DESC LIMIT 10;",
      },
      {
        description: "Specialties with more providers than average",
        query:
          "SELECT specialty, provider_count FROM (SELECT specialty, COUNT(*) AS provider_count FROM providers GROUP BY specialty) sub WHERE provider_count > (SELECT AVG(provider_count) FROM (SELECT COUNT(*) AS provider_count FROM providers GROUP BY specialty));",
      },
    ],
    tryIt:
      "Try: SELECT * FROM facilities WHERE bed_count > (SELECT AVG(bed_count) FROM facilities WHERE type = 'Hospital');",
  },
  {
    id: "cte",
    module: "advanced",
    title: "WITH / CTE (Common Table Expressions)",
    order: 4,
    explanation:
      "A CTE is a named temporary result set defined with WITH. Think of it as creating a temporary table that only exists for this one query. CTEs make complex queries readable by breaking them into named steps. You can chain multiple CTEs with commas.",
    syntax:
      "WITH cte_name AS (\n  SELECT ...\n)\nSELECT * FROM cte_name;",
    examples: [
      {
        description: "Monthly claim totals using a CTE",
        query:
          "WITH monthly AS (\n  SELECT SUBSTR(submitted_date, 1, 7) AS month,\n         COUNT(*) AS claims,\n         ROUND(SUM(amount), 2) AS total\n  FROM claims\n  WHERE submitted_date >= '2025-01-01'\n  GROUP BY month\n)\nSELECT * FROM monthly ORDER BY month;",
      },
    ],
    tryIt:
      "Try building a CTE: WITH top_patients AS (SELECT patient_id, SUM(amount) AS total FROM claims GROUP BY patient_id ORDER BY total DESC LIMIT 5) SELECT p.first_name, p.last_name, t.total FROM top_patients t JOIN patients p ON t.patient_id = p.id;",
  },
  {
    id: "window-functions",
    module: "advanced",
    title: "Window functions (RANK, ROW_NUMBER)",
    order: 5,
    explanation:
      "Window functions calculate across related rows without collapsing them like GROUP BY does. OVER() defines the window. PARTITION BY groups the window. ORDER BY sorts within it. ROW_NUMBER gives sequential numbers. RANK skips numbers for ties. SUM() OVER creates running totals.",
    syntax:
      "SELECT column,\n  ROW_NUMBER() OVER (ORDER BY column DESC) AS row_num,\n  RANK() OVER (PARTITION BY group_col ORDER BY val DESC) AS rank\nFROM table;",
    examples: [
      {
        description: "Rank claims by amount within each status",
        query:
          "SELECT id, status, amount, RANK() OVER (PARTITION BY status ORDER BY amount DESC) AS rank_in_status FROM claims LIMIT 20;",
      },
      {
        description: "Running total of claims by date",
        query:
          "WITH daily AS (\n  SELECT submitted_date, ROUND(SUM(amount), 2) AS daily_total\n  FROM claims\n  WHERE submitted_date BETWEEN '2025-01-01' AND '2025-01-31'\n  GROUP BY submitted_date\n)\nSELECT submitted_date, daily_total,\n  SUM(daily_total) OVER (ORDER BY submitted_date) AS running_total\nFROM daily;",
      },
    ],
    tryIt:
      "Try: SELECT first_name, last_name, specialty, ROW_NUMBER() OVER (PARTITION BY specialty ORDER BY last_name) AS num FROM providers LIMIT 20;",
  },
];

export function getLessonsByModule(module: string): Lesson[] {
  return lessons
    .filter((l) => l.module === module)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
