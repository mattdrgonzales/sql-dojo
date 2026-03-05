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
}

export default function LessonView({ dbReady }: LessonViewProps) {
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
      {/* Lesson sidebar */}
      <div className="w-64 flex-shrink-0 overflow-y-auto border-r border-zinc-800 bg-zinc-950">
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
                className={`w-full px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeModule === mod
                    ? "bg-zinc-900 text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
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
                    }}
                    className={`w-full px-6 py-1.5 text-left text-sm transition-colors ${
                      activeLesson?.id === lesson.id
                        ? "bg-zinc-800/50 text-emerald-300"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
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
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-zinc-100">
              {activeLesson.title}
            </h2>

            {/* Explanation */}
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {activeLesson.explanation}
            </p>

            {/* Syntax block */}
            <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Syntax
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm text-emerald-300">
                {activeLesson.syntax}
              </pre>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-zinc-300">
                Examples — click to load
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                {activeLesson.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(ex.query)}
                    className="group rounded-lg border border-zinc-800 px-4 py-3 text-left transition-colors hover:border-emerald-800 hover:bg-emerald-950/20"
                  >
                    <p className="text-sm text-zinc-300 group-hover:text-emerald-300">
                      {ex.description}
                    </p>
                    <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                      {ex.query}
                    </pre>
                  </button>
                ))}
              </div>
            </div>

            {/* Try It prompt */}
            <div className="mt-4 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 px-4 py-3">
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">Your turn: </span>
                {activeLesson.tryIt}
              </p>
            </div>

            {/* Editor */}
            <div className="mt-4">
              <SqlEditor value={sql} onChange={setSql} onRun={handleRun} />
            </div>

            {/* Results */}
            <div className="mt-4">
              <ResultsTable result={result} isLoading={isLoading} />
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between border-t border-zinc-800 pt-4">
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
      className="text-sm text-zinc-500 transition-colors hover:text-emerald-400"
    >
      {direction === "prev" ? "< " : ""}
      {target.title}
      {direction === "next" ? " >" : ""}
    </button>
  );
}
