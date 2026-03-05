export const retailSchema = `
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  city TEXT,
  state TEXT,
  joined_date TEXT NOT NULL,
  loyalty_tier TEXT NOT NULL
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  price REAL NOT NULL,
  cost REAL NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(id)
);

CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  lead_time_days INTEGER NOT NULL,
  rating REAL
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date TEXT NOT NULL,
  status TEXT NOT NULL,
  total REAL NOT NULL,
  shipping_method TEXT NOT NULL
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  discount REAL DEFAULT 0
);

CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  store_id INTEGER REFERENCES stores(id),
  quantity_on_hand INTEGER NOT NULL,
  reorder_point INTEGER NOT NULL,
  last_restocked TEXT
);

CREATE TABLE stores (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  type TEXT NOT NULL,
  opened_date TEXT,
  square_feet INTEGER
);
`;

export const retailTableInfo = [
  {
    name: "customers",
    description: "Retail customers and loyalty members",
    columns: ["id", "first_name", "last_name", "email", "city", "state", "joined_date", "loyalty_tier"],
  },
  {
    name: "products",
    description: "Products available for sale",
    columns: ["id", "name", "category", "subcategory", "price", "cost", "supplier_id"],
  },
  {
    name: "suppliers",
    description: "Product suppliers and vendors",
    columns: ["id", "name", "country", "lead_time_days", "rating"],
  },
  {
    name: "orders",
    description: "Customer orders",
    columns: ["id", "customer_id", "order_date", "status", "total", "shipping_method"],
  },
  {
    name: "order_items",
    description: "Individual line items within orders",
    columns: ["id", "order_id", "product_id", "quantity", "unit_price", "discount"],
  },
  {
    name: "inventory",
    description: "Stock levels at each store",
    columns: ["id", "product_id", "store_id", "quantity_on_hand", "reorder_point", "last_restocked"],
  },
  {
    name: "stores",
    description: "Physical retail store locations",
    columns: ["id", "name", "city", "state", "type", "opened_date", "square_feet"],
  },
];
