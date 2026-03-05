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
}: SidebarProps) {
  const currentIndustryConfig = industries.find(
    (i) => i.id === currentIndustry
  )!;

  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Industry selector */}
      <div className="border-b border-zinc-800 p-3">
        <select
          value={currentIndustry}
          onChange={(e) => onSelectIndustry(e.target.value as Industry)}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-600"
        >
          {industries.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.icon} {ind.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tier tabs */}
      <div className="flex gap-1 border-b border-zinc-800 px-3 py-2">
        {availableTiers.map((tier) => (
          <button
            key={tier}
            onClick={() => onSelectTier(tier)}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              tier === currentTier
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            T{tier}
          </button>
        ))}
      </div>

      {/* Tier label */}
      <div className="px-3 pt-3 pb-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Tier {currentTier} — {tierLabels[currentTier]}
        </p>
      </div>

      {/* Challenge list */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
        {challenges.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-600">
            No challenges yet for this industry
          </p>
        ) : (
          challenges.map((ch) => (
            <ChallengeCard
              key={ch.id}
              challenge={ch}
              isActive={ch.id === activeChallengeId}
              isComplete={completedIds.has(ch.id)}
              onSelect={() => onSelectChallenge(ch.id)}
            />
          ))
        )}
      </div>

      {/* Progress */}
      <div className="border-t border-zinc-800 px-3 py-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
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
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{
              width: `${challenges.length > 0 ? (completedIds.size / challenges.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
    </aside>
  );
}
