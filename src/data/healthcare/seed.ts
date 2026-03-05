// Deterministic seed data generator for healthcare industry
// Generates ~3000+ rows across 7 tables

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const pickN = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
};
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
const specialties = [
  "Family Medicine","Internal Medicine","Cardiology","Orthopedics",
  "Dermatology","Neurology","Oncology","Pediatrics","Psychiatry",
  "Emergency Medicine","Radiology","Anesthesiology","Surgery",
  "Obstetrics","Urology","Pulmonology","Endocrinology","Gastroenterology",
];
const facilityTypes = ["Hospital", "Clinic", "Urgent Care", "Specialty Center"];
const cities = [
  ["San Diego","CA"],["Los Angeles","CA"],["Phoenix","AZ"],["Denver","CO"],
  ["Austin","TX"],["Portland","OR"],["Seattle","WA"],["Chicago","IL"],
  ["Miami","FL"],["Atlanta","GA"],["Boston","MA"],["Nashville","TN"],
  ["Minneapolis","MN"],["Detroit","MI"],["Philadelphia","PA"],
];
const insuranceTypes = ["Medicare","Medicaid","Private","PPO","HMO","Self-Pay"];
const claimStatuses = ["approved","denied","pending","under_review"];
const appointmentStatuses = ["completed","cancelled","no_show","scheduled"];
const visitTypes = ["office_visit","follow_up","urgent","telehealth","annual_physical","procedure"];

const diagnosisData = [
  ["E11.9","Type 2 diabetes mellitus without complications","Endocrine",1],
  ["I10","Essential hypertension","Cardiovascular",1],
  ["J06.9","Acute upper respiratory infection","Respiratory",0],
  ["M54.5","Low back pain","Musculoskeletal",0],
  ["F32.9","Major depressive disorder, single episode","Mental Health",0],
  ["J45.909","Unspecified asthma, uncomplicated","Respiratory",1],
  ["E78.5","Hyperlipidemia, unspecified","Endocrine",1],
  ["K21.0","Gastro-esophageal reflux disease with esophagitis","Digestive",1],
  ["M79.3","Panniculitis, unspecified","Musculoskeletal",0],
  ["G43.909","Migraine, unspecified","Neurological",1],
  ["N39.0","Urinary tract infection","Genitourinary",0],
  ["J02.9","Acute pharyngitis, unspecified","Respiratory",0],
  ["R10.9","Unspecified abdominal pain","Digestive",0],
  ["L30.9","Dermatitis, unspecified","Dermatological",0],
  ["R51","Headache","Neurological",0],
  ["E03.9","Hypothyroidism, unspecified","Endocrine",1],
  ["I25.10","Atherosclerotic heart disease","Cardiovascular",1],
  ["F41.1","Generalized anxiety disorder","Mental Health",1],
  ["J18.9","Pneumonia, unspecified organism","Respiratory",0],
  ["M17.11","Primary osteoarthritis, right knee","Musculoskeletal",1],
  ["K58.9","Irritable bowel syndrome without diarrhea","Digestive",1],
  ["B34.9","Viral infection, unspecified","Infectious",0],
  ["R05","Cough","Respiratory",0],
  ["E66.01","Morbid obesity due to excess calories","Endocrine",1],
  ["G47.00","Insomnia, unspecified","Neurological",1],
  ["S83.511A","Sprain of anterior cruciate ligament, right knee","Musculoskeletal",0],
  ["C50.919","Malignant neoplasm of breast, unspecified","Oncology",1],
  ["I48.91","Unspecified atrial fibrillation","Cardiovascular",1],
  ["D64.9","Anemia, unspecified","Hematological",0],
  ["R11.2","Nausea with vomiting","Digestive",0],
];

const procedureData = [
  ["99213","Office visit, established patient (level 3)","E&M",150],
  ["99214","Office visit, established patient (level 4)","E&M",250],
  ["99203","Office visit, new patient (level 3)","E&M",200],
  ["99204","Office visit, new patient (level 4)","E&M",350],
  ["36415","Collection of venous blood","Laboratory",25],
  ["85025","Complete blood count (CBC)","Laboratory",35],
  ["80053","Comprehensive metabolic panel","Laboratory",45],
  ["71046","Chest X-ray, 2 views","Radiology",120],
  ["93000","Electrocardiogram, 12-lead","Cardiology",75],
  ["29881","Knee arthroscopy with meniscectomy","Surgery",4500],
  ["27447","Total knee replacement","Surgery",28000],
  ["43239","Upper GI endoscopy with biopsy","Surgery",2200],
  ["99385","Preventive visit, 18-39 years","Preventive",250],
  ["99386","Preventive visit, 40-64 years","Preventive",280],
  ["90834","Psychotherapy, 45 minutes","Mental Health",175],
  ["90837","Psychotherapy, 60 minutes","Mental Health",220],
  ["99441","Telephone E&M, 5-10 minutes","Telehealth",50],
  ["99442","Telephone E&M, 11-20 minutes","Telehealth",90],
  ["20610","Joint injection, major joint","Procedure",350],
  ["11102","Tangential biopsy of skin","Procedure",200],
];

