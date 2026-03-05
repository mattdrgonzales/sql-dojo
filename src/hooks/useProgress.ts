"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sqlbot-progress";

interface ProgressData {
  completed: string[];
  xp: number;
  streak: number;
  bestStreak: number;
  quizScores: Record<string, { correct: number; total: number }>;
  lastActiveDate: string | null;
}

const XP_PRACTICE_CORRECT = 25;
const XP_QUIZ_CORRECT = 10;
const XP_STREAK_BONUS = 5; // extra per streak step

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultProgress(): ProgressData {
  return {
    completed: [],
    xp: 0,
    streak: 0,
    bestStreak: 0,
    quizScores: {},
    lastActiveDate: null,
  };
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getLevel(xp: number): { level: number; title: string; xpForNext: number; xpInLevel: number } {
  const levels = [
    { threshold: 0, title: "Rookie" },
    { threshold: 100, title: "Apprentice" },
    { threshold: 300, title: "Query Builder" },
    { threshold: 600, title: "Data Wrangler" },
    { threshold: 1000, title: "SQL Pro" },
    { threshold: 1500, title: "Database Wizard" },
    { threshold: 2500, title: "Query Master" },
    { threshold: 4000, title: "SQL Legend" },
  ];

  let current = levels[0];
  let nextThreshold = levels[1]?.threshold ?? Infinity;

  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].threshold) {
      current = levels[i];
      nextThreshold = levels[i + 1]?.threshold ?? Infinity;
      break;
    }
  }

  const levelIndex = levels.indexOf(current);
  return {
    level: levelIndex + 1,
    title: current.title,
    xpForNext: nextThreshold === Infinity ? 0 : nextThreshold - current.threshold,
    xpInLevel: nextThreshold === Infinity ? 0 : xp - current.threshold,
  };
}

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, { correct: number; total: number }>>({});

  useEffect(() => {
    const data = loadProgress();
    setCompletedIds(new Set(data.completed));
    setXp(data.xp);
    setStreak(data.streak);
    setBestStreak(data.bestStreak);
    setQuizScores(data.quizScores);
  }, []);

  const persist = useCallback((updates: Partial<ProgressData> & { completed?: string[] }) => {
    const current = loadProgress();
    const merged = { ...current, ...updates };
    saveProgress(merged);
  }, []);

  const markComplete = useCallback((challengeId: string) => {
    setCompletedIds((prev) => {
      if (prev.has(challengeId)) return prev; // no double XP
      const next = new Set(prev);
      next.add(challengeId);

      const earned = XP_PRACTICE_CORRECT + (streak * XP_STREAK_BONUS);
      const newXp = xp + earned;
      const newStreak = streak + 1;
      const newBest = Math.max(bestStreak, newStreak);

      setXp(newXp);
      setStreak(newStreak);
      setBestStreak(newBest);

      persist({
        completed: [...next],
        xp: newXp,
        streak: newStreak,
        bestStreak: newBest,
        lastActiveDate: todayKey(),
      });

      return next;
    });
  }, [xp, streak, bestStreak, persist]);

  const recordQuizAnswer = useCallback((moduleId: string, correct: boolean) => {
    const earned = correct ? XP_QUIZ_CORRECT + (streak * XP_STREAK_BONUS) : 0;
    const newXp = xp + earned;
    const newStreak = correct ? streak + 1 : 0;
    const newBest = Math.max(bestStreak, newStreak);

    setXp(newXp);
    setStreak(newStreak);
    setBestStreak(newBest);

    setQuizScores((prev) => {
      const existing = prev[moduleId] ?? { correct: 0, total: 0 };
      const updated = {
        ...prev,
        [moduleId]: {
          correct: existing.correct + (correct ? 1 : 0),
          total: existing.total + 1,
        },
      };
      setQuizScores(updated);

      persist({
        xp: newXp,
        streak: newStreak,
        bestStreak: newBest,
        quizScores: updated,
        lastActiveDate: todayKey(),
      });

      return updated;
    });
  }, [xp, streak, bestStreak, persist]);

  const breakStreak = useCallback(() => {
    setStreak(0);
    persist({ streak: 0 });
  }, [persist]);

  return {
    completedIds,
    xp,
    streak,
    bestStreak,
    quizScores,
    markComplete,
    recordQuizAnswer,
    breakStreak,
    level: getLevel(xp),
  };
}
