// Deterministic seed data generator for Tia healthcare platform
// Models Tia's revenue channels: memberships, insurance, services, clinical partnerships

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(77);
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
  "Sophia","Olivia","Emma","Ava","Isabella","Mia","Luna","Charlotte",
  "Amelia","Harper","Evelyn","Aria","Chloe","Ella","Camila","Penelope",
  "Layla","Riley","Zoey","Nora","Lily","Eleanor","Hannah","Lillian",
  "Addison","Aubrey","Ellie","Stella","Natalie","Zoe","Leah","Hazel",
  "Violet","Aurora","Savannah","Audrey","Brooklyn","Bella","Claire","Skylar",
  "Lucy","Paisley","Anna","Caroline","Genesis","Aaliyah","Kennedy","Kinsley",
  "Allison","Maya","Sarah","Madelyn","Adeline","Alexa","Ariana","Elena",
  "Gabriella","Naomi","Alice","Sadie","Hailey","Eva","Emilia","Autumn",
  "Quinn","Nevaeh","Jade","Willow","Piper","Nova","Taylor","Ruby",
  "Serenity","Maria","Valentina","Gianna","Lila","Iris","Ayla","Vivian",
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
  "OB-GYN","Primary Care","Mental Health","Nutrition",
  "Dermatology","Acupuncture","Physical Therapy","Health Coach",
];
const genders = ["Female", "Male", "Non-binary"];
const insuranceTypes = ["Commercial", "Medicaid", "Medicare", "Self-pay"];
const regions = ["NYC", "LA", "SF", "Phoenix"];
const appointmentTypes = ["In-person", "Virtual"];
const appointmentStatuses = ["Completed", "Cancelled", "No-show"];
const claimStatuses = ["Paid", "Denied", "Pending"];
const membershipStatuses = ["Active", "Cancelled", "Paused", "Expired"];
const paymentStatuses = ["Paid", "Failed", "Refunded"];
const billingCycles = ["monthly", "annual"];
const partnerTypes = ["Employer", "Health System", "University"];

const icdData: [string, string][] = [
  ["Z01.419", "Annual gynecological exam"],
  ["Z00.00", "General adult medical exam"],
  ["F32.9", "Major depressive disorder"],
  ["F41.1", "Generalized anxiety disorder"],
  ["N92.0", "Excessive menstrual bleeding"],
  ["E03.9", "Hypothyroidism"],
  ["N94.6", "Dysmenorrhea"],
  ["E11.9", "Type 2 diabetes"],
  ["E66.01", "Morbid obesity"],
  ["L70.0", "Acne vulgaris"],
  ["E28.2", "Polycystic ovarian syndrome"],
  ["N95.1", "Menopausal symptoms"],
  ["G43.909", "Migraine"],
  ["M54.5", "Low back pain"],
  ["K58.9", "Irritable bowel syndrome"],
  ["R10.9", "Abdominal pain"],
  ["Z30.011", "Contraceptive counseling"],
  ["O09.90", "Pregnancy supervision"],
  ["E55.9", "Vitamin D deficiency"],
  ["D50.9", "Iron deficiency anemia"],
];

const serviceData: [string, string, number, number][] = [
  ["Comprehensive Lab Panel", "Lab", 250, 1],
  ["Hormone Panel", "Lab", 350, 1],
  ["STI Screening", "Lab", 180, 1],
  ["Thyroid Panel", "Lab", 120, 1],
  ["Vitamin D Test", "Lab", 65, 1],
  ["Nutrition Consultation", "Wellness", 150, 0],
  ["Health Coaching Session", "Wellness", 100, 0],
  ["Fertility Assessment", "Specialty", 450, 1],
  ["Pelvic Floor Therapy", "Specialty", 200, 1],
  ["Acupuncture Session", "Specialty", 120, 0],
  ["Mental Health Intake", "Mental Health", 275, 1],
  ["Therapy Session (45 min)", "Mental Health", 175, 1],
  ["Annual Wellness Visit", "Preventive", 0, 1],
  ["Skin Check", "Preventive", 150, 1],
  ["Body Composition Scan", "Wellness", 75, 0],
];

const partnerNames = [
  "Google", "Stripe", "Airbnb", "Spotify", "Squarespace",
  "Glossier", "Warby Parker", "Peloton", "Sweetgreen", "Hims & Hers",
  "NYU Langone", "UCLA Health", "UCSF Medical", "Mount Sinai", "Cedars-Sinai",
  "Columbia University", "Stanford University", "NYU", "ASU", "USC",
];

const payerNames = [
  "Aetna", "UnitedHealthcare", "Blue Cross Blue Shield", "Cigna",
  "Oscar Health", "Anthem", "Humana", "Kaiser Permanente",
];

const referralReasons = [
  "Mental health evaluation", "Nutrition counseling", "Fertility consultation",
  "Hormone management", "Dermatology follow-up", "Physical therapy",
  "Pelvic floor assessment", "Acupuncture for chronic pain",
  "Postpartum care", "Anxiety management",
];

