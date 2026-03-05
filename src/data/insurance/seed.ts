// Deterministic seed data generator for insurance industry
// Generates ~5830 rows across 5 tables

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(43);
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

const states = [
  "CA","TX","FL","NY","PA","IL","OH","GA","NC","MI",
  "NJ","VA","WA","AZ","MA","TN","IN","MO","MD","WI",
  "CO","MN","SC","AL","LA","KY","OR","OK","CT","UT",
];

const regions = ["Northeast","Southeast","Midwest","Southwest","West"];

const policyTypes = ["auto","home","health","life","umbrella"];
const policyStatuses = ["active","expired","cancelled","pending"];

const claimTypes = ["collision","theft","water_damage","medical","property","liability"];
const claimStatuses = ["open","closed","denied","under_investigation"];

const coverageTypes = [
  "bodily_injury","property_damage","collision","comprehensive","uninsured_motorist",
  "dwelling","personal_property","liability","medical_payments","loss_of_use",
  "hospitalization","prescription","dental","vision","preventive_care",
  "term_life","whole_life","accidental_death","disability","critical_illness",
  "excess_liability","personal_injury","umbrella_liability",
];

export function generateInsuranceSeed(): string {
  const lines: string[] = [];

  // Members (500)
  for (let i = 0; i < 500; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const dob = randDate("1945-01-01", "2000-12-31");
    const gender = pick(["M", "F"]);
    const state = pick(states);
    const creditScore = randInt(580, 850);
    const memberSince = randDate("2005-01-01", "2025-01-01");
    lines.push(
      `INSERT INTO members VALUES(${i + 1},'${fn}','${esc(ln)}','${dob}','${gender}','${state}',${creditScore},'${memberSince}');`
    );
  }

  // Adjusters (30)
  for (let i = 0; i < 30; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const region = pick(regions);
    const yearsExp = randInt(1, 30);
    const hireDate = randDate("2000-01-01", "2024-06-01");
    lines.push(
      `INSERT INTO adjusters VALUES(${i + 1},'${fn}','${esc(ln)}','${region}',${yearsExp},'${hireDate}');`
    );
  }

  // Policies (800)
  for (let i = 0; i < 800; i++) {
    const memberId = randInt(1, 500);
    const policyType = pick(policyTypes);
    let premium: number;
    let deductible: number;
    let coverageLimit: number;
    switch (policyType) {
      case "auto":
        premium = Math.round((80 + rand() * 250) * 100) / 100;
        deductible = pick([250, 500, 1000, 2000]);
        coverageLimit = pick([25000, 50000, 100000, 250000, 500000]);
        break;
      case "home":
        premium = Math.round((100 + rand() * 400) * 100) / 100;
        deductible = pick([500, 1000, 2500, 5000]);
        coverageLimit = pick([150000, 250000, 400000, 600000, 1000000]);
        break;
      case "health":
        premium = Math.round((200 + rand() * 600) * 100) / 100;
        deductible = pick([500, 1000, 2000, 3000, 5000, 7500]);
        coverageLimit = pick([250000, 500000, 1000000, 2000000]);
        break;
      case "life":
        premium = Math.round((30 + rand() * 200) * 100) / 100;
        deductible = 0;
        coverageLimit = pick([50000, 100000, 250000, 500000, 1000000, 2000000]);
        break;
      case "umbrella":
        premium = Math.round((20 + rand() * 100) * 100) / 100;
        deductible = 0;
        coverageLimit = pick([1000000, 2000000, 5000000]);
        break;
      default:
        premium = 100;
        deductible = 500;
        coverageLimit = 100000;
    }
    const startDate = randDate("2020-01-01", "2025-06-01");
    const startMs = new Date(startDate).getTime();
    const endDate = new Date(startMs + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const status = pick(policyStatuses);
    lines.push(
      `INSERT INTO policies VALUES(${i + 1},${memberId},'${policyType}',${premium},${deductible},${coverageLimit},'${startDate}','${endDate}','${status}');`
    );
  }

  // Claims (3000)
  for (let i = 0; i < 3000; i++) {
    const policyId = randInt(1, 800);
    const memberId = randInt(1, 500);
    const incidentDate = randDate("2021-01-01", "2025-12-31");
    const incidentMs = new Date(incidentDate).getTime();
    const filedDate = new Date(incidentMs + randInt(0, 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const claimType = pick(claimTypes);
    let amountClaimed: number;
    switch (claimType) {
      case "collision":
        amountClaimed = Math.round((500 + rand() * 25000) * 100) / 100;
        break;
      case "theft":
        amountClaimed = Math.round((1000 + rand() * 40000) * 100) / 100;
        break;
      case "water_damage":
        amountClaimed = Math.round((2000 + rand() * 50000) * 100) / 100;
        break;
      case "medical":
        amountClaimed = Math.round((200 + rand() * 100000) * 100) / 100;
        break;
      case "property":
        amountClaimed = Math.round((500 + rand() * 80000) * 100) / 100;
        break;
      case "liability":
        amountClaimed = Math.round((1000 + rand() * 200000) * 100) / 100;
        break;
      default:
        amountClaimed = Math.round((500 + rand() * 10000) * 100) / 100;
    }
    const status = pick(claimStatuses);
    let amountApproved: string;
    if (status === "denied") {
      amountApproved = "0";
    } else if (status === "closed") {
      amountApproved = `${Math.round(amountClaimed * (0.4 + rand() * 0.6) * 100) / 100}`;
    } else {
      amountApproved = "NULL";
    }
    const adjusterId = randInt(1, 30);
    lines.push(
      `INSERT INTO claims VALUES(${i + 1},${policyId},${memberId},'${incidentDate}','${filedDate}','${claimType}',${amountClaimed},${amountApproved},'${status}',${adjusterId});`
    );
  }

  // Coverages (1500)
  for (let i = 0; i < 1500; i++) {
    const policyId = randInt(1, 800);
    const coverageType = pick(coverageTypes);
    let coverageAmount: number;
    let copay: string;
    if (["hospitalization","prescription","dental","vision","preventive_care"].includes(coverageType)) {
      coverageAmount = pick([50000, 100000, 250000, 500000, 1000000]);
      copay = `${pick([10, 20, 25, 30, 40, 50, 75])}`;
    } else if (["term_life","whole_life","accidental_death","critical_illness"].includes(coverageType)) {
      coverageAmount = pick([50000, 100000, 250000, 500000, 1000000]);
      copay = "NULL";
    } else if (["excess_liability","personal_injury","umbrella_liability"].includes(coverageType)) {
      coverageAmount = pick([1000000, 2000000, 5000000]);
      copay = "NULL";
    } else {
      coverageAmount = pick([25000, 50000, 100000, 250000, 500000]);
      copay = "NULL";
    }
    lines.push(
      `INSERT INTO coverages VALUES(${i + 1},${policyId},'${coverageType}',${coverageAmount},${copay});`
    );
  }

  return lines.join("\n");
}
