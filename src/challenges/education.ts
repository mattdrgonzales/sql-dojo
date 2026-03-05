import { Challenge } from "./types";

export const educationChallenges: Challenge[] = [
  // TIER 1 — Foundations
  {
    id: "edu-1-01",
    tier: 1,
    title: "Scholarship Recipients",
    businessQuestion:
      "Financial aid needs a list of all students receiving scholarships (amount greater than 0), sorted by scholarship amount descending. Show their full name, major, and scholarship amount.",
    hint: "Filter by scholarship_amount > 0, order descending",
    syntaxHint: "SELECT ... FROM students WHERE scholarship_amount > ... ORDER BY ... DESC",
    expectedQuery:
      "SELECT first_name, last_name, major, scholarship_amount FROM students WHERE scholarship_amount > 0 ORDER BY scholarship_amount DESC;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },
  {
    id: "edu-1-02",
    tier: 1,
    title: "Honor Roll",
    businessQuestion:
      "The dean's office wants all active students with a GPA of 3.5 or higher, sorted by GPA descending. Show their full name, major, and GPA.",
    hint: "Two conditions: status AND gpa",
    syntaxHint: "SELECT ... FROM students WHERE status = '...' AND gpa >= ... ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, major, gpa FROM students WHERE status = 'active' AND gpa >= 3.5 ORDER BY gpa DESC;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "edu-1-03",
    tier: 1,
    title: "Advanced Course Catalog",
    businessQuestion:
      "The registrar needs all 400-level courses with 4 credits. Show the course code, title, department, and max enrollment.",
    hint: "Filter on level and credits",
    syntaxHint: "SELECT ... FROM courses WHERE level = ... AND credits = ...",
    expectedQuery:
      "SELECT code, title, department, max_enrollment FROM courses WHERE level = 400 AND credits = 4;",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "edu-1-04",
    tier: 1,
    title: "Tenured Faculty",
    businessQuestion:
      "HR needs a directory of all tenured professors (title is 'Professor' and tenure_status is 'tenured'), sorted alphabetically by last name. Show their full name, department, and hire date.",
    hint: "Filter on title and tenure_status",
    syntaxHint: "SELECT ... FROM instructors WHERE title = '...' AND tenure_status = '...' ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, department, hire_date FROM instructors WHERE title = 'Professor' AND tenure_status = 'tenured' ORDER BY last_name;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "edu-1-05",
    tier: 1,
    title: "High-Budget Departments",
    businessQuestion:
      "The provost wants to see the top 5 departments by budget. Show the department name, building, and budget.",
    hint: "Order by budget descending and limit",
    syntaxHint: "SELECT ... FROM departments ORDER BY ... DESC LIMIT ...",
    expectedQuery:
      "SELECT name, building, budget FROM departments ORDER BY budget DESC LIMIT 5;",
    concepts: ["SELECT", "ORDER BY", "LIMIT"],
  },
  // TIER 2 — Joins
  {
    id: "edu-2-01",
    tier: 2,
    title: "Student Enrollment Details",
    businessQuestion:
      "The registrar's office needs a report of all currently enrolled students showing the student's full name, course title, and semester. Only include enrollments with status 'enrolled'.",
    hint: "Join enrollments to students and courses",
    syntaxHint:
      "SELECT ... FROM enrollments e JOIN students s ON ... JOIN courses c ON ... WHERE e.status = '...'",
    expectedQuery:
      "SELECT s.first_name, s.last_name, c.title, e.semester, e.year FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.id WHERE e.status = 'enrolled';",
    concepts: ["JOIN", "multiple joins", "aliases", "WHERE"],
  },
  {
    id: "edu-2-02",
    tier: 2,
    title: "Department Head Directory",
    businessQuestion:
      "Administration needs a list of all departments with their department head's full name. Show department name, building, and the head instructor's name.",
    hint: "Join departments to instructors on head_instructor_id",
    syntaxHint:
      "SELECT ... FROM departments d JOIN instructors i ON d.head_instructor_id = i.id",
    expectedQuery:
      "SELECT d.name AS department, d.building, i.first_name, i.last_name FROM departments d JOIN instructors i ON d.head_instructor_id = i.id;",
    concepts: ["JOIN", "aliases", "AS"],
  },
  {
    id: "edu-2-03",
    tier: 2,
    title: "Computer Science Grades",
    businessQuestion:
      "The CS department chair wants all completed enrollments for Computer Science courses with the student name, course title, and grade. Sort by course title then student last name.",
    hint: "Join enrollments to students and courses, filter by department and enrollment status",
    syntaxHint:
      "SELECT ... FROM enrollments e JOIN students s ON ... JOIN courses c ON ... WHERE c.department = '...' AND e.status = '...' ORDER BY ...",
    expectedQuery:
      "SELECT s.first_name, s.last_name, c.title, e.grade FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.id WHERE c.department = 'Computer Science' AND e.status = 'completed' ORDER BY c.title, s.last_name;",
    concepts: ["JOIN", "multiple joins", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "edu-2-04",
    tier: 2,
    title: "Instructor Course Load",
    businessQuestion:
      "The provost wants to see all courses offered by the Mathematics department along with their department's building and budget. Show course code, course title, building, and budget.",
    hint: "Join courses to departments on department name",
    syntaxHint:
      "SELECT ... FROM courses c JOIN departments d ON c.department = d.name WHERE ...",
    expectedQuery:
      "SELECT c.code, c.title, d.building, d.budget FROM courses c JOIN departments d ON c.department = d.name WHERE c.department = 'Mathematics';",
    concepts: ["JOIN", "aliases", "WHERE"],
  },
  // TIER 3 — Aggregation
  {
    id: "edu-3-01",
    tier: 3,
    title: "Enrollment by Department",
    businessQuestion:
      "The dean wants to know which departments have the most completed enrollments. Show each department, the number of completed enrollments, and average credits per course. Only include departments with more than 200 completed enrollments.",
    hint: "Join enrollments to courses, GROUP BY department, use HAVING for the count filter",
    syntaxHint:
      "SELECT ... COUNT(*) ... AVG(...) FROM enrollments e JOIN courses c ON ... WHERE e.status = '...' GROUP BY ... HAVING COUNT(*) > ... ORDER BY ...",
    expectedQuery:
      "SELECT c.department, COUNT(*) AS enrollment_count, ROUND(AVG(c.credits), 2) AS avg_credits FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.status = 'completed' GROUP BY c.department HAVING COUNT(*) > 200 ORDER BY enrollment_count DESC;",
    concepts: ["GROUP BY", "HAVING", "COUNT", "AVG", "ROUND", "JOIN"],
  },
  {
    id: "edu-3-02",
    tier: 3,
    title: "Grade Distribution",
    businessQuestion:
      "Academic affairs wants the overall grade distribution for completed enrollments. Show each letter grade, the count of students who received it, and the percentage of total completed enrollments.",
    hint: "Filter for completed enrollments with non-null grades, GROUP BY grade",
    syntaxHint:
      "SELECT grade, COUNT(*) ... ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM ...) ...) FROM enrollments WHERE ... GROUP BY grade ORDER BY ...",
    expectedQuery:
      "SELECT grade, COUNT(*) AS student_count, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM enrollments WHERE status = 'completed' AND grade IS NOT NULL), 1) AS percentage FROM enrollments WHERE status = 'completed' AND grade IS NOT NULL GROUP BY grade ORDER BY student_count DESC;",
    concepts: ["GROUP BY", "COUNT", "ROUND", "subquery", "WHERE"],
  },
  {
    id: "edu-3-03",
    tier: 3,
    title: "Average GPA by Major",
    businessQuestion:
      "The academic advising office wants the average GPA for active students in each major, sorted from highest to lowest. Only show majors with at least 30 active students.",
    hint: "Filter for active students, GROUP BY major, use HAVING",
    syntaxHint:
      "SELECT major, ROUND(AVG(gpa), 2) ... COUNT(*) FROM students WHERE status = '...' GROUP BY ... HAVING ... ORDER BY ...",
    expectedQuery:
      "SELECT major, ROUND(AVG(gpa), 2) AS avg_gpa, COUNT(*) AS student_count FROM students WHERE status = 'active' GROUP BY major HAVING COUNT(*) >= 30 ORDER BY avg_gpa DESC;",
    concepts: ["GROUP BY", "HAVING", "AVG", "ROUND", "COUNT"],
  },
  {
    id: "edu-3-04",
    tier: 3,
    title: "Semester Enrollment Trends",
    businessQuestion:
      "The registrar needs enrollment counts by semester and year for 2023-2025. Show the year, semester, and total enrollments, sorted chronologically.",
    hint: "GROUP BY year and semester, filter by year range, use CASE for semester ordering",
    syntaxHint:
      "SELECT year, semester, COUNT(*) FROM enrollments WHERE year >= ... AND year <= ... GROUP BY year, semester ORDER BY year, CASE semester WHEN 'Spring' THEN 1 ...",
    expectedQuery:
      "SELECT year, semester, COUNT(*) AS total_enrollments FROM enrollments WHERE year >= 2023 AND year <= 2025 GROUP BY year, semester ORDER BY year, CASE semester WHEN 'Spring' THEN 1 WHEN 'Summer' THEN 2 WHEN 'Fall' THEN 3 END;",
    concepts: ["GROUP BY", "COUNT", "WHERE", "CASE", "ORDER BY"],
  },
  // TIER 4 — Subqueries & Logic
  {
    id: "edu-4-01",
    tier: 4,
    title: "Students Above Major Average",
    businessQuestion:
      "Academic advising wants to identify active students whose GPA exceeds the average GPA of their major. Show the student's full name, major, GPA, and the major's average GPA.",
    hint: "Use a correlated subquery or join to a subquery that computes avg GPA per major",
    syntaxHint:
      "SELECT ... FROM students s JOIN (SELECT major, AVG(gpa) ... GROUP BY major) ma ON ... WHERE s.gpa > ma.avg_gpa AND ...",
    expectedQuery:
      "SELECT s.first_name, s.last_name, s.major, s.gpa, ROUND(ma.avg_gpa, 2) AS major_avg_gpa FROM students s JOIN (SELECT major, AVG(gpa) AS avg_gpa FROM students WHERE status = 'active' GROUP BY major) ma ON s.major = ma.major WHERE s.status = 'active' AND s.gpa > ma.avg_gpa ORDER BY s.major, s.gpa DESC;",
    concepts: ["subquery", "JOIN", "AVG", "GROUP BY", "WHERE"],
  },
  {
    id: "edu-4-02",
    tier: 4,
    title: "Course Performance Report",
    businessQuestion:
      "The provost wants a report for each course showing its title, department, total completed enrollments, and a performance label: 'High Demand' if over 100 completions, 'Moderate' if 50-100, and 'Low Demand' if under 50.",
    hint: "Use CASE to create the label based on COUNT of completed enrollments",
    syntaxHint:
      "SELECT c.title, c.department, COUNT(*) ... CASE WHEN COUNT(*) > 100 THEN '...' ... END ... FROM courses c JOIN enrollments e ON ... WHERE ... GROUP BY ...",
    expectedQuery:
      "SELECT c.title, c.department, COUNT(*) AS completions, CASE WHEN COUNT(*) > 100 THEN 'High Demand' WHEN COUNT(*) >= 50 THEN 'Moderate' ELSE 'Low Demand' END AS demand_label FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.status = 'completed' GROUP BY c.id, c.title, c.department ORDER BY completions DESC;",
    concepts: ["CASE", "GROUP BY", "JOIN", "COUNT"],
  },
  // TIER 5 — Window Functions & CTEs
  {
    id: "edu-5-01",
    tier: 5,
    title: "Department GPA Rankings",
    businessQuestion:
      "Rank all active students within their major by GPA. Show the student's full name, major, GPA, and their rank within the major. The highest GPA should be rank 1.",
    hint: "Use RANK() with PARTITION BY major ORDER BY gpa DESC",
    syntaxHint:
      "SELECT ... RANK() OVER (PARTITION BY major ORDER BY gpa DESC) AS major_rank FROM students WHERE ...",
    expectedQuery:
      "SELECT first_name, last_name, major, gpa, RANK() OVER (PARTITION BY major ORDER BY gpa DESC) AS major_rank FROM students WHERE status = 'active';",
    concepts: ["RANK", "OVER", "PARTITION BY", "WHERE"],
  },
  {
    id: "edu-5-02",
    tier: 5,
    title: "Yearly Enrollment Growth",
    businessQuestion:
      "The provost wants to see enrollment trends by year with year-over-year growth. Show each year, total enrollments, and the change from the previous year.",
    hint: "Use a CTE for yearly totals, then LAG() to get the previous year's count",
    syntaxHint:
      "WITH yearly AS (SELECT year, COUNT(*) ... GROUP BY year) SELECT year, total, total - LAG(total) OVER (ORDER BY year) AS year_over_year_change FROM yearly",
    expectedQuery:
      "WITH yearly AS (SELECT year, COUNT(*) AS total FROM enrollments GROUP BY year) SELECT year, total, total - LAG(total) OVER (ORDER BY year) AS year_over_year_change FROM yearly ORDER BY year;",
    concepts: ["CTE", "WITH", "LAG", "window function", "GROUP BY"],
  },
];
