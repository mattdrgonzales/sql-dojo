"use client";

import { useState } from "react";

interface Section {
  title: string;
  items: { syntax: string; description: string }[];
}

const sections: Section[] = [
  {
    title: "Basics",
    items: [
      { syntax: "SELECT col1, col2 FROM table", description: "Retrieve specific columns" },
      { syntax: "SELECT * FROM table", description: "Retrieve all columns" },
      { syntax: "SELECT DISTINCT col FROM table", description: "Unique values only" },
      { syntax: "AS alias", description: "Rename a column in output" },
    ],
  },
  {
    title: "Filtering",
    items: [
      { syntax: "WHERE condition", description: "Filter rows" },
      { syntax: "AND / OR / NOT", description: "Combine conditions" },
      { syntax: "IN ('a', 'b', 'c')", description: "Match any in list" },
      { syntax: "BETWEEN x AND y", description: "Range (inclusive)" },
      { syntax: "LIKE '%pattern%'", description: "Pattern match (% = any chars)" },
      { syntax: "IS NULL / IS NOT NULL", description: "Check for null values" },
    ],
  },
  {
    title: "Sorting & Limiting",
    items: [
      { syntax: "ORDER BY col ASC|DESC", description: "Sort results" },
      { syntax: "LIMIT n", description: "Return first n rows" },
      { syntax: "LIMIT n OFFSET m", description: "Skip m rows, return n" },
    ],
  },
  {
    title: "Aggregation",
    items: [
      { syntax: "COUNT(*)", description: "Number of rows" },
      { syntax: "SUM(col) / AVG(col)", description: "Total / average" },
      { syntax: "MIN(col) / MAX(col)", description: "Smallest / largest" },
      { syntax: "GROUP BY col", description: "Group rows for aggregation" },
      { syntax: "HAVING condition", description: "Filter groups (after GROUP BY)" },
    ],
  },
  {
    title: "Joins",
    items: [
      { syntax: "JOIN t ON a.id = t.a_id", description: "Inner join (matching rows)" },
      { syntax: "LEFT JOIN t ON ...", description: "All left rows + matching right" },
      { syntax: "t1 JOIN t2 JOIN t3", description: "Chain multiple joins" },
    ],
  },
  {
    title: "Subqueries & Logic",
    items: [
      { syntax: "(SELECT ... ) AS sub", description: "Subquery as derived table" },
      { syntax: "WHERE col IN (SELECT ...)", description: "Subquery in filter" },
      { syntax: "CASE WHEN ... THEN ... ELSE ... END", description: "Conditional logic" },
      { syntax: "COALESCE(a, b)", description: "First non-null value" },
    ],
  },
  {
    title: "Window Functions",
    items: [
      { syntax: "ROW_NUMBER() OVER (ORDER BY ...)", description: "Sequential row number" },
      { syntax: "RANK() OVER (PARTITION BY ... ORDER BY ...)", description: "Rank within groups" },
      { syntax: "SUM(col) OVER (ORDER BY ...)", description: "Running total" },
      { syntax: "LAG(col) / LEAD(col) OVER (...)", description: "Previous / next row value" },
    ],
  },
  {
    title: "CTEs",
    items: [
      { syntax: "WITH name AS (SELECT ...) SELECT ... FROM name", description: "Common Table Expression" },
    ],
  },
  {
    title: "String & Date",
    items: [
      { syntax: "col || ' ' || col2", description: "Concatenate strings" },
      { syntax: "UPPER(col) / LOWER(col)", description: "Change case" },
      { syntax: "LENGTH(col)", description: "String length" },
      { syntax: "SUBSTR(col, start, len)", description: "Extract substring" },
      { syntax: "REPLACE(col, 'old', 'new')", description: "Replace text" },
      { syntax: "ROUND(col, decimals)", description: "Round a number" },
    ],
  },
];

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheatSheet({ isOpen, onClose }: CheatSheetProps) {
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? sections
        .map((s) => ({
          ...s,
          items: s.items.filter(
            (item) =>
              item.syntax.toLowerCase().includes(filter.toLowerCase()) ||
              item.description.toLowerCase().includes(filter.toLowerCase())
          ),
        }))
        .filter((s) => s.items.length > 0)
    : sections;

  if (!isOpen) return null;

  return (
    <div className="flex h-full w-72 flex-col border-l lg:w-80"
      style={{ borderColor: "var(--color-border-strong)", background: "var(--color-surface-1)" }}
    >
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <h3 className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          SQL Reference
        </h3>
        <button
          onClick={onClose}
          className="cursor-pointer rounded p-1 transition-colors hover:bg-white/5 focus-ring"
          aria-label="Close reference panel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search syntax..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-md px-3 py-1.5 text-sm outline-none focus-ring"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.map((section) => (
          <div key={section.title} className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {section.title}
            </p>
            <div className="mt-1 flex flex-col gap-1">
              {section.items.map((item) => (
                <div key={item.syntax} className="rounded px-2 py-1.5 transition-colors hover:bg-white/5">
                  <code className="text-xs font-medium" style={{
                    fontFamily: "var(--font-code)",
                    color: "var(--color-primary)",
                  }}>
                    {item.syntax}
                  </code>
                  <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
