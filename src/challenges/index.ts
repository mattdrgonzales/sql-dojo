import { healthcareChallenges } from "./healthcare";
import type { Challenge, Industry, Tier } from "./types";

// For now, healthcare is fully built. Other industries will be added.
const challengesByIndustry: Record<Industry, Challenge[]> = {
  healthcare: healthcareChallenges,
  insurance: [],
  retail: [],
  education: [],
};

export function getChallenges(industry: Industry): Challenge[] {
  return challengesByIndustry[industry];
}

export function getChallengesByTier(
  industry: Industry,
  tier: Tier
): Challenge[] {
  return challengesByIndustry[industry].filter((c) => c.tier === tier);
}

export function getChallenge(
  industry: Industry,
  challengeId: string
): Challenge | undefined {
  return challengesByIndustry[industry].find((c) => c.id === challengeId);
}

export function getAvailableTiers(industry: Industry): Tier[] {
  const challenges = challengesByIndustry[industry];
  const tiers = new Set(challenges.map((c) => c.tier));
  return [...tiers].sort() as Tier[];
}
