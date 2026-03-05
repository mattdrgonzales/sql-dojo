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
      <div className="flex h-32 items-center justify-center text-zinc-500">
        Running query...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-32 items-center justify-center text-zinc-500">
        Run a query to see results
      </div>
    );
  }

  if (isError(result)) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/50 p-4">
        <p className="text-sm font-medium text-red-400">Error</p>
        <p className="mt-1 font-mono text-sm text-red-300">{result.message}</p>
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-zinc-500">
        Query returned no results
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg border border-zinc-700">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            {result.columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap px-3 py-2 font-medium text-zinc-300"
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
              className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="whitespace-nowrap px-3 py-1.5 font-mono text-xs text-zinc-300"
                >
                  {cell === null ? (
                    <span className="text-zinc-600">NULL</span>
                  ) : (
                    String(cell)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-500">
        {result.values.length} row{result.values.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