export function generateHealthcareSeed(): string {
  const lines: string[] = [];

  // Facilities (50)
  const facilityNames = [
    "Mercy General","St. Luke's","Pacific Medical","Sunrise Health","Valley Care",
    "Mountain View","Cedar Ridge","Bayshore Medical","Lakewood","Heritage Health",
    "Pinnacle","Summit Care","Crossroads Medical","Horizon","Riverside",
    "Clearwater","Northstar","Beacon Health","Harmony","Crestview",
    "Redwood","Silver Lake","Eastside Medical","Westfield","Maple Grove",
    "Oceanview","Prairie Health","Canyon Medical","Hillcrest","Fairview",
    "Greenfield","Brookside","Stonebridge","Meadowbrook","Lakeshore",
    "Parkway Medical","Oakdale","Elmwood","Ridgecrest","Sunnyvale",
    "Blue Ridge","Golden Gate Medical","Harbor View","Aspen","Pineview",
    "Ironwood","Sandstone","Coral Springs","Willow Creek","Sage Medical",
  ];
  for (let i = 0; i < 50; i++) {
    const [city, state] = pick(cities);
    const type = pick(facilityTypes);
    const beds = type === "Hospital" ? randInt(100, 800) : type === "Clinic" ? randInt(0, 20) : randInt(10, 60);
    lines.push(
      `INSERT INTO facilities VALUES(${i + 1},'${esc(facilityNames[i])} ${type}','${type}','${city}','${state}',${beds},${randInt(1960, 2020)});`
    );
  }

  // Providers (200)
  for (let i = 0; i < 200; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const spec = pick(specialties);
    const facId = randInt(1, 50);
    const npi = `${1000000000 + i}`;
    const hire = randDate("2005-01-01", "2024-06-01");
    lines.push(
      `INSERT INTO providers VALUES(${i + 1},'${fn}','${esc(ln)}','${spec}',${facId},'${npi}','${hire}');`
    );
  }

  // Patients (2000)
  for (let i = 0; i < 2000; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const dob = randDate("1940-01-01", "2006-12-31");
    const gender = pick(["M", "F"]);
    const [city, state] = pick(cities);
    const ins = pick(insuranceTypes);
    const enrolled = randDate("2018-01-01", "2025-01-01");
    lines.push(
      `INSERT INTO patients VALUES(${i + 1},'${fn}','${esc(ln)}','${dob}','${gender}','${city}','${state}','${ins}','${enrolled}');`
    );
  }

  // Diagnoses (30)
  for (const d of diagnosisData) {
    lines.push(
      `INSERT INTO diagnoses VALUES('${d[0]}','${esc(d[1] as string)}','${d[2]}',${d[3]});`
    );
  }

  // Procedures (20)
  for (const p of procedureData) {
    lines.push(
      `INSERT INTO procedures VALUES('${p[0]}','${esc(p[1] as string)}','${p[2]}',${p[3]});`
    );
  }

  // Claims (5000)
  const diagCodes = diagnosisData.map((d) => d[0] as string);
  const procCodes = procedureData.map((p) => p[0] as string);
  for (let i = 0; i < 5000; i++) {
    const patId = randInt(1, 2000);
    const provId = randInt(1, 200);
    const diag = pick(diagCodes);
    const proc = pick(procCodes);
    const procRow = procedureData.find((p) => p[0] === proc)!;
    const baseCost = procRow[3] as number;
    const amount = Math.round(baseCost * (0.7 + rand() * 0.8) * 100) / 100;
    const status = pick(claimStatuses);
    const submitted = randDate("2023-01-01", "2025-12-31");
    const resolved =
      status === "pending" || status === "under_review"
        ? "NULL"
        : `'${randDate(submitted, "2026-02-28")}'`;
    lines.push(
      `INSERT INTO claims VALUES(${i + 1},${patId},${provId},'${diag}','${proc}',${amount},'${status}','${submitted}',${resolved});`
    );
  }

  // Appointments (3000)
  for (let i = 0; i < 3000; i++) {
    const patId = randInt(1, 2000);
    const provId = randInt(1, 200);
    const scheduled = randDate("2023-01-01", "2026-03-31");
    const status = pick(appointmentStatuses);
    const visit = pick(visitTypes);
    const duration = pick([15, 20, 30, 45, 60]);
    lines.push(
      `INSERT INTO appointments VALUES(${i + 1},${patId},${provId},'${scheduled}','${status}','${visit}',${duration});`
    );
  }

  return lines.join("\n");
}
