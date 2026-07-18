"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllLessons } from "@/data/curriculum";
import type { Exercise } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";
import { Timer, Zap } from "lucide-react";

type Q = Exercise & { sectionTitle: string; domain: string };

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticePage() {
  const all = useMemo(() => getAllLessons(), []);
  const pool = useMemo(() => {
    const qs: Q[] = [];
    all.forEach(({ section, lesson }) => {
      lesson.exercises.forEach((ex) => {
        if (ex.type === "mc" || ex.type === "choose") {
          qs.push({
            ...ex,
            sectionTitle: section.shortTitle,
            domain: section.domain,
          });
        }
      });
    });
    return qs;
  }, [all]);

  const [mode, setMode] = useState<"idle" | "run" | "end">("idle");
  const [filter, setFilter] = useState<"all" | "rw" | "math">("all");
  const [queue, setQueue] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [seconds, setSeconds] = useState(15 * 60);
  const { recordCorrect, recordSession, addXp, recordStudyDay } = useProgress();

  const current = queue[idx];

  const start = useCallback(() => {
    let qs = pool;
    if (filter === "rw") qs = pool.filter((q) => q.domain === "rw");
    if (filter === "math") qs = pool.filter((q) => q.domain === "math");
    setQueue(shuffle(qs).slice(0, 40));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setCorrect(0);
    setTotal(0);
    setSeconds(15 * 60);
    setMode("run");
    recordSession();
    recordStudyDay();
  }, [pool, filter, recordSession, recordStudyDay]);

  useEffect(() => {
    if (mode !== "run") return;
    if (seconds <= 0) {
      setMode("end");
      addXp(correct * 5);
      return;
    }
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [mode, seconds, correct, addXp]);

  function answer(oi: number) {
    if (revealed || !current) return;
    setSelected(oi);
    setRevealed(true);
    setTotal((t) => t + 1);
    const ok = oi === Number(current.answer);
    if (ok) {
      setCorrect((c) => c + 1);
      recordCorrect(1);
    }
  }

  function next() {
    if (idx + 1 >= queue.length) {
      setMode("end");
      addXp(correct * 5);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Практика
      </h1>
      <p className="mb-8 text-[rgba(0,0,0,0.55)]">
        15-минутный drill · случайные вопросы · XP за ответы
      </p>

      {mode === "idle" && (
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f3fe] text-[#0075de]">
            <Timer className="h-7 w-7" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Быстрый режим</h2>
          <p className="mb-6 text-sm text-[rgba(0,0,0,0.55)]">
            Таймер 15 минут. Вопросы из банка ({pool.length}+ MCQ). Фильтр по
            секции.
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {(
              [
                ["all", "Все"],
                ["rw", "R&W"],
                ["math", "Math"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium",
                  filter === k
                    ? "bg-[#0075de] text-white"
                    : "bg-black/[0.05] text-[rgba(0,0,0,0.65)]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button size="lg" onClick={start}>
            <Zap className="h-4 w-4" />
            Старт
          </Button>
        </Card>
      )}

      {mode === "run" && current && (
        <div className="animate-fade-up">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-2xl font-semibold tabular-nums">
              {mm}:{ss}
            </div>
            <div className="text-sm font-medium text-[rgba(0,0,0,0.55)]">
              {correct}/{total} · #{idx + 1}
            </div>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
            <div
              className="h-full bg-[#0075de] transition-all"
              style={{ width: `${(seconds / (15 * 60)) * 100}%` }}
            />
          </div>
          <Card className="p-5 sm:p-6">
            <Badge tone="brand" className="mb-3">
              {current.sectionTitle}
            </Badge>
            <p
              className="mb-5 text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: current.q }}
            />
            <div className="space-y-2">
              {current.opts?.map((opt, oi) => (
                <button
                  key={oi}
                  type="button"
                  onClick={() => answer(oi)}
                  className={cn(
                    "flex w-full rounded-lg border px-3 py-2.5 text-left text-sm transition",
                    !revealed && "hover:border-[#0075de] hover:bg-[#e6f3fe]",
                    revealed &&
                      oi === Number(current.answer) &&
                      "border-[#0f7b3a] bg-[#e8f7ee]",
                    revealed &&
                      selected === oi &&
                      oi !== Number(current.answer) &&
                      "border-[#c0392b] bg-[#fdecea]",
                    !revealed &&
                      selected !== oi &&
                      "border-black/[0.08]"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            {revealed && (
              <div className="mt-4">
                <p className="mb-3 text-sm text-[rgba(0,0,0,0.6)]">
                  {current.exp}
                </p>
                <Button onClick={next}>Далее</Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {mode === "end" && (
        <Card className="p-8 text-center">
          <div className="mb-2 text-4xl">🏆</div>
          <h2 className="mb-2 text-2xl font-semibold">Сессия завершена</h2>
          <p className="mb-1 text-lg">
            {correct} / {total} верно
          </p>
          <p className="mb-6 text-sm text-[rgba(0,0,0,0.5)]">
            +{correct * 5} XP за сессию
          </p>
          <Button onClick={start}>Ещё раз</Button>
          <Button
            variant="ghost"
            className="ml-2"
            onClick={() => setMode("idle")}
          >
            Настройки
          </Button>
        </Card>
      )}
    </div>
  );
}
