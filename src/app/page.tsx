"use client";

import { useState, useCallback, useEffect } from "react";
import type { Industry, Tier } from "@/challenges/types";
import { getChallengesByTier, getChallenge, getAvailableTiers } from "@/challenges/index";
import { industryData } from "@/data/index";
import { initIndustryDb, executeQuery } from "@/engine/sql";
import { validateQuery } from "@/engine/validate";
import type { QueryResult, QueryError } from "@/engine/sql";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { ChallengeDetail } from "@/components/challenge/ChallengeCard";
import SchemaViewer from "@/components/schema/SchemaViewer";
import Sidebar from "@/components/layout/Sidebar";
import LessonView from "@/components/learn/LessonView";
import QuizView from "@/components/games/QuizView";
import CheatSheet from "@/components/reference/CheatSheet";
import StatsBar from "@/components/layout/StatsBar";
import { useProgress } from "@/hooks/useProgress";

type AppMode = "learn" | "quiz" | "practice" | "sandbox";

export default function Home() {
  const [mode, setMode] = useState<AppMode>("learn");
  const [industry, setIndustry] = useState<Industry>("healthcare");
  const [tier, setTier] = useState<Tier>(1);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<QueryResult | QueryError | null>(null);
  const [expectedResult, setExpectedResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [validationStatus, setValidationStatus] = useState<"correct" | "wrong" | "error" | null>(null);
  const [showExpected, setShowExpected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [learnSidebarOpen, setLearnSidebarOpen] = useState(false);
  const [quizSidebarOpen, setQuizSidebarOpen] = useState(false);

  // Sandbox state
  const [sandboxSql, setSandboxSql] = useState("");
  const [sandboxResult, setSandboxResult] = useState<QueryResult | QueryError | null>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxIndustry, setSandboxIndustry] = useState<Industry>("healthcare");

  const progress = useProgress();
  const { completedIds, markComplete, xp, streak, level, recordQuizAnswer, breakStreak } = progress;

  const challenges = getChallengesByTier(industry, tier);
  const availableTiers = getAvailableTiers(industry);
  const activeChallenge = activeChallengeId
    ? getChallenge(industry, activeChallengeId) ?? null
    : null;

  const data = industryData[industry];
  const sandboxData = industryData[sandboxIndustry];

  // Initialize DB when industry changes (practice/learn use main industry, sandbox uses its own)
  const activeIndustry = mode === "sandbox" ? sandboxIndustry : industry;
  const activeData = mode === "sandbox" ? sandboxData : data;

  useEffect(() => {
    if (mode === "quiz") return; // quiz doesn't need DB
    setDbReady(false);
    const setupSql = activeData.schema + "\n" + activeData.seed();
    initIndustryDb(setupSql).then(() => setDbReady(true));
  }, [activeIndustry, activeData, mode]);

  // Select first challenge when tier/industry changes
  useEffect(() => {
    const chs = getChallengesByTier(industry, tier);
    if (chs.length > 0) {
      setActiveChallengeId(chs[0].id);
    } else {
      setActiveChallengeId(null);
    }
  }, [industry, tier]);

  // Reset state when challenge changes
  useEffect(() => {
    setSql("");
    setResult(null);
    setExpectedResult(null);
    setHintLevel(0);
    setValidationStatus(null);
    setShowExpected(false);
  }, [activeChallengeId]);

  const handleIndustryChange = useCallback((ind: Industry) => {
    setIndustry(ind);
    setTier(1);
  }, []);

  const handleRun = useCallback(async () => {
    if (!sql.trim() || !dbReady || !activeChallenge) return;
    setIsLoading(true);
    setShowExpected(false);

    const validation = await validateQuery(sql, activeChallenge);
    setResult(validation.userResult);
    setExpectedResult(validation.expectedResult);
    setValidationStatus(validation.status);

    if (validation.status === "correct") {
      markComplete(activeChallenge.id);
    } else if (validation.status === "wrong") {
      setShowExpected(true);
      breakStreak();
    }

    setIsLoading(false);
  }, [sql, dbReady, activeChallenge, markComplete, breakStreak]);

  const handleSandboxRun = useCallback(async () => {
    if (!sandboxSql.trim() || !dbReady) return;
    setSandboxLoading(true);
    const res = await executeQuery(sandboxSql);
    setSandboxResult(res);
    setSandboxLoading(false);
  }, [sandboxSql, dbReady]);

  const modeButtons: { key: AppMode; label: string }[] = [
    { key: "learn", label: "Learn" },
    { key: "quiz", label: "Quiz" },
    { key: "practice", label: "Practice" },
    { key: "sandbox", label: "Sandbox" },
  ];

  return (
    <div className="flex h-screen flex-col" style={{ background: "var(--color-background)", color: "var(--color-text)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 md:px-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile menu button */}
          {(mode === "practice" || mode === "learn" || mode === "quiz") && (
            <button
              onClick={() => {
                if (mode === "practice") setSidebarOpen(true);
                else if (mode === "learn") setLearnSidebarOpen(true);
                else if (mode === "quiz") setQuizSidebarOpen(true);
              }}
              className="cursor-pointer rounded p-1 transition-colors hover:bg-white/5 lg:hidden focus-ring"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
          )}

          <h1 className="text-base font-bold tracking-tight md:text-lg"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            SQL<span style={{ color: "var(--color-primary)" }}>Bot</span>
          </h1>

          <nav className="flex gap-0.5 rounded-lg p-0.5"
            style={{ background: "var(--color-surface-1)" }}
          >
            {modeButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className="cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors md:px-3 md:text-sm focus-ring"
                style={{
                  background: mode === key ? "var(--color-surface-3)" : "transparent",
                  color: mode === key ? "var(--color-text)" : "var(--color-text-muted)",
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* XP & Streak display */}
          <StatsBar xp={xp} streak={streak} level={level} />

          {/* Industry selector for practice mode */}
          {mode === "practice" && (
            <select
              value={industry}
              onChange={(e) => handleIndustryChange(e.target.value as Industry)}
              className="hidden cursor-pointer rounded-md px-2 py-1 text-sm outline-none md:block focus-ring"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              {Object.keys(industryData).map((ind) => (
                <option key={ind} value={ind}>
                  {ind.charAt(0).toUpperCase() + ind.slice(1)}
                </option>
              ))}
            </select>
          )}

          {/* Sandbox industry selector */}
          {mode === "sandbox" && (
            <select
              value={sandboxIndustry}
              onChange={(e) => {
                setSandboxIndustry(e.target.value as Industry);
                setSandboxResult(null);
              }}
              className="cursor-pointer rounded-md px-2 py-1 text-sm outline-none focus-ring"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              {Object.keys(industryData).map((ind) => (
                <option key={ind} value={ind}>
                  {ind.charAt(0).toUpperCase() + ind.slice(1)}
                </option>
              ))}
            </select>
          )}

          {/* Cheat sheet toggle */}
          <button
            onClick={() => setCheatSheetOpen(!cheatSheetOpen)}
            className="cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors md:px-2.5 md:text-sm focus-ring"
            style={{
              border: `1px solid ${cheatSheetOpen ? "var(--color-primary)" : "var(--color-border)"}`,
              color: cheatSheetOpen ? "var(--color-primary)" : "var(--color-text-tertiary)",
              background: cheatSheetOpen ? "rgba(6, 182, 212, 0.08)" : "transparent",
            }}
            title="SQL Reference"
          >
            <span className="hidden md:inline">Reference</span>
            <span className="md:hidden">Ref</span>
          </button>

          {/* DB status — only relevant for modes that use the database */}
          {(mode === "learn" || mode === "practice" || mode === "sandbox") && !dbReady && (
            <span className="text-xs animate-pulse" style={{ color: "var(--color-warning)" }}>Loading DB...</span>
          )}
        </div>
      </header>

      {/* Learn mode */}
      {mode === "learn" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            <LessonView
              dbReady={dbReady}
              isSidebarOpen={learnSidebarOpen}
              onToggleSidebar={() => setLearnSidebarOpen(false)}
            />
            <div className="hidden w-56 flex-shrink-0 overflow-y-auto p-4 lg:block"
              style={{ borderLeft: "1px solid var(--color-border)" }}
            >
              <SchemaViewer tables={data.tables} />
            </div>
          </div>
          {cheatSheetOpen && (
            <CheatSheet isOpen={cheatSheetOpen} onClose={() => setCheatSheetOpen(false)} />
          )}
        </div>
      )}

      {/* Quiz mode */}
      {mode === "quiz" && (
        <div className="flex flex-1 overflow-hidden">
          <QuizView
            isSidebarOpen={quizSidebarOpen}
            onToggleSidebar={() => setQuizSidebarOpen(false)}
            onAnswer={recordQuizAnswer}
            onWrong={breakStreak}
            streak={streak}
            xp={xp}
          />
          {cheatSheetOpen && (
            <CheatSheet isOpen={cheatSheetOpen} onClose={() => setCheatSheetOpen(false)} />
          )}
        </div>
      )}

      {/* Practice mode */}
      {mode === "practice" && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            currentIndustry={industry}
            currentTier={tier}
            challenges={challenges}
            activeChallengeId={activeChallengeId}
            completedIds={completedIds}
            availableTiers={availableTiers.length > 0 ? availableTiers : [1]}
            onSelectIndustry={handleIndustryChange}
            onSelectTier={setTier}
            onSelectChallenge={setActiveChallengeId}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6">
              {activeChallenge ? (
                <>
                  <ChallengeDetail
                    challenge={activeChallenge}
                    hintLevel={hintLevel}
                    onHint={() => setHintLevel((h) => Math.min(h + 1, 3))}
                    validationResult={validationStatus}
                  />

                  <div className="mt-4">
                    <SqlEditor value={sql} onChange={setSql} onRun={handleRun} />
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-sm font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                        Your Results
                      </h3>
                      {showExpected && expectedResult && (
                        <button
                          onClick={() => setShowExpected((s) => !s)}
                          className="cursor-pointer text-xs transition-colors"
                          style={{ color: "var(--color-warning)" }}
                        >
                          {showExpected ? "Hide expected" : "Show expected"}
                        </button>
                      )}
                    </div>
                    <ResultsTable result={result} isLoading={isLoading} />
                  </div>

                  {showExpected && expectedResult && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-sm font-medium" style={{ color: "var(--color-warning)" }}>
                        Expected Results
                      </h3>
                      <ResultsTable result={expectedResult} isLoading={false} />
                    </div>
                  )}

                  {/* Mobile schema toggle */}
                  <div className="mt-4 lg:hidden">
                    <SchemaViewer tables={data.tables} isCollapsible />
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p style={{ color: "var(--color-text-muted)" }}>
                    Pick a challenge to begin
                  </p>
                </div>
              )}
            </div>

            {/* Desktop schema panel */}
            <div className="hidden w-56 overflow-y-auto p-4 lg:block"
              style={{ borderLeft: "1px solid var(--color-border)" }}
            >
              <SchemaViewer tables={data.tables} />
            </div>
          </div>

          {cheatSheetOpen && (
            <CheatSheet isOpen={cheatSheetOpen} onClose={() => setCheatSheetOpen(false)} />
          )}
        </div>
      )}

      {/* Sandbox mode */}
      {mode === "sandbox" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6">
            <div className="mx-auto w-full max-w-4xl">
              <div className="mb-4">
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
                  SQL Sandbox
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  Run any query against the {sandboxIndustry} dataset. No rules, no validation.
                </p>
              </div>

              <SqlEditor value={sandboxSql} onChange={setSandboxSql} onRun={handleSandboxRun} />

              <div className="mt-4">
                <ResultsTable result={sandboxResult} isLoading={sandboxLoading} />
              </div>

              {/* Mobile schema toggle */}
              <div className="mt-4 lg:hidden">
                <SchemaViewer tables={sandboxData.tables} isCollapsible />
              </div>
            </div>
          </div>

          {/* Desktop schema panel */}
          <div className="hidden w-56 flex-shrink-0 overflow-y-auto p-4 lg:block"
            style={{ borderLeft: "1px solid var(--color-border)" }}
          >
            <SchemaViewer tables={sandboxData.tables} />
          </div>

          {cheatSheetOpen && (
            <CheatSheet isOpen={cheatSheetOpen} onClose={() => setCheatSheetOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}
