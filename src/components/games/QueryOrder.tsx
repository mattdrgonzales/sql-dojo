"use client";

import { useState } from "react";
import type { QueryOrderQuestion } from "@/games/types";

interface Props {
  question: QueryOrderQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function QueryOrder({ question, onAnswer }: Props) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const remaining = question.clauses
    .map((_, i) => i)
    .filter((i) => !placed.includes(i));

  const handlePlace = (clauseIndex: number) => {
    if (revealed) return;
    const next = [...placed, clauseIndex];
    setPlaced(next);

    if (next.length === question.clauses.length) {
      const correct = next.every((ci, pos) => ci === question.correctOrder[pos]);
      setIsCorrect(correct);
      setRevealed(true);
      onAnswer(correct);
    }
  };

  const handleUnplace = (posIndex: number) => {
    if (revealed) return;
    setPlaced(placed.filter((_, i) => i !== posIndex));
  };

  const handleReset = () => {
    if (revealed) return;
    setPlaced([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
        {question.question}
      </p>

      {/* Placed clauses (the query being built) */}
      <div className="min-h-[64px] rounded-lg p-3"
        style={{
          border: `1px dashed ${revealed
            ? isCorrect ? "var(--color-success)" : "var(--color-error)"
            : "var(--color-border-strong)"}`,
          background: "var(--color-surface-2)",
        }}
      >
        {placed.length === 0 ? (
          <p className="text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
            Select clauses to build the query
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {placed.map((clauseIndex, posIndex) => (
              <button
                key={posIndex}
                onClick={() => handleUnplace(posIndex)}
                disabled={revealed}
                className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-colors focus-ring"
                style={{
                  fontFamily: "var(--font-code)",
                  background: revealed
                    ? clauseIndex === question.correctOrder[posIndex]
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)"
                    : "var(--color-surface-3)",
                  border: `1px solid ${revealed
                    ? clauseIndex === question.correctOrder[posIndex]
                      ? "var(--color-success)"
                      : "var(--color-error)"
                    : "var(--color-border)"}`,
                  color: "var(--color-text)",
                  fontSize: "13px",
                }}
              >
                {question.clauses[clauseIndex]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available clauses */}
      {!revealed && (
        <div className="flex flex-wrap gap-2">
          {remaining.map((clauseIndex) => (
            <button
              key={clauseIndex}
              onClick={() => handlePlace(clauseIndex)}
              className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-colors focus-ring"
              style={{
                fontFamily: "var(--font-code)",
                border: "1px solid var(--color-primary)",
                background: "rgba(6, 182, 212, 0.08)",
                color: "var(--color-primary)",
                fontSize: "13px",
              }}
            >
              {question.clauses[clauseIndex]}
            </button>
          ))}
        </div>
      )}

      {/* Reset button */}
      {!revealed && placed.length > 0 && (
        <button
          onClick={handleReset}
          className="cursor-pointer self-start text-xs transition-colors"
          style={{ color: "var(--color-text-muted)" }}
        >
          Reset
        </button>
      )}

      {revealed && (
        <div className="rounded-lg px-4 py-3 text-sm leading-relaxed"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--color-surface-2)",
            color: "var(--color-text-secondary)",
          }}
        >
          {question.explanation}
        </div>
      )}
    </div>
  );
}
