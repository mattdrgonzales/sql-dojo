"use client";

import type { QueryResult, QueryError } from "@/engine/sql";

interface ResultsTableProps {
  result: QueryResult | QueryError | null;
  isLoading: boolean;
}

function isError(r: QueryResult | QueryError): r is QueryError {
  return "message" in r;
}

export default function ResultsTable({ result, isLoading }: ResultsTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center"
        style={{ color: "var(--color-text-muted)" }}
      >
        Running...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-32 items-center justify-center"
        style={{ color: "var(--color-text-muted)" }}
      >
        Results appear here
      </div>
    );
  }

  if (isError(result)) {
    return (
      <div className="rounded-lg p-4"
        style={{
          border: "1px solid var(--color-error)",
          background: "rgba(239, 68, 68, 0.08)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--color-error)" }}>Error</p>
        <p className="mt-1 text-sm" style={{
          fontFamily: "var(--font-code)",
          color: "rgba(239, 68, 68, 0.8)",
        }}>
          {result.message}
        </p>
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center"
        style={{ color: "var(--color-text-muted)" }}
      >
        No rows returned
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg"
      style={{ border: "1px solid var(--color-border-strong)" }}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr style={{
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface-2)",
          }}>
            {result.columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap px-3 py-2 font-medium"
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-code)",
                  fontSize: "12px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.values.map((row, i) => (
            <tr
              key={i}
              className="transition-colors hover:bg-white/[0.03]"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="whitespace-nowrap px-3 py-1.5 text-xs"
                  style={{
                    fontFamily: "var(--font-code)",
                    fontVariantNumeric: "tabular-nums",
                    color: cell === null ? "var(--color-text-muted)" : "var(--color-text-secondary)",
                  }}
                >
                  {cell === null ? "NULL" : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5 text-xs"
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-surface-2)",
          color: "var(--color-text-muted)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {result.values.length} row{result.values.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
