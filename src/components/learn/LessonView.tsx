"use client";

import { useState, useCallback } from "react";
import type { Lesson } from "@/lessons/types";
import { moduleLabels, moduleOrder } from "@/lessons/types";
import { getLessonsByModule } from "@/lessons/content";
import SqlEditor from "@/components/editor/SqlEditor";
import ResultsTable from "@/components/results/ResultsTable";
import { executeQuery, type QueryResult, type QueryError } from "@/engine/sql";

interface LessonViewProps {
  dbReady: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function LessonView({ dbReady, isSidebarOpen, onToggleSidebar }: LessonViewProps) {
  const [activeModule, setActiveModule] = useState(moduleOrder[0]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<QueryResult | QueryError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const moduleLessons = getLessonsByModule(activeModule);
  const activeLesson = activeLessonId
    ? moduleLessons.find((l) => l.id === activeLessonId) ?? moduleLessons[0]
    : moduleLessons[0];

  const handleRun = useCallback(async () => {
    if (!sql.trim() || !dbReady) return;
    setIsLoading(true);
    const res = await executeQuery(sql);
    setResult(res);
    setIsLoading(false);
  }, [sql, dbReady]);

  const loadExample = useCallback((query: string) => {
    setSql(query);
    setResult(null);
  }, []);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Lesson sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 overflow-y-auto
          transition-transform duration-200 ease-out
          lg:relative lg:z-auto lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ background: "var(--color-surface-1)", borderRight: "1px solid var(--color-border)" }}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-4 pt-3 lg:hidden">
          <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            Lessons
          </span>
          <button
            onClick={onToggleSidebar}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-white/5 focus-ring"
            aria-label="Close lessons"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {moduleOrder.map((mod) => {
          const lessons = getLessonsByModule(mod);
          return (
            <div key={mod}>
              <button
                onClick={() => {
                  setActiveModule(mod);
                  setActiveLessonId(lessons[0]?.id ?? null);
                  setSql("");
                  setResult(null);
                }}
                className="w-full cursor-pointer px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors focus-ring"
                style={{
                  background: activeModule === mod ? "var(--color-surface-2)" : "transparent",
                  color: activeModule === mod ? "var(--color-primary)" : "var(--color-text-muted)",
                }}
              >
                {moduleLabels[mod]}
              </button>
              {activeModule === mod &&
                lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setSql("");
                      setResult(null);
                      onToggleSidebar();
                    }}
                    className="w-full cursor-pointer px-6 py-1.5 text-left text-sm transition-colors focus-ring"
                    style={{
                      background: activeLesson?.id === lesson.id ? "rgba(6, 182, 212, 0.08)" : "transparent",
                      color: activeLesson?.id === lesson.id ? "var(--color-primary)" : "var(--color-text-tertiary)",
                    }}
                  >
                    {lesson.title}
                  </button>
                ))}
            </div>
          );
        })}
      </div>

      {/* Lesson content */}
      {activeLesson && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              {activeLesson.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {activeLesson.explanation}
            </p>

            {/* Syntax block */}
            <div className="mt-4 rounded-lg p-4"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
              }}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Syntax
              </p>
              <pre className="whitespace-pre-wrap text-sm"
                style={{
                  fontFamily: "var(--font-code)",
                  color: "var(--color-primary)",
                }}
              >
                {activeLesson.syntax}
              </pre>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                Examples (click to load)
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {activeLesson.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(ex.query)}
                    className="group cursor-pointer rounded-lg px-4 py-3 text-left transition-colors focus-ring"
                    style={{
                      border: "1px solid var(--color-border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-primary)";
                      e.currentTarget.style.background = "rgba(6, 182, 212, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {ex.description}
                    </p>
                    <pre className="mt-1 whitespace-pre-wrap text-xs"
                      style={{
                        fontFamily: "var(--font-code)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {ex.query}
                    </pre>
                  </button>
                ))}
              </div>
            </div>

            {/* Try It */}
            <div className="mt-4 rounded-lg px-4 py-3"
              style={{
                border: "1px dashed var(--color-border-strong)",
                background: "var(--color-surface-1)",
              }}
            >
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <span className="font-medium" style={{ color: "var(--color-text)" }}>Try it: </span>
                {activeLesson.tryIt}
              </p>
            </div>

            <div className="mt-4">
              <SqlEditor value={sql} onChange={setSql} onRun={handleRun} />
            </div>

            <div className="mt-4">
              <ResultsTable result={result} isLoading={isLoading} />
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between pt-4"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <NavButton
                direction="prev"
                currentLesson={activeLesson}
                allLessons={moduleLessons}
                onNavigate={(id) => {
                  setActiveLessonId(id);
                  setSql("");
                  setResult(null);
                }}
              />
              <NavButton
                direction="next"
                currentLesson={activeLesson}
                allLessons={moduleLessons}
                onNavigate={(id) => {
                  setActiveLessonId(id);
                  setSql("");
                  setResult(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({
  direction,
  currentLesson,
  allLessons,
  onNavigate,
}: {
  direction: "prev" | "next";
  currentLesson: Lesson;
  allLessons: Lesson[];
  onNavigate: (id: string) => void;
}) {
  const idx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const target = direction === "prev" ? allLessons[idx - 1] : allLessons[idx + 1];

  if (!target) return <div />;

  return (
    <button
      onClick={() => onNavigate(target.id)}
      className="cursor-pointer text-sm transition-colors focus-ring"
      style={{ color: "var(--color-text-muted)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-text-muted)";
      }}
    >
      {direction === "prev" ? "< " : ""}
      {target.title}
      {direction === "next" ? " >" : ""}
    </button>
  );
}
