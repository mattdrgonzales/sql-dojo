export type Tier = 1 | 2 | 3 | 4 | 5;
export type Industry = "healthcare" | "insurance" | "retail" | "education" | "tia";

export interface Challenge {
  id: string;
  tier: Tier;
  title: string;
  businessQuestion: string;
  hint?: string;
  syntaxHint?: string;
  expectedQuery: string;
  concepts: string[];
}

export interface IndustryConfig {
  id: Industry;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const industries: IndustryConfig[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    description: "Hospitals, patients, claims, and diagnoses",
    color: "#0891B2",
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: "🛡️",
    description: "Policies, members, claims, and coverage",
    color: "#6366F1",
  },
  {
    id: "retail",
    name: "Retail",
    icon: "🏪",
    description: "Customers, orders, products, and inventory",
    color: "#059669",
  },
  {
    id: "education",
    name: "Education",
    icon: "🎓",
    description: "Students, courses, enrollments, and grades",
    color: "#CA8A04",
  },
  {
    id: "tia",
    name: "Tia Health",
    icon: "💜",
    description: "Memberships, claims, services, partnerships, and patient LTV",
    color: "#A855F7",
  },
];

export const tierLabels: Record<Tier, string> = {
  1: "Foundations",
  2: "Joins",
  3: "Aggregation",
  4: "Subqueries & Logic",
  5: "Window Functions & CTEs",
};

export const tierDescriptions: Record<Tier, string> = {
  1: "SELECT, WHERE, ORDER BY, LIMIT",
  2: "INNER JOIN, LEFT JOIN, aliases",
  3: "GROUP BY, HAVING, COUNT, SUM, AVG",
  4: "Subqueries, CASE, UNION, date/string functions",
  5: "ROW_NUMBER, RANK, LAG, LEAD, CTEs, running totals",
};
