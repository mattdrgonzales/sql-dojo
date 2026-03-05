"use client";

import { useState } from "react";
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
      className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
        isActive
          ? "border-emerald-600 bg-emerald-950/30"
          : isComplete
            ? "border-zinc-700 bg-zinc-800/30"
            : "border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {isComplete ? (
            <span className="text-emerald-400">&#10003;</span>
          ) : (
            <span className="text-zinc-600">&#9675;</span>
          )}
        </span>
        <span
          className={`text-sm font-medium ${isActive ? "text-emerald-300" : "text-zinc-300"}`}
        >
          {challenge.title}
        </span>
      </div>
      <div className="ml-6 mt-0.5 flex gap-1">
        {challenge.concepts.map((c) => (
          <span
            key={c}
            className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500"
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
        <h2 className="text-lg font-semibold text-zinc-100">
          {challenge.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          {challenge.businessQuestion}
        </p>
      </div>

      {validationResult && (
        <div
          className={`rounded-lg border px-3 py-2 text-sm ${
            validationResult === "correct"
              ? "border-emerald-700 bg-emerald-950/40 text-emerald-300"
              : validationResult === "wrong"
                ? "border-amber-700 bg-amber-950/40 text-amber-300"
                : "border-red-700 bg-red-950/40 text-red-300"
          }`}
        >
          {validationResult === "correct"
            ? "Correct! Your query returns the expected results."
            : validationResult === "wrong"
              ? "Not quite. Check your results against the expected output."
              : "Query error. Check the syntax and try again."}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {hintLevel >= 1 && challenge.hint && (
          <div className="rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">Hint: </span>
            {challenge.hint}
          </div>
        )}
        {hintLevel >= 2 && challenge.syntaxHint && (
          <div className="rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-400">
            <span className="font-medium font-sans text-zinc-300">
              Syntax:{" "}
            </span>
            {challenge.syntaxHint}
          </div>
        )}
        {hintLevel >= 3 && (
          <div className="rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-400">
            <span className="font-medium font-sans text-zinc-300">
              Solution:{" "}
            </span>
            {challenge.expectedQuery}
          </div>
        )}
      </div>

      {hintLevel < 3 && (
        <button
          onClick={onHint}
          className="self-start rounded border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-300"
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
