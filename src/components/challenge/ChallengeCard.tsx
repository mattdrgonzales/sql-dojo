"use client";

import type { Challenge } from "@/challenges/types";

interface ChallengeCardProps {
  challenge: Challenge;
  isComplete: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function ChallengeCard({
  challenge,
  isComplete,
  isActive,
  onSelect,
}: ChallengeCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full cursor-pointer rounded-lg px-3 py-2 text-left transition-colors focus-ring"
      style={{
        border: `1px solid ${isActive ? "var(--color-primary)" : "var(--color-border)"}`,
        background: isActive
          ? "rgba(6, 182, 212, 0.08)"
          : isComplete
            ? "rgba(34, 197, 94, 0.04)"
            : "transparent",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {isComplete ? (
            <span style={{ color: "var(--color-success)" }}>&#10003;</span>
          ) : (
            <span style={{ color: "var(--color-text-muted)" }}>&#9675;</span>
          )}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: isActive ? "var(--color-primary)" : "var(--color-text)" }}
        >
          {challenge.title}
        </span>
      </div>
      <div className="ml-6 mt-0.5 flex flex-wrap gap-1">
        {challenge.concepts.map((c) => (
          <span
            key={c}
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{
              background: "var(--color-surface-2)",
              color: "var(--color-text-muted)",
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </button>
  );
}

interface ChallengeDetailProps {
  challenge: Challenge;
  hintLevel: number;
  onHint: () => void;
  validationResult: "correct" | "wrong" | "error" | null;
}

export function ChallengeDetail({
  challenge,
  hintLevel,
  onHint,
  validationResult,
}: ChallengeDetailProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          {challenge.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {challenge.businessQuestion}
        </p>
      </div>

      {validationResult && (
        <div
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            border: `1px solid ${
              validationResult === "correct"
                ? "var(--color-success)"
                : validationResult === "wrong"
                  ? "var(--color-warning)"
                  : "var(--color-error)"
            }`,
            background:
              validationResult === "correct"
                ? "rgba(34, 197, 94, 0.1)"
                : validationResult === "wrong"
                  ? "rgba(245, 158, 11, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
            color:
              validationResult === "correct"
                ? "var(--color-success)"
                : validationResult === "wrong"
                  ? "var(--color-warning)"
                  : "var(--color-error)",
          }}
        >
          {validationResult === "correct"
            ? "Correct — query matches expected output."
            : validationResult === "wrong"
              ? "Not quite — compare your results with the expected output below."
              : "Query error — check syntax and try again."}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {hintLevel >= 1 && challenge.hint && (
          <div className="rounded px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-secondary)",
            }}
          >
            <span className="font-medium" style={{ color: "var(--color-text)" }}>Hint: </span>
            {challenge.hint}
          </div>
        )}
        {hintLevel >= 2 && challenge.syntaxHint && (
          <div className="rounded px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-code)",
            }}
          >
            <span className="font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
              Syntax:{" "}
            </span>
            {challenge.syntaxHint}
          </div>
        )}
        {hintLevel >= 3 && (
          <div className="rounded px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-code)",
            }}
          >
            <span className="font-medium" style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
              Solution:{" "}
            </span>
            {challenge.expectedQuery}
          </div>
        )}
      </div>

      {hintLevel < 3 && (
        <button
          onClick={onHint}
          className="cursor-pointer self-start rounded px-3 py-1 text-xs transition-colors focus-ring"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text-tertiary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border-strong)";
            e.currentTarget.style.color = "var(--color-text-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-tertiary)";
          }}
        >
          {hintLevel === 0
            ? "Show hint"
            : hintLevel === 1
              ? "Show syntax"
              : "Show solution"}
        </button>
      )}
    </div>
  );
}
