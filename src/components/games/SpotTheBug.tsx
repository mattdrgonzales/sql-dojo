"use client";

import { useState } from "react";
import type { SpotTheBugQuestion } from "@/games/types";

interface Props {
  question: SpotTheBugQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function SpotTheBug({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    onAnswer(index === question.correctIndex);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
        {question.question}
      </p>

      {/* Buggy query display */}
      <div className="rounded-lg px-4 py-3"
        style={{
          border: "1px solid var(--color-error)",
          background: "rgba(239, 68, 68, 0.06)",
        }}
      >
        <pre className="whitespace-pre-wrap text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-code)",
            color: "var(--color-text)",
          }}
        >
          {question.buggyQuery}
        </pre>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {question.options.map((option, i) => {
          let borderColor = "var(--color-border)";
          let bg = "transparent";
          let textColor = "var(--color-text-secondary)";

          if (revealed) {
            if (i === question.correctIndex) {
              borderColor = "var(--color-success)";
              bg = "rgba(34, 197, 94, 0.1)";
              textColor = "var(--color-success)";
            } else if (i === selected && i !== question.correctIndex) {
              borderColor = "var(--color-error)";
              bg = "rgba(239, 68, 68, 0.1)";
              textColor = "var(--color-error)";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className="w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm transition-colors focus-ring"
              style={{
                border: `1px solid ${borderColor}`,
                background: bg,
                color: textColor,
                opacity: revealed && i !== selected && i !== question.correctIndex ? 0.5 : 1,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Fixed query + explanation */}
      {revealed && (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg px-4 py-3"
            style={{
              border: "1px solid var(--color-success)",
              background: "rgba(34, 197, 94, 0.06)",
            }}
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-success)" }}
            >
              Corrected
            </p>
            <pre className="whitespace-pre-wrap text-sm"
              style={{
                fontFamily: "var(--font-code)",
                color: "var(--color-text)",
              }}
            >
              {question.fixedQuery}
            </pre>
          </div>
          <div className="rounded-lg px-4 py-3 text-sm leading-relaxed"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-secondary)",
            }}
          >
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
