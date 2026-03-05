"use client";

import { useState, useCallback, useEffect } from "react";
import type { Industry, Tier } from "@/challenges/types";
import { getChallengesByTier, getChallenge, getAvailableTiers } from "@/challenges/index";
import { industryData } from "@/data/index";
import { initIndustryDb } from "@/engine/sql";
import { validateQuery } from "@/engine/validate";
import type { QueryResult, QueryError } from "@/engine/sql";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { ChallengeDetail } from "@/components/challenge/ChallengeCard";
import SchemaViewer from "@/components/schema/SchemaViewer";
import Sidebar from "@/components/layout/Sidebar";
import LessonView from "@/components/learn/LessonView";
import { useProgress } from "@/hooks/useProgress";

type AppMode = "learn" | "practice";

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

  const { completedIds, markComplete } = useProgress();

  const challenges = getChallengesByTier(industry, tier);
  const availableTiers = getAvailableTiers(industry);
  const activeChallenge = activeChallengeId
    ? getChallenge(industry, activeChallengeId) ?? null
    : null;

  const data = industryData[industry];

  // Initialize DB when industry changes
  useEffect(() => {
    setDbReady(false);
    const setupSql = data.schema + "\n" + data.seed();
    initIndustryDb(setupSql).then(() => setDbReady(true));
  }, [industry, data]);

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
    }

    if (validation.status === "wrong") {
      setShowExpected(true);
    }

    setIsLoading(false);
  }, [sql, dbReady, activeChallenge, markComplete]);

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold tracking-tight">SQL Dojo</h1>
          <nav className="flex gap-1 rounded-lg bg-zinc-900 p-0.5">
            <button
              onClick={() => setMode("learn")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                mode === "learn"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setMode("practice")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                mode === "practice"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Practice
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {mode === "practice" && (
            <select
              value={industry}
              onChange={(e) => handleIndustryChange(e.target.value as Industry)}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm text-zinc-300 outline-none focus:border-emerald-600"
            >
              {Object.keys(industryData).map((ind) => (
                <option key={ind} value={ind}>
                  {ind.charAt(0).toUpperCase() + ind.slice(1)}
                </option>
              ))}
            </select>
          )}
          {!dbReady ? (
            <span className="text-xs text-amber-400">Loading database...</span>
          ) : (
            <span className="text-xs text-emerald-500">DB ready</span>
          )}
        </div>
      </header>

      {/* Learn mode */}
      {mode === "learn" && (
        <div className="flex flex-1 overflow-hidden">
          <LessonView dbReady={dbReady} />
          <div className="w-56 flex-shrink-0 overflow-y-auto border-l border-zinc-800 p-4">
            <SchemaViewer tables={data.tables} />
          </div>
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
          />

          <div className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-medium text-zinc-400">
                        Your Results
                      </h3>
                      {showExpected && expectedResult && (
                        <button
                          onClick={() => setShowExpected((s) => !s)}
                          className="text-xs text-amber-400 hover:text-amber-300"
                        >
                          {showExpected ? "Show expected" : "Hide expected"}
                        </button>
                      )}
                    </div>
                    <ResultsTable result={result} isLoading={isLoading} />
                  </div>

                  {showExpected && expectedResult && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-sm font-medium text-amber-400">
                        Expected Results
                      </h3>
                      <ResultsTable result={expectedResult} isLoading={false} />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-zinc-600">
                    Select a challenge to get started
                  </p>
                </div>
              )}
            </div>

            <div className="w-56 overflow-y-auto border-l border-zinc-800 p-4">
              <SchemaViewer tables={data.tables} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
