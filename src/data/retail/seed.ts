// Deterministic seed data generator for retail industry
// Generates ~13,770 rows across 7 tables

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(44);
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
const cities: [string, string][] = [
  ["San Diego","CA"],["Los Angeles","CA"],["Phoenix","AZ"],["Denver","CO"],
  ["Austin","TX"],["Portland","OR"],["Seattle","WA"],["Chicago","IL"],
  ["Miami","FL"],["Atlanta","GA"],["Boston","MA"],["Nashville","TN"],
  ["Minneapolis","MN"],["Detroit","MI"],["Philadelphia","PA"],["Dallas","TX"],
  ["San Francisco","CA"],["Houston","TX"],["New York","NY"],["Orlando","FL"],
];
const loyaltyTiers = ["Bronze", "Silver", "Gold", "Platinum"];
const orderStatuses = ["completed", "shipped", "processing", "cancelled", "returned"];
const shippingMethods = ["standard", "express", "next_day", "pickup", "freight"];
const storeTypes = ["flagship", "outlet", "mall", "standalone", "warehouse"];

const categories: Record<string, string[]> = {
  Electronics: ["Phones", "Laptops", "Tablets", "Headphones", "Cameras", "Accessories"],
  Clothing: ["Shirts", "Pants", "Dresses", "Outerwear", "Shoes", "Activewear"],
  Home: ["Furniture", "Kitchen", "Bedding", "Lighting", "Decor", "Storage"],
  Sports: ["Fitness", "Outdoor", "Team Sports", "Water Sports", "Cycling", "Camping"],
  Food: ["Snacks", "Beverages", "Organic", "Frozen", "Bakery", "Pantry"],
  Beauty: ["Skincare", "Makeup", "Haircare", "Fragrance", "Bath", "Tools"],
};

const productPrefixes: Record<string, string[]> = {
  Electronics: ["Pro","Ultra","Max","Nano","Elite","Flex","Core","Edge","Pixel","Nova"],
  Clothing: ["Classic","Urban","Trail","Breeze","Summit","Lux","Essential","Drift","Alpine","Coast"],
  Home: ["Haven","Nest","Aura","Bloom","Crest","Harbor","Ember","Zenith","Sienna","Willow"],
  Sports: ["Apex","Velocity","Peak","Surge","Titan","Blaze","Endure","Rally","Storm","Agile"],
  Food: ["Farm Fresh","Harvest","Golden","Nature''s","Pure","Select","Prime","Artisan","Heritage","Classic"],
  Beauty: ["Radiance","Glow","Velvet","Silk","Pearl","Rose","Crystal","Orchid","Bloom","Serene"],
};

const supplierNames = [
  "Pacific Supply Co","Global Goods Inc","Eastern Imports","Nordic Wholesale","Atlas Distribution",
  "Summit Partners","Coastal Trading","Prime Source","Evergreen Supply","Meridian Goods",
  "Pinnacle Imports","Sterling Wholesale","Horizon Trade Co","Redwood Distribution","Continental Supply",
  "Apex Sourcing","Harbor Freight Co","Golden Gate Imports","Cascade Supply","Ironbridge Trading",
  "Lakewood Wholesale","Phoenix Goods","Silverline Imports","Delta Distribution","Cornerstone Supply",
  "Northwind Trading","Pacifica Imports","Bridgeport Supply","Summit Source Co","Highland Wholesale",
];
const supplierCountries = [
  "USA","USA","USA","USA","USA","China","China","China","Germany","Germany",
  "Japan","Japan","South Korea","Vietnam","India","Mexico","Canada","Taiwan","Italy","UK",
  "Brazil","Thailand","Indonesia","Turkey","Poland","France","Spain","Netherlands","Sweden","Australia",
];

const storeNames = [
  "Downtown Central","Westfield Mall","Harbor Point","Sunrise Plaza","Oakwood Center",
  "Riverside Square","Lakeside Commons","Mountain View Mall","Pacific Heights","Valley Fair",
  "Northgate","Bayshore","Eastside Market","Metro Center","Parkway Place",
  "Crossroads","Summit Mall","Greenfield Plaza","Heritage Square","Cedar Creek",
  "Midtown","Coastal Walk","Prairie Ridge","Ironwood Center","Brookside Mall",
  "Silverlake","Golden Gate Plaza","Hilltop Center","Canyon View","Lakeshore Mall",
  "Maple Grove","Stonebridge","Meadowbrook","Fairview Plaza","Blue Ridge",
  "Sandstone Market","Coral Springs","Willow Creek","Aspen Square","Pineview Mall",
];

