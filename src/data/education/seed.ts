// Deterministic seed data generator for education industry
// Generates ~22,695 rows across 6 tables

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(45);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) =>
  Math.floor(rand() * (max - min + 1)) + min;
const randDate = (start: string, end: string) => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + rand() * (e - s)).toISOString().split("T")[0];
};
const esc = (s: string) => s.replace(/'/g, "''");

const firstNames = [
  "James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda",
  "David","Elizabeth","William","Barbara","Richard","Susan","Joseph","Jessica",
  "Thomas","Sarah","Charles","Karen","Daniel","Lisa","Matthew","Nancy",
  "Anthony","Betty","Mark","Margaret","Donald","Sandra","Steven","Ashley",
  "Paul","Dorothy","Andrew","Kimberly","Joshua","Emily","Kenneth","Donna",
  "Kevin","Michelle","Brian","Carol","George","Amanda","Timothy","Melissa",
  "Ronald","Deborah","Edward","Stephanie","Jason","Rebecca","Jeffrey","Sharon",
  "Ryan","Laura","Jacob","Cynthia","Gary","Kathleen","Nicholas","Amy",
  "Eric","Angela","Jonathan","Shirley","Stephen","Anna","Larry","Brenda",
  "Justin","Pamela","Scott","Emma","Brandon","Nicole","Benjamin","Helen",
  "Samuel","Samantha","Raymond","Katherine","Gregory","Christine","Frank","Debra",
  "Alexander","Rachel","Patrick","Carolyn","Jack","Janet","Dennis","Catherine",
  "Jerry","Maria","Tyler","Heather","Aaron","Diane","Jose","Ruth",
];
const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis",
  "Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson",
  "Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson",
  "White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker",
  "Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill",
  "Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell",
  "Mitchell","Carter","Roberts","Gomez","Phillips","Evans","Turner","Diaz",
  "Parker","Cruz","Edwards","Collins","Reyes","Stewart","Morris","Morales",
];

const departments = [
  "Computer Science","Mathematics","English","Biology","Chemistry",
  "Physics","History","Psychology","Business","Art",
  "Music","Philosophy","Economics","Political Science","Sociology",
];

const buildings = [
  "Science Hall","Liberal Arts Building","Engineering Center","Humanities Tower",
  "Business Pavilion","Fine Arts Complex","Social Sciences Building","Technology Center",
  "Life Sciences Lab","Performing Arts Hall","Research Annex","Academic Hall",
  "Innovation Center","Heritage Building","Student Commons",
];

const instructorTitles = [
  "Professor","Associate Professor","Assistant Professor","Lecturer","Adjunct Professor",
];

const tenureStatuses = ["tenured", "tenure-track", "non-tenure"];

const semesters = ["Fall", "Spring", "Summer"];
const gradeLetters = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
const assignmentTypes = ["exam", "quiz", "homework", "project", "participation", "final"];
const studentStatuses = ["active", "graduated", "suspended", "withdrawn", "on_leave"];
const enrollmentStatuses = ["completed", "enrolled", "withdrawn", "incomplete"];

const courseTitles: Record<string, string[]> = {
  "Computer Science": [
    "Introduction to Programming","Data Structures","Algorithms","Database Systems",
    "Operating Systems","Computer Networks","Software Engineering","Machine Learning",
  ],
  "Mathematics": [
    "Calculus I","Calculus II","Linear Algebra","Discrete Mathematics",
    "Probability and Statistics","Differential Equations","Abstract Algebra","Real Analysis",
  ],
  "English": [
    "Composition I","Composition II","American Literature","British Literature",
    "Creative Writing","Shakespeare","Modern Poetry","Technical Writing",
  ],
  "Biology": [
    "General Biology","Cell Biology","Genetics","Microbiology",
    "Anatomy and Physiology","Ecology","Evolutionary Biology","Molecular Biology",
  ],
  "Chemistry": [
    "General Chemistry","Organic Chemistry I","Organic Chemistry II","Biochemistry",
    "Analytical Chemistry","Physical Chemistry","Inorganic Chemistry","Environmental Chemistry",
  ],
  "Physics": [
    "Physics I","Physics II","Modern Physics","Thermodynamics",
    "Quantum Mechanics","Electromagnetism","Astrophysics","Computational Physics",
  ],
  "History": [
    "World History I","World History II","American History","European History",
    "Ancient Civilizations","Medieval History","Modern World History","Historical Methods",
  ],
  "Psychology": [
    "Introduction to Psychology","Developmental Psychology","Abnormal Psychology","Cognitive Psychology",
    "Social Psychology","Research Methods","Behavioral Neuroscience","Clinical Psychology",
  ],
  "Business": [
    "Principles of Management","Marketing Fundamentals","Financial Accounting","Managerial Accounting",
    "Business Ethics","Organizational Behavior","Strategic Management","Entrepreneurship",
  ],
  "Art": [
    "Drawing I","Painting I","Art History I","Art History II",
    "Sculpture","Graphic Design","Photography","Digital Media",
  ],
  "Music": [
    "Music Theory I","Music Theory II","Music History","Applied Lessons",
    "Ensemble Performance","Composition","Conducting","Ethnomusicology",
  ],
  "Philosophy": [
    "Introduction to Philosophy","Ethics","Logic","Metaphysics",
    "Epistemology","Political Philosophy","Philosophy of Mind","Existentialism",
  ],
  "Economics": [
    "Microeconomics","Macroeconomics","Econometrics","International Economics",
    "Labor Economics","Public Finance","Game Theory","Development Economics",
  ],
  "Political Science": [
    "American Government","Comparative Politics","International Relations","Political Theory",
    "Public Policy","Constitutional Law","Political Parties","Research Methods",
  ],
  "Sociology": [
    "Introduction to Sociology","Social Stratification","Race and Ethnicity","Gender Studies",
    "Urban Sociology","Criminology","Research Methods","Social Movements",
  ],
};

