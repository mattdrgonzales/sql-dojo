"use client";

interface StatsBarProps {
  xp: number;
  streak: number;
  level: {
    level: number;
    title: string;
    xpForNext: number;
    xpInLevel: number;
  };
}

export default function StatsBar({ xp, streak, level }: StatsBarProps) {
  const progress = level.xpForNext > 0 ? (level.xpInLevel / level.xpForNext) * 100 : 100;

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Streak */}
      {streak > 0 && (
        <div
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold"
          style={{
            background: streak >= 5 ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.08)",
            color: "var(--color-cta)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
          </svg>
          {streak}
        </div>
      )}

      {/* Level + XP */}
      <div className="hidden items-center gap-1.5 md:flex">
        <div
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            color: "var(--color-primary)",
          }}
          title={`${level.title} — ${xp} XP total`}
        >
          <span style={{ fontFamily: "var(--font-code)" }}>Lv{level.level}</span>
          <div
            className="h-1 w-12 overflow-hidden rounded-full"
            style={{ background: "var(--color-border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "var(--color-primary)",
              }}
            />
          </div>
          <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            {xp}xp
          </span>
        </div>
      </div>

      {/* Mobile: compact XP */}
      <div
        className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-bold md:hidden"
        style={{
          color: "var(--color-primary)",
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
        }}
      >
        {xp}xp
      </div>
    </div>
  );
}
