"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sql-dojo-progress";

interface ProgressData {
  completed: string[];
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [] };
    return JSON.parse(raw);
  } catch {
    return { completed: [] };
  }
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const data = loadProgress();
    setCompletedIds(new Set(data.completed));
  }, []);

  const markComplete = useCallback((challengeId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(challengeId);
      saveProgress({ completed: [...next] });
      return next;
    });
  }, []);

  return { completedIds, markComplete };
}
