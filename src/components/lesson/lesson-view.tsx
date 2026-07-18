"use client";

import { useState } from "react";
import type { Lesson, Section } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseItem, QuizPanel } from "./exercise-runner";
import { useProgress } from "@/store/progress";
import { Bookmark, CheckCircle2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tabs = [
  { id: "theory", label: "Теория" },
  { id: "examples", label: "Примеры" },
  { id: "exercises", label: "Задания" },
  { id: "quiz", label: "Квиз" },
] as const;

export function LessonView({
  section,
  lesson,
}: {
  section: Section;
  lesson: Lesson;
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("theory");
  const {
    progress,
    bookmarks,
    markComplete,
    toggleBookmark,
  } = useProgress();
  const done = progress[lesson.id]?.completed;
  const bookmarked = bookmarks.includes(lesson.id);
  const [xpFlash, setXpFlash] = useState<number | null>(null);

  function complete() {
    const gained = markComplete(
      lesson.id,
      lesson.exercises.length,
      lesson.exercises.length
    );
    setXpFlash(gained);
    setTimeout(() => setXpFlash(null), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <div className="mb-6">
        <Link
          href={`/learn/${section.id}`}
          className="mb-3 inline-flex text-sm text-[rgba(0,0,0,0.5)] hover:text-black"
        >
          ← {section.title}
        </Link>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="brand">{section.shortTitle}</Badge>
          {lesson.difficulty && (
            <Badge
              tone={
                lesson.difficulty === "easy"
                  ? "success"
                  : lesson.difficulty === "hard"
                    ? "warn"
                    : "default"
              }
            >
              {lesson.difficulty}
            </Badge>
          )}
          {done && <Badge tone="success">Пройдено</Badge>}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[rgba(0,0,0,0.92)] sm:text-4xl">
          {lesson.title}
        </h1>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-black/[0.08] bg-[#f6f5f4] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-white text-black shadow-sm"
                : "text-[rgba(0,0,0,0.55)] hover:text-black"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-8 min-h-[320px]">
        {tab === "theory" && (
          <div
            className="prose-theory rounded-xl border border-black/[0.08] bg-white p-5 text-[15px] leading-7 text-[rgba(0,0,0,0.8)] sm:p-6"
            dangerouslySetInnerHTML={{ __html: lesson.theory }}
          />
        )}
        {tab === "examples" && (
          <div className="space-y-3">
            {lesson.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/[0.08] bg-[#f6f5f4] p-4 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: ex }}
              />
            ))}
            {lesson.examples.length === 0 && (
              <p className="text-sm text-[rgba(0,0,0,0.5)]">
                Примеры в теории выше.
              </p>
            )}
          </div>
        )}
        {tab === "exercises" && (
          <div className="space-y-4">
            {lesson.exercises.map((ex, i) => (
              <ExerciseItem key={ex.id} exercise={ex} index={i} />
            ))}
          </div>
        )}
        {tab === "quiz" && <QuizPanel exercises={lesson.exercises} />}
      </div>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-2 rounded-2xl border border-black/[0.08] bg-white/95 p-3 shadow-lg backdrop-blur">
        <Button onClick={complete} variant={done ? "secondary" : "primary"}>
          <CheckCircle2 className="h-4 w-4" />
          {done ? "Пройдено" : "Отметить пройденным"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => toggleBookmark(lesson.id)}
        >
          <Bookmark
            className={cn("h-4 w-4", bookmarked && "fill-[#0075de] text-[#0075de]")}
          />
          {bookmarked ? "В закладках" : "Закладка"}
        </Button>
        <a
          href="https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            Official Practice
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
        {xpFlash !== null && (
          <span className="animate-pop text-sm font-semibold text-[#0075de]">
            +{xpFlash} XP
          </span>
        )}
      </div>
    </div>
  );
}
