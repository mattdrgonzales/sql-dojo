"use client";

import type { Industry, Tier } from "@/challenges/types";
import { industries, tierLabels } from "@/challenges/types";
import type { Challenge } from "@/challenges/types";
import ChallengeCard from "@/components/challenge/ChallengeCard";

interface SidebarProps {
  currentIndustry: Industry;
  currentTier: Tier;
  challenges: Challenge[];
  activeChallengeId: string | null;
  completedIds: Set<string>;
  availableTiers: Tier[];
  onSelectIndustry: (industry: Industry) => void;
  onSelectTier: (tier: Tier) => void;
  onSelectChallenge: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  currentIndustry,
  currentTier,
  challenges,
  activeChallengeId,
  completedIds,
  availableTiers,
  onSelectIndustry,
  onSelectTier,
  onSelectChallenge,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          transition-transform duration-200 ease-out
          lg:relative lg:z-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "var(--color-surface-1)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between px-3 pt-3 lg:hidden">
          <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            Challenges
          </span>
          <button
            onClick={onClose}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-white/5 focus-ring"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {/* Industry selector */}
        <div className="p-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <select
            value={currentIndustry}
            onChange={(e) => onSelectIndustry(e.target.value as Industry)}
            className="w-full cursor-pointer rounded-md px-3 py-2 text-sm outline-none focus-ring"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {industries.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tier tabs */}
        <div className="flex gap-1 px-3 py-2" style={{ borderBottom: "1px solid var(--color-border)" }}>
          {availableTiers.map((t) => (
            <button
              key={t}
              onClick={() => onSelectTier(t)}
              className="cursor-pointer rounded px-2 py-1 text-xs font-medium transition-colors focus-ring"
              style={{
                background: t === currentTier ? "var(--color-primary)" : "transparent",
                color: t === currentTier ? "var(--color-background)" : "var(--color-text-tertiary)",
              }}
              onMouseEnter={(e) => {
                if (t !== currentTier) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (t !== currentTier) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-tertiary)";
                }
              }}
            >
              T{t}
            </button>
          ))}
        </div>

        {/* Tier label */}
        <div className="px-3 pt-3 pb-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-muted)" }}
          >
            Tier {currentTier} — {tierLabels[currentTier]}
          </p>
        </div>

        {/* Challenge list */}
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
          {challenges.length === 0 ? (
            <p className="py-4 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
              No challenges yet for this industry
            </p>
          ) : (
            challenges.map((ch) => (
              <ChallengeCard
                key={ch.id}
                challenge={ch}
                isActive={ch.id === activeChallengeId}
                isComplete={completedIds.has(ch.id)}
                onSelect={() => {
                  onSelectChallenge(ch.id);
                  onClose();
                }}
              />
            ))
          )}
        </div>

        {/* Progress */}
        <div className="px-3 py-2" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="flex items-center justify-between text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <span>
              {completedIds.size} / {challenges.length} complete
            </span>
            <span>
              {challenges.length > 0
                ? Math.round((completedIds.size / challenges.length) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full"
            style={{ background: "var(--color-border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${challenges.length > 0 ? (completedIds.size / challenges.length) * 100 : 0}%`,
                background: "var(--color-success)",
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
