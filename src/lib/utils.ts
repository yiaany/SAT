import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function xpForLevel(level: number) {
  return level * 100;
}

export function levelFromXp(xp: number) {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }
  return { level, xpInLevel: remaining, xpNeeded: xpForLevel(level) };
}

export function estimateScore(rwPct: number, mathPct: number) {
  const rw = Math.round(200 + rwPct * 600);
  const math = Math.round(200 + mathPct * 600);
  return {
    rw: Math.min(800, Math.max(200, rw)),
    math: Math.min(800, Math.max(200, math)),
    total: Math.min(1600, Math.max(400, rw + math)),
  };
}
