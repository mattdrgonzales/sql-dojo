import { Challenge } from "./types";

export const retailChallenges: Challenge[] = [
  // TIER 1 — Foundations
  {
    id: "ret-1-01",
    tier: 1,
    title: "Platinum Customers",
    businessQuestion:
      "The loyalty team needs all Platinum-tier customers in California, sorted by join date. Show their full name, city, and joined date.",
    hint: "Filter by loyalty_tier and state, order by joined_date",
    syntaxHint: "SELECT ... FROM customers WHERE loyalty_tier = '...' AND state = '...' ORDER BY ...",
    expectedQuery:
      "SELECT first_name, last_name, city, joined_date FROM customers WHERE loyalty_tier = 'Platinum' AND state = 'CA' ORDER BY joined_date;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  {
    id: "ret-1-02",
    tier: 1,
    title: "Top-Priced Products",
    businessQuestion:
      "The merchandising team wants the 20 most expensive products. Show product name, category, price, and cost.",
    hint: "Order by price descending, limit to 20",
    syntaxHint: "SELECT ... FROM products ORDER BY price DESC LIMIT ...",
    expectedQuery:
      "SELECT name, category, price, cost FROM products ORDER BY price DESC LIMIT 20;",
    concepts: ["SELECT", "ORDER BY", "LIMIT"],
  },
  {
    id: "ret-1-03",
    tier: 1,
    title: "Cancelled Orders",
    businessQuestion:
      "Customer service needs all cancelled orders over $200. Show order ID, customer ID, total, and order date.",
    hint: "Two conditions: status AND total",
    syntaxHint: "SELECT ... FROM orders WHERE status = '...' AND total > ...",
    expectedQuery:
      "SELECT id, customer_id, total, order_date FROM orders WHERE status = 'cancelled' AND total > 200;",
    concepts: ["SELECT", "WHERE", "AND"],
  },
  {
    id: "ret-1-04",
    tier: 1,
    title: "Flagship Stores",
    businessQuestion:
      "The real estate team needs all flagship stores, sorted by square footage descending. Show store name, city, state, and square feet.",
    hint: "Filter on type, order by square_feet",
    syntaxHint: "SELECT ... FROM stores WHERE type = '...' ORDER BY ... DESC",
    expectedQuery:
      "SELECT name, city, state, square_feet FROM stores WHERE type = 'flagship' ORDER BY square_feet DESC;",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
  },
  {
    id: "ret-1-05",
    tier: 1,
    title: "Top-Rated Suppliers",
    businessQuestion:
      "The procurement team needs all USA-based suppliers with a rating of 4.0 or higher, sorted by rating descending.",
    hint: "Filter on country and rating",
    syntaxHint: "SELECT ... FROM suppliers WHERE country = '...' AND rating >= ... ORDER BY ...",
    expectedQuery:
      "SELECT name, country, lead_time_days, rating FROM suppliers WHERE country = 'USA' AND rating >= 4.0 ORDER BY rating DESC;",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
  },
  // TIER 2 — Joins
  {
    id: "ret-2-01",
    tier: 2,
    title: "Orders with Customer Names",
    businessQuestion:
      "The fulfillment team needs a report of all processing orders showing the customer's full name, order total, and shipping method.",
    hint: "Join orders to customers on customer_id",
    syntaxHint:
      "SELECT ... FROM orders o JOIN customers c ON o.customer_id = c.id WHERE ...",
    expectedQuery:
      "SELECT c.first_name, c.last_name, o.total, o.shipping_method FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.status = 'processing';",
    concepts: ["JOIN", "aliases", "WHERE"],
  },
  {
    id: "ret-2-02",
    tier: 2,
    title: "Product Supplier Details",
    businessQuestion:
      "The supply chain manager wants all Electronics products with their supplier name and lead time. Sort by price descending.",
    hint: "Join products to suppliers on supplier_id, filter by category",
    syntaxHint:
      "SELECT ... FROM products p JOIN suppliers s ON p.supplier_id = s.id WHERE ... ORDER BY ...",
    expectedQuery:
      "SELECT p.name, p.subcategory, p.price, s.name AS supplier_name, s.lead_time_days FROM products p JOIN suppliers s ON p.supplier_id = s.id WHERE p.category = 'Electronics' ORDER BY p.price DESC;",
    concepts: ["JOIN", "aliases", "WHERE", "AS", "ORDER BY"],
  },
  {
    id: "ret-2-03",
    tier: 2,
    title: "Order Item Details",
    businessQuestion:
      "The analytics team wants to see all items from completed orders with the product name and category. Show order ID, product name, category, quantity, and unit price.",
    hint: "Join order_items to orders and products",
    syntaxHint:
      "SELECT ... FROM order_items oi JOIN orders o ON ... JOIN products p ON ... WHERE ...",
    expectedQuery:
      "SELECT o.id AS order_id, p.name AS product_name, p.category, oi.quantity, oi.unit_price FROM order_items oi JOIN orders o ON oi.order_id = o.id JOIN products p ON oi.product_id = p.id WHERE o.status = 'completed';",
    concepts: ["JOIN", "multiple joins", "aliases", "WHERE", "AS"],
  },
  {
    id: "ret-2-04",
    tier: 2,
    title: "Low Stock Alert",
    businessQuestion:
      "The warehouse manager needs all inventory items where quantity on hand is below the reorder point. Show product name, store name, quantity on hand, and reorder point.",
    hint: "Join inventory to products and stores, filter where quantity_on_hand < reorder_point",
    syntaxHint:
      "SELECT ... FROM inventory i JOIN products p ON ... JOIN stores s ON ... WHERE i.quantity_on_hand < i.reorder_point",
    expectedQuery:
      "SELECT p.name AS product_name, s.name AS store_name, i.quantity_on_hand, i.reorder_point FROM inventory i JOIN products p ON i.product_id = p.id JOIN stores s ON i.store_id = s.id WHERE i.quantity_on_hand < i.reorder_point ORDER BY i.quantity_on_hand;",
    concepts: ["JOIN", "multiple joins", "WHERE", "ORDER BY"],
  },
  // TIER 3 — Aggregation
  {
    id: "ret-3-01",
    tier: 3,
    title: "Revenue by Category",
    businessQuestion:
      "The CFO wants total revenue by product category from completed orders. Show category, total units sold, and total revenue. Only include categories with over 500 units sold.",
    hint: "Join order_items to products and orders, GROUP BY category, use HAVING",
    syntaxHint:
      "SELECT ... SUM(oi.quantity), SUM(oi.quantity * oi.unit_price) FROM order_items oi JOIN products p ON ... JOIN orders o ON ... WHERE ... GROUP BY ... HAVING ... ORDER BY ...",
    expectedQuery:
      "SELECT p.category, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id JOIN orders o ON oi.order_id = o.id WHERE o.status = 'completed' GROUP BY p.category HAVING SUM(oi.quantity) > 500 ORDER BY total_revenue DESC;",
    concepts: ["GROUP BY", "HAVING", "SUM", "JOIN", "ROUND"],
  },
  {
    id: "ret-3-02",
    tier: 3,
    title: "Return Rate by Shipping Method",
    businessQuestion:
      "The operations team wants the return rate by shipping method. Show shipping method, total orders, returned orders, and return percentage.",
    hint: "Use SUM with CASE to count returned orders",
    syntaxHint:
      "SELECT shipping_method, COUNT(*), SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) ... FROM orders GROUP BY ...",
    expectedQuery:
      "SELECT shipping_method, COUNT(*) AS total_orders, SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) AS returned_orders, ROUND(SUM(CASE WHEN status = 'returned' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS return_rate FROM orders GROUP BY shipping_method ORDER BY return_rate DESC;",
    concepts: ["GROUP BY", "SUM", "CASE", "ROUND"],
  },
  {
    id: "ret-3-03",
    tier: 3,
    title: "Top Customers by Spend",
    businessQuestion:
      "Marketing wants the top 10 customers by total spend on completed orders. Show customer name, loyalty tier, total orders, and total spent.",
    hint: "Join orders to customers, filter completed, group by customer",
    syntaxHint:
      "SELECT ... COUNT(*), SUM(total) FROM orders o JOIN customers c ON ... WHERE ... GROUP BY ... ORDER BY ... LIMIT ...",
    expectedQuery:
      "SELECT c.first_name, c.last_name, c.loyalty_tier, COUNT(*) AS order_count, ROUND(SUM(o.total), 2) AS total_spent FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.status = 'completed' GROUP BY c.id, c.first_name, c.last_name, c.loyalty_tier ORDER BY total_spent DESC LIMIT 10;",
    concepts: ["GROUP BY", "COUNT", "SUM", "JOIN", "ORDER BY", "LIMIT"],
  },
  {
    id: "ret-3-04",
    tier: 3,
    title: "Monthly Sales Trends",
    businessQuestion:
      "Finance needs monthly completed order totals for 2025. Show the month, number of orders, and total revenue.",
    hint: "Use substr to extract year-month from order_date",
    syntaxHint:
      "SELECT substr(order_date, 1, 7) AS month ... GROUP BY month ORDER BY month",
    expectedQuery:
      "SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS order_count, ROUND(SUM(total), 2) AS total_revenue FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01' AND status = 'completed' GROUP BY month ORDER BY month;",
    concepts: ["GROUP BY", "substr", "SUM", "COUNT", "WHERE"],
  },
  // TIER 4 — Subqueries & Logic
  {
    id: "ret-4-01",
    tier: 4,
    title: "Above-Average Customers",
    businessQuestion:
      "The analytics team wants customers whose total spend exceeds the average total per customer. Show customer name, loyalty tier, and total spent.",
    hint: "Use a subquery to calculate total per customer, then compare against the average",
    syntaxHint:
      "SELECT ... FROM (...) WHERE total_spent > (SELECT AVG(total_spent) FROM (...))",
    expectedQuery:
      "SELECT c.first_name, c.last_name, c.loyalty_tier, ct.total_spent FROM (SELECT customer_id, ROUND(SUM(total), 2) AS total_spent FROM orders WHERE status = 'completed' GROUP BY customer_id) ct JOIN customers c ON ct.customer_id = c.id WHERE ct.total_spent > (SELECT AVG(total_spent) FROM (SELECT SUM(total) AS total_spent FROM orders WHERE status = 'completed' GROUP BY customer_id)) ORDER BY ct.total_spent DESC;",
    concepts: ["subquery", "JOIN", "GROUP BY", "AVG", "SUM"],
  },
  {
    id: "ret-4-02",
    tier: 4,
    title: "Product Margin Analysis",
    businessQuestion:
      "Create a report showing each product category, average margin percentage, and a label: 'High Margin' if over 50%, 'Medium' if 30-50%, 'Low' if under 30%.",
    hint: "Margin = (price - cost) / price * 100. Use CASE for the label.",
    syntaxHint:
      "SELECT category, ROUND(AVG((price - cost) / price * 100), 1) ... CASE WHEN ... END ... GROUP BY ...",
    expectedQuery:
      "SELECT category, ROUND(AVG((price - cost) / price * 100), 1) AS avg_margin_pct, CASE WHEN AVG((price - cost) / price * 100) > 50 THEN 'High Margin' WHEN AVG((price - cost) / price * 100) >= 30 THEN 'Medium' ELSE 'Low' END AS margin_label FROM products GROUP BY category ORDER BY avg_margin_pct DESC;",
    concepts: ["CASE", "GROUP BY", "AVG", "ROUND"],
  },
  // TIER 5 — Window Functions & CTEs
  {
    id: "ret-5-01",
    tier: 5,
    title: "Product Sales Rankings",
    businessQuestion:
      "Rank all products within their category by total units sold from completed orders. Show product name, category, total units, and rank within category.",
    hint: "Use RANK() with PARTITION BY category",
    syntaxHint:
      "SELECT ... RANK() OVER (PARTITION BY ... ORDER BY ... DESC) AS rank ... FROM ...",
    expectedQuery:
      "SELECT p.name, p.category, SUM(oi.quantity) AS total_units, RANK() OVER (PARTITION BY p.category ORDER BY SUM(oi.quantity) DESC) AS category_rank FROM order_items oi JOIN products p ON oi.product_id = p.id JOIN orders o ON oi.order_id = o.id WHERE o.status = 'completed' GROUP BY p.id, p.name, p.category;",
    concepts: ["RANK", "OVER", "PARTITION BY", "GROUP BY", "JOIN"],
  },
  {
    id: "ret-5-02",
    tier: 5,
    title: "Running Monthly Revenue",
    businessQuestion:
      "Finance wants a running total of completed order revenue by month for 2025. Show each month, monthly revenue, and cumulative total.",
    hint: "Use a CTE for monthly totals, then SUM() OVER for the running total",
    syntaxHint:
      "WITH monthly AS (SELECT ... GROUP BY ...) SELECT month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY month) AS running_total FROM monthly",
    expectedQuery:
      "WITH monthly AS (SELECT substr(order_date, 1, 7) AS month, ROUND(SUM(total), 2) AS monthly_revenue FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01' AND status = 'completed' GROUP BY month) SELECT month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY month) AS running_total FROM monthly ORDER BY month;",
    concepts: ["CTE", "WITH", "SUM OVER", "window function", "GROUP BY"],
  },
];
