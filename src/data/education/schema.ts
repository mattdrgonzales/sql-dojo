export const educationSchema = `
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  building TEXT NOT NULL,
  budget REAL NOT NULL,
  head_instructor_id INTEGER
);

CREATE TABLE instructors (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  department TEXT NOT NULL,
  title TEXT NOT NULL,
  hire_date TEXT NOT NULL,
  tenure_status TEXT NOT NULL
);

CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  major TEXT NOT NULL,
  gpa REAL,
  enrollment_year INTEGER NOT NULL,
  graduation_year INTEGER,
  status TEXT NOT NULL,
  scholarship_amount REAL DEFAULT 0
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  credits INTEGER NOT NULL,
  level INTEGER NOT NULL,
  max_enrollment INTEGER NOT NULL
);

CREATE TABLE enrollments (
  id INTEGER PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  semester TEXT NOT NULL,
  year INTEGER NOT NULL,
  grade TEXT,
  status TEXT NOT NULL
);

CREATE TABLE grades (
  id INTEGER PRIMARY KEY,
  enrollment_id INTEGER REFERENCES enrollments(id),
  assignment_type TEXT NOT NULL,
  score REAL NOT NULL,
  max_score REAL NOT NULL,
  graded_date TEXT NOT NULL
);
`;

export const educationTableInfo = [
  {
    name: "departments",
    description: "Academic departments",
    columns: ["id", "name", "building", "budget", "head_instructor_id"],
  },
  {
    name: "instructors",
    description: "Faculty members",
    columns: ["id", "first_name", "last_name", "department", "title", "hire_date", "tenure_status"],
  },
  {
    name: "students",
    description: "Enrolled students",
    columns: ["id", "first_name", "last_name", "email", "major", "gpa", "enrollment_year", "graduation_year", "status", "scholarship_amount"],
  },
  {
    name: "courses",
    description: "Course catalog",
    columns: ["id", "code", "title", "department", "credits", "level", "max_enrollment"],
  },
  {
    name: "enrollments",
    description: "Student course enrollments",
    columns: ["id", "student_id", "course_id", "semester", "year", "grade", "status"],
  },
  {
    name: "grades",
    description: "Individual assignment grades",
    columns: ["id", "enrollment_id", "assignment_type", "score", "max_score", "graded_date"],
  },
];
