"use client";

import { useState } from "react";
import type { TableInfo } from "@/data/index";

interface SchemaViewerProps {
  tables: TableInfo[];
}

export default function SchemaViewer({ tables }: SchemaViewerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Tables
      </h3>
      {tables.map((table) => (
        <div key={table.name}>
          <button
            onClick={() =>
              setExpanded(expanded === table.name ? null : table.name)
            }
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-zinc-800"
          >
            <span
              className={`text-xs transition-transform ${expanded === table.name ? "rotate-90" : ""}`}
            >
              &#9654;
            </span>
            <span className="font-mono font-medium text-emerald-400">
              {table.name}
            </span>
            <span className="text-xs text-zinc-600">
              {table.description}
            </span>
          </button>
          {expanded === table.name && (
            <div className="ml-6 flex flex-wrap gap-1 pb-2 pt-1">
              {table.columns.map((col) => (
                <span
                  key={col}
                  className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400"
                >
                  {col}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
