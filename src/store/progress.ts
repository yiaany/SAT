"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressMap = Record<
  string,
  { completed: boolean; score: number; maxScore: number }
>;

type State = {
  progress: ProgressMap;
  bookmarks: string[];
  xp: number;
  streak: number;
  bestStreak: number;
  lastStudyDate: string | null;
  name: string;
  avatar: string;
  targetScore: number;
  correctCount: number;
  sessions: number;
  perfectQuizzes: number;
  guestId: string;
  markComplete: (lessonId: string, score?: number, maxScore?: number) => number;
  toggleBookmark: (lessonId: string) => void;
  addXp: (amount: number) => void;
  recordStudyDay: () => void;
  recordCorrect: (n?: number) => void;
  recordSession: () => void;
  recordPerfectQuiz: () => void;
  setProfile: (p: Partial<Pick<State, "name" | "avatar" | "targetScore">>) => void;
  reset: () => void;
};

const initial = {
  progress: {} as ProgressMap,
  bookmarks: [] as string[],
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastStudyDate: null as string | null,
  name: "Студент",
  avatar: "📘",
  targetScore: 1400,
  correctCount: 0,
  sessions: 0,
  perfectQuizzes: 0,
  guestId: "",
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export const useProgress = create<State>()(
  persist(
    (set, get) => ({
      ...initial,
      guestId:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),

      markComplete: (lessonId, score = 0, maxScore = 0) => {
        const prev = get().progress[lessonId];
        const already = prev?.completed;
        let gained = 0;
        set((s) => {
          const progress = {
            ...s.progress,
            [lessonId]: {
              completed: true,
              score: Math.max(score, prev?.score ?? 0),
              maxScore: Math.max(maxScore, prev?.maxScore ?? 0),
            },
          };
          gained = already ? 10 : 40 + Math.round((score / Math.max(maxScore, 1)) * 30);
          return { progress, xp: s.xp + gained };
        });
        get().recordStudyDay();
        return gained;
      },

      toggleBookmark: (lessonId) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(lessonId)
            ? s.bookmarks.filter((id) => id !== lessonId)
            : [...s.bookmarks, lessonId],
        })),

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      recordStudyDay: () => {
        const t = todayKey();
        const s = get();
        if (s.lastStudyDate === t) return;
        let streak = 1;
        if (s.lastStudyDate === yesterdayKey()) streak = s.streak + 1;
        set({
          lastStudyDate: t,
          streak,
          bestStreak: Math.max(s.bestStreak, streak),
        });
      },

      recordCorrect: (n = 1) =>
        set((s) => ({ correctCount: s.correctCount + n, xp: s.xp + n * 5 })),

      recordSession: () => set((s) => ({ sessions: s.sessions + 1 })),

      recordPerfectQuiz: () =>
        set((s) => ({ perfectQuizzes: s.perfectQuizzes + 1, xp: s.xp + 25 })),

      setProfile: (p) => set((s) => ({ ...s, ...p })),

      reset: () =>
        set({
          ...initial,
          guestId: crypto.randomUUID?.() ?? String(Date.now()),
        }),
    }),
    { name: "sat-prep-v1" }
  )
);
