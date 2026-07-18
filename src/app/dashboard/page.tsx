"use client";

import Link from "next/link";
import { ALL_SECTIONS, countByDomain, getAllLessons } from "@/data/curriculum";
import { useProgress } from "@/store/progress";
import { estimateScore, levelFromXp } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENTS } from "@/lib/achievements";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Flame,
  Play,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";

export default function DashboardPage() {
  const store = useProgress();
  const { level, xpInLevel, xpNeeded } = levelFromXp(store.xp);
  const counts = countByDomain();
  const all = getAllLessons();

  const stats = useMemo(() => {
    let completed = 0;
    let rwDone = 0;
    let mathDone = 0;
    all.forEach(({ section, lesson }) => {
      if (store.progress[lesson.id]?.completed) {
        completed += 1;
        if (section.domain === "rw") rwDone += 1;
        else mathDone += 1;
      }
    });
    const pct = all.length ? completed / all.length : 0;
    const rwPct = counts.rw ? rwDone / counts.rw : 0;
    const mathPct = counts.math ? mathDone / counts.math : 0;
    const score = estimateScore(rwPct, mathPct);
    return { completed, rwDone, mathDone, pct, score };
  }, [store.progress, all, counts]);

  const next = all.find((x) => !store.progress[x.lesson.id]?.completed);

  const unlocked = ACHIEVEMENTS.filter((a) =>
    a.check({
      lessonsCompleted: stats.completed,
      totalCorrect: store.correctCount,
      streak: store.streak,
      sessions: store.sessions,
      mathLessons: stats.mathDone,
      rwLessons: stats.rwDone,
      perfectQuizzes: store.perfectQuizzes,
    })
  );

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm text-[rgba(0,0,0,0.45)]">
            Привет, {store.name} {store.avatar}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/practice">
            <Button>
              <Play className="h-4 w-4" />
              15-мин режим
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="secondary">Все уроки</Button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#e6f3fe] p-5">
          <div className="mb-1 text-xs font-medium text-[#005bab]">
            Прогноз балла
          </div>
          <div className="text-3xl font-semibold tracking-tight">
            {stats.score.total}
          </div>
          <div className="mt-1 text-xs text-[rgba(0,0,0,0.5)]">
            R&W {stats.score.rw} · Math {stats.score.math}
          </div>
          <Progress value={stats.pct * 100} className="mt-3 bg-white/60" />
        </Card>
        <Card className="bg-[#fff7ed] p-5">
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-[#b45309]">
            <Flame className="h-3.5 w-3.5" /> Стрик
          </div>
          <div className="text-3xl font-semibold">{store.streak} дн.</div>
          <div className="mt-1 text-xs text-[rgba(0,0,0,0.5)]">
            Рекорд: {store.bestStreak}
          </div>
        </Card>
        <Card className="bg-[#f3e8ff] p-5">
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-[#6b21a8]">
            <Sparkles className="h-3.5 w-3.5" /> Уровень {level}
          </div>
          <div className="text-3xl font-semibold">{store.xp} XP</div>
          <Progress
            value={(xpInLevel / xpNeeded) * 100}
            className="mt-3 bg-white/60"
            barClassName="bg-[#7c3aed]"
          />
          <div className="mt-1 text-xs text-[rgba(0,0,0,0.5)]">
            {xpInLevel}/{xpNeeded} до L{level + 1}
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-1 text-xs font-medium text-[rgba(0,0,0,0.45)]">
            Прогресс
          </div>
          <div className="text-3xl font-semibold">
            {stats.completed}/{counts.total}
          </div>
          <div className="mt-1 text-xs text-[rgba(0,0,0,0.5)]">
            {Math.round(stats.pct * 100)}% уроков
          </div>
          <Progress value={stats.pct * 100} className="mt-3" />
        </Card>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[rgba(0,0,0,0.5)]">
            <Play className="h-4 w-4" /> Продолжить
          </div>
          {next ? (
            <>
              <Badge tone="brand" className="mb-2">
                {next.section.shortTitle}
              </Badge>
              <h2 className="mb-1 text-xl font-semibold">{next.lesson.title}</h2>
              <p className="mb-4 text-sm text-[rgba(0,0,0,0.55)]">
                {next.section.title} · {next.lesson.exercises.length} упражнений
              </p>
              <Link href={`/learn/${next.section.id}/${next.lesson.id}`}>
                <Button>
                  Учить
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </>
          ) : (
            <p className="text-[rgba(0,0,0,0.6)]">
              🎉 Все уроки пройдены! Повтори материал или пройди Bluebook mock.
            </p>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[rgba(0,0,0,0.5)]">
            <Target className="h-4 w-4" /> Цель
          </div>
          <div className="text-3xl font-semibold">{store.targetScore}</div>
          <p className="mt-1 text-sm text-[rgba(0,0,0,0.5)]">
            Целевой балл · сейчас ~{stats.score.total}
          </p>
          <Link href="/profile" className="mt-4 inline-block">
            <Button variant="outline" size="sm">
              Настроить профиль
            </Button>
          </Link>
        </Card>
      </div>

      {/* Sections */}
      <h2 className="mb-4 text-xl font-semibold tracking-tight">Секции</h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        {ALL_SECTIONS.map((sec) => {
          const done = sec.lessons.filter(
            (l) => store.progress[l.id]?.completed
          ).length;
          const p = sec.lessons.length
            ? Math.round((done / sec.lessons.length) * 100)
            : 0;
          return (
            <Link key={sec.id} href={`/learn/${sec.id}`}>
              <Card hover className="h-full p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: sec.color }}
                  >
                    {sec.domain === "math" ? (
                      <Calculator className="h-4 w-4" />
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                  </div>
                  <Badge>{sec.domain === "math" ? "Math" : "R&W"}</Badge>
                </div>
                <h3 className="mb-1 font-semibold">{sec.title}</h3>
                <p className="mb-3 line-clamp-2 text-sm text-[rgba(0,0,0,0.5)]">
                  {sec.description}
                </p>
                <div className="mb-1.5 flex justify-between text-xs text-[rgba(0,0,0,0.45)]">
                  <span>
                    {done}/{sec.lessons.length} уроков
                  </span>
                  <span>{p}%</span>
                </div>
                <Progress
                  value={p}
                  barClassName="transition-all"
                  className="h-1"
                />
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Achievements */}
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
        <Trophy className="h-5 w-5 text-[#0075de]" />
        Ачивки
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a) => {
          const on = unlocked.some((u) => u.id === a.id);
          return (
            <Card
              key={a.id}
              className={`p-4 ${on ? "border-[#0075de]/30 bg-[#e6f3fe]/40" : "opacity-60"}`}
            >
              <div className="mb-2 text-2xl">{a.icon}</div>
              <div className="font-semibold">{a.title}</div>
              <div className="text-xs text-[rgba(0,0,0,0.5)]">
                {a.description}
              </div>
              <div className="mt-2 text-xs font-medium text-[#0075de]">
                +{a.xp} XP {on && "· unlocked"}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
