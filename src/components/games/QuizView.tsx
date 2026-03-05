"use client";

import { useState, useCallback, useMemo } from "react";
import type { GameModule, Question } from "@/games/types";
import { gameModuleLabels, gameModuleOrder } from "@/games/types";
import { getQuestionsByModule } from "@/games/content";
import MultipleChoice from "./MultipleChoice";
import QueryOrder from "./QueryOrder";
import SpotTheBug from "./SpotTheBug";
import FillBlank from "./FillBlank";

const typeLabels: Record<string, string> = {
  "multiple-choice": "Multiple Choice",
  "query-order": "Build the Query",
  "spot-the-bug": "Spot the Bug",
  "fill-blank": "Fill in the Blank",
};

const typeIcons: Record<string, string> = {
  "multiple-choice": "A",
  "query-order": "#",
  "spot-the-bug": "!",
  "fill-blank": "_",
};

interface QuizViewProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function QuizView({ isSidebarOpen, onToggleSidebar }: QuizViewProps) {
  const [activeModule, setActiveModule] = useState<GameModule>(gameModuleOrder[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const moduleQuestions = useMemo(() => getQuestionsByModule(activeModule), [activeModule]);
  const currentQuestion = moduleQuestions[currentIndex] ?? null;
  const isComplete = currentIndex >= moduleQuestions.length;

  const handleAnswer = useCallback((correct: boolean) => {
    setQuestionAnswered(true);
    if (correct) setScore((s) => s + 1);
    setAnswered((a) => a + 1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
    setQuestionAnswered(false);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(0);
    setQuestionAnswered(false);
  }, []);

  const handleModuleChange = useCallback((mod: GameModule) => {
    setActiveModule(mod);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(0);
    setQuestionAnswered(false);
  }, []);

  const renderQuestion = (q: Question) => {
    // Use key to force remount on question change
    switch (q.type) {
      case "multiple-choice":
        return <MultipleChoice key={q.id} question={q} onAnswer={handleAnswer} />;
      case "query-order":
        return <QueryOrder key={q.id} question={q} onAnswer={handleAnswer} />;
      case "spot-the-bug":
        return <SpotTheBug key={q.id} question={q} onAnswer={handleAnswer} />;
      case "fill-blank":
        return <FillBlank key={q.id} question={q} onAnswer={handleAnswer} />;
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Module sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 overflow-y-auto
          transition-transform duration-200 ease-out
          lg:relative lg:z-auto lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "var(--color-surface-1)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-4 pt-3 lg:hidden">
          <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            Modules
          </span>
          <button
            onClick={onToggleSidebar}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-white/5 focus-ring"
            aria-label="Close quiz menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <div className="p-2">
          {gameModuleOrder.map((mod) => {
            const questions = getQuestionsByModule(mod);
            return (
              <button
                key={mod}
                onClick={() => {
                  handleModuleChange(mod);
                  onToggleSidebar();
                }}
                className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors focus-ring"
                style={{
                  background: activeModule === mod ? "var(--color-surface-3)" : "transparent",
                  color: activeModule === mod ? "var(--color-text)" : "var(--color-text-tertiary)",
                }}
              >
                <div className="text-sm font-medium">{gameModuleLabels[mod]}</div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {questions.length} questions
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <span>{gameModuleLabels[activeModule]}</span>
              <span>
                {Math.min(currentIndex + 1, moduleQuestions.length)} / {moduleQuestions.length}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full"
              style={{ background: "var(--color-border)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(Math.min(currentIndex + 1, moduleQuestions.length) / moduleQuestions.length) * 100}%`,
                  background: "var(--color-primary)",
                }}
              />
            </div>
          </div>

          {/* Score display */}
          {answered > 0 && (
            <div className="mb-4 flex items-center gap-4 text-sm"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <span>
                Score: <span style={{ color: "var(--color-success)" }}>{score}</span> / {answered}
              </span>
              <span>
                {answered > 0 ? Math.round((score / answered) * 100) : 0}%
              </span>
            </div>
          )}

          {/* Question content */}
          {isComplete ? (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="text-4xl"
                style={{
                  fontFamily: "var(--font-code)",
                  color: score === moduleQuestions.length ? "var(--color-success)" : "var(--color-primary)",
                }}
              >
                {score} / {moduleQuestions.length}
              </div>
              <p className="text-lg font-medium" style={{ color: "var(--color-text)" }}>
                {score === moduleQuestions.length
                  ? "Perfect score!"
                  : score >= moduleQuestions.length * 0.7
                    ? "Solid work."
                    : "Keep practicing."}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                {gameModuleLabels[activeModule]} complete
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors focus-ring"
                  style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Retry
                </button>
                {activeModule !== gameModuleOrder[gameModuleOrder.length - 1] && (
                  <button
                    onClick={() => {
                      const nextIdx = gameModuleOrder.indexOf(activeModule) + 1;
                      if (nextIdx < gameModuleOrder.length) {
                        handleModuleChange(gameModuleOrder[nextIdx]);
                      }
                    }}
                    className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors focus-ring"
                    style={{
                      background: "var(--color-primary)",
                      color: "var(--color-background)",
                    }}
                  >
                    Next Module
                  </button>
                )}
              </div>
            </div>
          ) : currentQuestion ? (
            <div>
              {/* Question type badge */}
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-code)",
                    background: "var(--color-surface-3)",
                    color: "var(--color-primary)",
                  }}
                >
                  {typeIcons[currentQuestion.type]}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                  {typeLabels[currentQuestion.type]}
                </span>
              </div>

              {renderQuestion(currentQuestion)}

              {/* Next button */}
              {questionAnswered && (
                <div className="mt-6">
                  <button
                    onClick={handleNext}
                    className="cursor-pointer rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-ring"
                    style={{
                      background: "var(--color-primary)",
                      color: "var(--color-background)",
                    }}
                  >
                    {currentIndex < moduleQuestions.length - 1 ? "Next" : "See results"}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
