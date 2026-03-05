"use client";

import { useState } from "react";
import type { TableInfo } from "@/data/index";

interface SchemaViewerProps {
  tables: TableInfo[];
  isCollapsible?: boolean;
}

export default function SchemaViewer({ tables, isCollapsible = false }: SchemaViewerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(!isCollapsible);

  if (isCollapsible && !panelOpen) {
    return (
      <button
        onClick={() => setPanelOpen(true)}
        className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-ring"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-primary)",
        }}
      >
        Show Schema
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)" }}
        >
          Tables
        </h3>
        {isCollapsible && (
          <button
            onClick={() => setPanelOpen(false)}
            className="cursor-pointer rounded p-0.5 transition-colors hover:bg-white/5 focus-ring"
            aria-label="Hide schema"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
            </svg>
          </button>
        )}
      </div>
      {tables.map((table) => (
        <div key={table.name}>
          <button
            onClick={() =>
              setExpanded(expanded === table.name ? null : table.name)
            }
            className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-white/5 focus-ring"
          >
            <span
              className="text-xs transition-transform duration-150"
              style={{
                transform: expanded === table.name ? "rotate(90deg)" : "rotate(0deg)",
                color: "var(--color-text-muted)",
              }}
            >
              &#9654;
            </span>
            <span className="font-medium" style={{
              fontFamily: "var(--font-code)",
              color: "var(--color-primary)",
              fontSize: "13px",
            }}>
              {table.name}
            </span>
          </button>
          {expanded === table.name && (
            <div className="ml-6 flex flex-wrap gap-1 pb-2 pt-1">
              {table.columns.map((col) => (
                <span
                  key={col}
                  className="rounded px-2 py-0.5 text-xs"
                  style={{
                    fontFamily: "var(--font-code)",
                    background: "var(--color-surface-2)",
                    color: "var(--color-text-tertiary)",
                  }}
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