const deptCodes: Record<string, string> = {
  "Computer Science": "CS",
  "Mathematics": "MATH",
  "English": "ENG",
  "Biology": "BIO",
  "Chemistry": "CHEM",
  "Physics": "PHYS",
  "History": "HIST",
  "Psychology": "PSY",
  "Business": "BUS",
  "Art": "ART",
  "Music": "MUS",
  "Philosophy": "PHIL",
  "Economics": "ECON",
  "Political Science": "POLS",
  "Sociology": "SOC",
};

export function generateEducationSeed(): string {
  const lines: string[] = [];

  // Departments (15)
  for (let i = 0; i < 15; i++) {
    const dept = departments[i];
    const building = buildings[i];
    const budget = Math.round((500000 + rand() * 4500000) * 100) / 100;
    // head_instructor_id will be assigned after instructors are created; use a deterministic id
    const headId = i * 5 + 1;
    lines.push(
      `INSERT INTO departments VALUES(${i + 1},'${esc(dept)}','${esc(building)}',${budget},${headId});`
    );
  }

  // Instructors (80)
  for (let i = 0; i < 80; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const dept = departments[i % 15];
    const title = pick(instructorTitles);
    const hire = randDate("1990-01-01", "2024-06-01");
    const tenure = pick(tenureStatuses);
    lines.push(
      `INSERT INTO instructors VALUES(${i + 1},'${fn}','${esc(ln)}','${esc(dept)}','${esc(title)}','${hire}','${tenure}');`
    );
  }

  // Students (1500)
  for (let i = 0; i < 1500; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@university.edu`;
    const major = pick(departments);
    const gpa = Math.round((1.5 + rand() * 2.5) * 100) / 100;
    const enrollYear = randInt(2018, 2025);
    const status = pick(studentStatuses);
    const gradYear = status === "graduated" ? enrollYear + 4 : "NULL";
    const scholarship = rand() < 0.3 ? Math.round(rand() * 40000 * 100) / 100 : 0;
    lines.push(
      `INSERT INTO students VALUES(${i + 1},'${fn}','${esc(ln)}','${esc(email)}','${esc(major)}',${gpa},${enrollYear},${gradYear},'${status}',${scholarship});`
    );
  }

  // Courses (100)
  let courseId = 0;
  const allCourses: { id: number; dept: string }[] = [];
  for (const dept of departments) {
    const titles = courseTitles[dept];
    const code = deptCodes[dept];
    // Pick up to ~7 courses per department to hit ~100 total
    const count = dept === "Computer Science" || dept === "Mathematics" || dept === "Biology"
      ? 8 : dept === "English" || dept === "Chemistry" || dept === "Physics" || dept === "Psychology"
      ? 7 : 6;
    for (let j = 0; j < count && j < titles.length; j++) {
      courseId++;
      const level = pick([100, 200, 300, 400]);
      const courseCode = `${code}${level + j}`;
      const credits = pick([1, 2, 3, 3, 3, 4, 4]);
      const maxEnroll = pick([25, 30, 35, 40, 50, 60, 80, 120, 200]);
      allCourses.push({ id: courseId, dept });
      lines.push(
        `INSERT INTO courses VALUES(${courseId},'${courseCode}','${esc(titles[j])}','${esc(dept)}',${credits},${level},${maxEnroll});`
      );
    }
  }

  // Enrollments (6000)
  const enrollmentRecords: { id: number; semester: string; year: number }[] = [];
  for (let i = 0; i < 6000; i++) {
    const studId = randInt(1, 1500);
    const course = pick(allCourses);
    const semester = pick(semesters);
    const year = randInt(2019, 2025);
    const status = pick(enrollmentStatuses);
    const grade = status === "completed" ? `'${pick(gradeLetters)}'` : "NULL";
    enrollmentRecords.push({ id: i + 1, semester, year });
    lines.push(
      `INSERT INTO enrollments VALUES(${i + 1},${studId},${course.id},'${semester}',${year},${grade},'${status}');`
    );
  }

  // Grades (15000)
  for (let i = 0; i < 15000; i++) {
    const enrollId = randInt(1, 6000);
    const assignment = pick(assignmentTypes);
    const maxScore = pick([10, 20, 25, 50, 100, 100, 100, 150, 200]);
    const score = Math.round(rand() * maxScore * 100) / 100;
    const enroll = enrollmentRecords[enrollId - 1];
    // Generate a graded_date within the semester
    let startMonth: string;
    let endMonth: string;
    if (enroll.semester === "Fall") {
      startMonth = `${enroll.year}-08-25`;
      endMonth = `${enroll.year}-12-15`;
    } else if (enroll.semester === "Spring") {
      startMonth = `${enroll.year}-01-15`;
      endMonth = `${enroll.year}-05-15`;
    } else {
      startMonth = `${enroll.year}-06-01`;
      endMonth = `${enroll.year}-08-10`;
    }
    const gradedDate = randDate(startMonth, endMonth);
    lines.push(
      `INSERT INTO grades VALUES(${i + 1},${enrollId},'${assignment}',${score},${maxScore},'${gradedDate}');`
    );
  }

  return lines.join("\n");
}
