"use client";

import { useState } from "react";
import type { MultipleChoiceQuestion } from "@/games/types";

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function MultipleChoice({ question, onAnswer }: Props) {
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
              <span className="mr-2 font-medium" style={{ fontFamily: "var(--font-code)", fontSize: "12px" }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

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