export function generateRetailSeed(): string {
  const lines: string[] = [];

  // Suppliers (30)
  for (let i = 0; i < 30; i++) {
    const rating = Math.round((2.5 + rand() * 2.5) * 10) / 10;
    const leadTime = randInt(3, 60);
    lines.push(
      `INSERT INTO suppliers VALUES(${i + 1},'${esc(supplierNames[i])}','${supplierCountries[i]}',${leadTime},${rating});`
    );
  }

  // Stores (40)
  for (let i = 0; i < 40; i++) {
    const [city, state] = pick(cities);
    const type = pick(storeTypes);
    const sqft = type === "warehouse" ? randInt(40000, 120000)
      : type === "flagship" ? randInt(15000, 50000)
      : randInt(3000, 20000);
    const opened = randDate("2000-01-01", "2025-06-01");
    lines.push(
      `INSERT INTO stores VALUES(${i + 1},'${esc(storeNames[i])}','${city}','${state}','${type}','${opened}',${sqft});`
    );
  }

  // Products (200)
  const categoryKeys = Object.keys(categories);
  for (let i = 0; i < 200; i++) {
    const cat = categoryKeys[i % categoryKeys.length];
    const subcats = categories[cat];
    const subcat = subcats[Math.floor((i / categoryKeys.length) % subcats.length)];
    const prefix = pick(productPrefixes[cat]);
    const name = `${prefix} ${subcat.replace(/s$/, "")} ${randInt(100, 999)}`;
    const price = cat === "Electronics" ? Math.round((49.99 + rand() * 950) * 100) / 100
      : cat === "Food" ? Math.round((1.99 + rand() * 18) * 100) / 100
      : Math.round((9.99 + rand() * 190) * 100) / 100;
    const cost = Math.round(price * (0.3 + rand() * 0.35) * 100) / 100;
    const supplierId = randInt(1, 30);
    lines.push(
      `INSERT INTO products VALUES(${i + 1},'${esc(name)}','${cat}','${subcat}',${price},${cost},${supplierId});`
    );
  }

  // Customers (1000)
  for (let i = 0; i < 1000; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;
    const [city, state] = pick(cities);
    const joined = randDate("2018-01-01", "2026-01-01");
    const tierRoll = rand();
    const tier = tierRoll < 0.40 ? "Bronze"
      : tierRoll < 0.70 ? "Silver"
      : tierRoll < 0.90 ? "Gold"
      : "Platinum";
    lines.push(
      `INSERT INTO customers VALUES(${i + 1},'${fn}','${esc(ln)}','${esc(email)}','${city}','${state}','${joined}','${tier}');`
    );
  }

  // Orders (4000)
  for (let i = 0; i < 4000; i++) {
    const custId = randInt(1, 1000);
    const orderDate = randDate("2023-01-01", "2026-02-28");
    const statusRoll = rand();
    const status = statusRoll < 0.55 ? "completed"
      : statusRoll < 0.75 ? "shipped"
      : statusRoll < 0.88 ? "processing"
      : statusRoll < 0.95 ? "cancelled"
      : "returned";
    const total = Math.round((15 + rand() * 485) * 100) / 100;
    const shipping = pick(shippingMethods);
    lines.push(
      `INSERT INTO orders VALUES(${i + 1},${custId},'${orderDate}','${status}',${total},'${shipping}');`
    );
  }

  // Order Items (8000)
  for (let i = 0; i < 8000; i++) {
    const orderId = Math.floor(i / 2) + 1; // ~2 items per order
    const productId = randInt(1, 200);
    const quantity = randInt(1, 5);
    const unitPrice = Math.round((5 + rand() * 295) * 100) / 100;
    const discountRoll = rand();
    const discount = discountRoll < 0.6 ? 0
      : discountRoll < 0.8 ? Math.round(rand() * 10 * 100) / 100
      : Math.round(rand() * 25 * 100) / 100;
    lines.push(
      `INSERT INTO order_items VALUES(${i + 1},${orderId},${productId},${quantity},${unitPrice},${discount});`
    );
  }

  // Inventory (500)
  for (let i = 0; i < 500; i++) {
    const productId = randInt(1, 200);
    const storeId = randInt(1, 40);
    const qoh = randInt(0, 500);
    const reorderPoint = randInt(10, 100);
    const lastRestocked = randDate("2025-06-01", "2026-02-28");
    lines.push(
      `INSERT INTO inventory VALUES(${i + 1},${productId},${storeId},${qoh},${reorderPoint},'${lastRestocked}');`
    );
  }

  return lines.join("\n");
}
