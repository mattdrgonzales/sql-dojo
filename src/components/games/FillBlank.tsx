"use client";

import { useState } from "react";
import type { FillBlankQuestion } from "@/games/types";

interface Props {
  question: FillBlankQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function FillBlank({ question, onAnswer }: Props) {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (revealed || !input.trim()) return;
    const correct = question.acceptableAnswers.includes(input.trim());
    setIsCorrect(correct);
    setRevealed(true);
    onAnswer(correct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Split template at _____ to show before/after
  const parts = question.template.split("_____");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
        {question.question}
      </p>

      {/* Query template with input */}
      <div className="rounded-lg px-4 py-3"
        style={{
          border: "1px solid var(--color-border-strong)",
          background: "var(--color-surface-2)",
        }}
      >
        <div className="flex flex-wrap items-center gap-1 text-sm"
          style={{ fontFamily: "var(--font-code)" }}
        >
          <span style={{ color: "var(--color-text-secondary)" }}>{parts[0]}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={revealed}
            placeholder="?"
            autoFocus
            className="rounded px-2 py-1 text-center text-sm outline-none focus-ring"
            style={{
              fontFamily: "var(--font-code)",
              width: `${Math.max(question.answer.length + 2, 6)}ch`,
              minWidth: "60px",
              background: revealed
                ? isCorrect
                  ? "rgba(34, 197, 94, 0.15)"
                  : "rgba(239, 68, 68, 0.15)"
                : "var(--color-surface-3)",
              border: `1px solid ${revealed
                ? isCorrect ? "var(--color-success)" : "var(--color-error)"
                : "var(--color-primary)"}`,
              color: revealed
                ? isCorrect ? "var(--color-success)" : "var(--color-error)"
                : "var(--color-primary)",
            }}
          />
          <span style={{ color: "var(--color-text-secondary)" }}>{parts[1]}</span>
        </div>
      </div>

      {/* Submit button */}
      {!revealed && (
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="cursor-pointer self-start rounded-md px-4 py-2 text-sm font-medium transition-colors focus-ring"
          style={{
            background: input.trim() ? "var(--color-primary)" : "var(--color-surface-3)",
            color: input.trim() ? "var(--color-background)" : "var(--color-text-muted)",
          }}
        >
          Check
        </button>
      )}

      {/* Show correct answer if wrong */}
      {revealed && !isCorrect && (
        <div className="text-sm" style={{ color: "var(--color-warning)" }}>
          Answer: <span style={{ fontFamily: "var(--font-code)" }}>{question.answer}</span>
        </div>
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
