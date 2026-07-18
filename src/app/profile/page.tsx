"use client";

import { useProgress } from "@/store/progress";
import { levelFromXp } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getAllLessons } from "@/data/curriculum";
import Link from "next/link";

const AVATARS = ["📘", "🎯", "🔥", "🧠", "⚡", "🏆", "📐", "✍️", "🚀", "💎"];

export default function ProfilePage() {
  const store = useProgress();
  const { level, xpInLevel, xpNeeded } = levelFromXp(store.xp);
  const all = getAllLessons();
  const completed = all.filter(
    (x) => store.progress[x.lesson.id]?.completed
  ).length;

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Профиль</h1>

      <Card className="mb-6 p-6 text-center">
        <div className="mb-3 text-5xl">{store.avatar}</div>
        <div className="text-xl font-semibold">{store.name}</div>
        <div className="mt-1 text-sm text-[rgba(0,0,0,0.5)]">
          Level {level} · {store.xp} XP
        </div>
        <Progress
          value={(xpInLevel / xpNeeded) * 100}
          className="mx-auto mt-4 max-w-xs"
        />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge tone="warn">🔥 {store.streak} streak</Badge>
          <Badge tone="brand">🎯 {store.targetScore}</Badge>
          <Badge tone="success">
            ✅ {completed}/{all.length}
          </Badge>
        </div>
      </Card>

      <Card className="mb-4 p-5">
        <label className="mb-2 block text-sm font-medium">Имя</label>
        <input
          className="mb-4 w-full rounded-lg border border-black/10 bg-[#f6f5f4] px-3 py-2.5 text-sm outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
          value={store.name}
          onChange={(e) => store.setProfile({ name: e.target.value })}
        />
        <label className="mb-2 block text-sm font-medium">Целевой балл</label>
        <input
          type="number"
          min={400}
          max={1600}
          step={10}
          className="mb-4 w-full rounded-lg border border-black/10 bg-[#f6f5f4] px-3 py-2.5 text-sm outline-none focus:border-[#0075de]"
          value={store.targetScore}
          onChange={(e) =>
            store.setProfile({
              targetScore: Math.min(
                1600,
                Math.max(400, Number(e.target.value) || 1400)
              ),
            })
          }
        />
        <label className="mb-2 block text-sm font-medium">Аватар</label>
        <div className="flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => store.setProfile({ avatar: a })}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition ${
                store.avatar === a
                  ? "bg-[#e6f3fe] ring-2 ring-[#0075de]"
                  : "bg-black/[0.04] hover:bg-black/[0.07]"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </Card>

      {store.bookmarks.length > 0 && (
        <Card className="mb-4 p-5">
          <h2 className="mb-3 font-semibold">Закладки</h2>
          <ul className="space-y-2 text-sm">
            {store.bookmarks.map((id) => {
              const hit = all.find((x) => x.lesson.id === id);
              if (!hit) return null;
              return (
                <li key={id}>
                  <Link
                    href={`/learn/${hit.section.id}/${hit.lesson.id}`}
                    className="text-[#0075de] hover:underline"
                  >
                    {hit.lesson.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      <Button
        variant="danger"
        className="w-full"
        onClick={() => {
          if (confirm("Сбросить весь локальный прогресс?")) store.reset();
        }}
      >
        Сбросить прогресс
      </Button>
    </div>
  );
}