const locationData: [string, string, string, string][] = [
  ["Tia Flatiron", "New York", "NY", "2019-03-15"],
  ["Tia Williamsburg", "New York", "NY", "2020-06-01"],
  ["Tia Upper East Side", "New York", "NY", "2021-09-12"],
  ["Tia FiDi", "New York", "NY", "2022-04-20"],
  ["Tia West Hollywood", "Los Angeles", "CA", "2021-01-10"],
  ["Tia Santa Monica", "Los Angeles", "CA", "2022-03-08"],
  ["Tia Silver Lake", "Los Angeles", "CA", "2023-02-14"],
  ["Tia Mission", "San Francisco", "CA", "2022-07-22"],
  ["Tia SOMA", "San Francisco", "CA", "2023-05-01"],
  ["Tia Scottsdale", "Phoenix", "AZ", "2023-08-15"],
  ["Tia Tempe", "Phoenix", "AZ", "2024-01-10"],
  ["Tia Virtual Care", "New York", "NY", "2020-04-01"],
];

export function generateTiaSeed(): string {
  const lines: string[] = [];

  // Locations (12)
  for (let i = 0; i < locationData.length; i++) {
    const [name, city, state, opened] = locationData[i];
    lines.push(
      `INSERT INTO locations VALUES(${i + 1},'${name}','${city}','${state}','${opened}');`
    );
  }

  // Membership Plans (3)
  lines.push(`INSERT INTO membership_plans VALUES(1,'Essential',15.00,150.00,0,6);`);
  lines.push(`INSERT INTO membership_plans VALUES(2,'Complete',25.00,250.00,1,12);`);
  lines.push(`INSERT INTO membership_plans VALUES(3,'Premium',45.00,450.00,1,NULL);`);

  // Providers (80)
  for (let i = 0; i < 80; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const name = `${fn} ${ln}`;
    const spec = pick(specialties);
    const locId = randInt(1, 12);
    const hire = randDate("2019-01-01", "2024-10-01");
    lines.push(
      `INSERT INTO providers VALUES(${i + 1},'${esc(name)}','${spec}',${locId},'${hire}');`
    );
  }

  // Patients (1500)
  const patientRegions: string[] = [];
  for (let i = 0; i < 1500; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const dob = randDate("1965-01-01", "2004-12-31");
    const gender = pick(genders);
    const ins = pick(insuranceTypes);
    const region = pick(regions);
    patientRegions.push(region);
    const enrolled = randDate("2019-01-01", "2025-12-01");
    lines.push(
      `INSERT INTO patients VALUES(${i + 1},'${fn}','${esc(ln)}','${dob}','${gender}','${ins}','${enrolled}','${region}');`
    );
  }

  // Memberships (1200 — most patients have one)
  const membershipPatients: number[] = [];
  for (let i = 0; i < 1200; i++) {
    const patId = Math.min(i + 1, 1500);
    membershipPatients.push(patId);
    const planId = pick([1, 1, 1, 2, 2, 2, 2, 3, 3, 3]);
    const cycle = pick(billingCycles);
    const start = randDate("2019-06-01", "2025-06-01");
    const isActive = rand() > 0.25;
    const status = isActive
      ? "Active"
      : pick(["Cancelled", "Expired", "Paused"]);
    const end = isActive ? "NULL" : `'${randDate(start, "2025-12-31")}'`;
    lines.push(
      `INSERT INTO memberships VALUES(${i + 1},${patId},${planId},'${start}',${end},'${cycle}','${status}');`
    );
  }

  // Membership Payments (8000)
  for (let i = 0; i < 8000; i++) {
    const memId = randInt(1, 1200);
    const patId = membershipPatients[memId - 1];
    const payDate = randDate("2019-06-01", "2025-12-31");
    const amount = pick([15, 15, 15, 25, 25, 25, 25, 45, 45, 45, 150, 250, 450]);
    const status = rand() > 0.05 ? (rand() > 0.02 ? "Paid" : "Refunded") : "Failed";
    lines.push(
      `INSERT INTO membership_payments VALUES(${i + 1},${memId},${patId},'${payDate}',${amount},'${status}');`
    );
  }

  // Appointments (4000)
  for (let i = 0; i < 4000; i++) {
    const patId = randInt(1, 1500);
    const provId = randInt(1, 80);
    const apptDate = randDate("2019-06-01", "2026-01-31");
    const apptType = pick(appointmentTypes);
    const status = pick([
      "Completed", "Completed", "Completed", "Completed",
      "Cancelled", "No-show",
    ]);
    const duration = pick([15, 20, 30, 30, 45, 45, 60]);
    lines.push(
      `INSERT INTO appointments VALUES(${i + 1},${patId},${provId},'${apptDate}','${apptType}','${status}',${duration});`
    );
  }

  // Diagnoses (3000)
  for (let i = 0; i < 3000; i++) {
    const apptId = randInt(1, 4000);
    const patId = randInt(1, 1500);
    const [code, desc] = pick(icdData);
    const diagDate = randDate("2019-06-01", "2026-01-31");
    lines.push(
      `INSERT INTO diagnoses VALUES(${i + 1},${apptId},${patId},'${code}','${esc(desc)}','${diagDate}');`
    );
  }

  // Claims (5000)
  for (let i = 0; i < 5000; i++) {
    const apptId = randInt(1, 4000);
    const patId = randInt(1, 1500);
    const provId = randInt(1, 80);
    const billed = Math.round((50 + rand() * 950) * 100) / 100;
    const status = pick(claimStatuses);
    const paidRatio =
      status === "Paid" ? 0.6 + rand() * 0.4 :
      status === "Denied" ? 0 :
      0.3 + rand() * 0.3;
    const paid = Math.round(billed * paidRatio * 100) / 100;
    const claimDate = randDate("2019-06-01", "2026-01-31");
    lines.push(
      `INSERT INTO claims VALUES(${i + 1},${apptId},${patId},${provId},${billed},${paid},'${claimDate}','${status}');`
    );
  }

  // Services (15)
  for (let i = 0; i < serviceData.length; i++) {
    const [name, cat, price, insElig] = serviceData[i];
    lines.push(
      `INSERT INTO services VALUES(${i + 1},'${esc(name)}','${cat}',${price},${insElig});`
    );
  }

  // Patient Services (3000)
  for (let i = 0; i < 3000; i++) {
    const apptId = randInt(1, 4000);
    const patId = randInt(1, 1500);
    const svcId = randInt(1, 15);
    const svc = serviceData[svcId - 1];
    const basePrice = svc[2] as number;
    const charged = Math.round(basePrice * (0.8 + rand() * 0.4) * 100) / 100;
    const coveredByIns = (svc[3] as number) === 1 && rand() > 0.3 ? 1 : 0;
    const oop = coveredByIns
      ? Math.round(charged * (0.1 + rand() * 0.3) * 100) / 100
      : charged;
    lines.push(
      `INSERT INTO patient_services VALUES(${i + 1},${apptId},${patId},${svcId},${charged},${coveredByIns},${oop});`
    );
  }

  // Insurance Partners (8)
  for (let i = 0; i < payerNames.length; i++) {
    const start = randDate("2019-01-01", "2022-06-01");
    const isActive = rand() > 0.15;
    const end = isActive ? "NULL" : `'${randDate("2024-01-01", "2025-12-31")}'`;
    const rate = Math.round((0.7 + rand() * 0.2) * 10000) / 10000;
    const numRegions = randInt(1, 4);
    const coveredRegions = [...regions]
      .sort(() => rand() - 0.5)
      .slice(0, numRegions)
      .join(",");
    lines.push(
      `INSERT INTO insurance_partners VALUES(${i + 1},'${esc(payerNames[i])}','${start}',${end},${rate},'${coveredRegions}');`
    );
  }

  // Clinical Partners (20)
  for (let i = 0; i < partnerNames.length; i++) {
    const pType = i < 10 ? "Employer" : i < 15 ? "Health System" : "University";
    const start = randDate("2020-01-01", "2024-06-01");
    const isActive = rand() > 0.2;
    const end = isActive ? "NULL" : `'${randDate("2024-06-01", "2025-12-31")}'`;
    const acv = Math.round((50000 + rand() * 450000) * 100) / 100;
    const lives = randInt(50, 2000);
    const region = pick(regions);
    lines.push(
      `INSERT INTO clinical_partners VALUES(${i + 1},'${esc(partnerNames[i])}','${pType}','${start}',${end},${acv},${lives},'${region}');`
    );
  }

  // Partner Patients (600)
  const usedPairs = new Set<string>();
  let ppCount = 0;
  while (ppCount < 600) {
    const partnerId = randInt(1, 20);
    const patId = randInt(1, 1500);
    const key = `${partnerId}-${patId}`;
    if (usedPairs.has(key)) continue;
    usedPairs.add(key);
    const enrolled = randDate("2020-06-01", "2025-06-01");
    lines.push(
      `INSERT INTO partner_patients VALUES(${partnerId},${patId},'${enrolled}');`
    );
    ppCount++;
  }

  // Referrals (800)
  for (let i = 0; i < 800; i++) {
    const refFrom = randInt(1, 80);
    let refTo = randInt(1, 80);
    while (refTo === refFrom) refTo = randInt(1, 80);
    const patId = randInt(1, 1500);
    const refDate = randDate("2019-06-01", "2026-01-31");
    const reason = pick(referralReasons);
    lines.push(
      `INSERT INTO referrals VALUES(${i + 1},${refFrom},${refTo},${patId},'${refDate}','${esc(reason)}');`
    );
  }

  return lines.join("\n");
}
