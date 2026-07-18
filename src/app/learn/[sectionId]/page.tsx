"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getSection } from "@/data/curriculum";
import { useProgress } from "@/store/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bookmark, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionPage() {
  const params = useParams();
  const sectionId = String(params.sectionId);
  const section = getSection(sectionId);
  const { progress, bookmarks, toggleBookmark } = useProgress();

  if (!section) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p>Секция не найдена</p>
        <Link href="/learn" className="text-[#0075de]">
          ← Назад
        </Link>
      </div>
    );
  }

  const done = section.lessons.filter((l) => progress[l.id]?.completed).length;
  const pct = Math.round((done / section.lessons.length) * 100);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
      <Link
        href="/learn"
        className="mb-4 inline-block text-sm text-[rgba(0,0,0,0.5)] hover:text-black"
      >
        ← Обучение
      </Link>

      <div
        className="mb-8 rounded-2xl border border-black/[0.08] p-6 sm:p-8"
        style={{
          background: `linear-gradient(135deg, ${section.color}12, white 60%)`,
        }}
      >
        <Badge tone="brand" className="mb-3">
          {section.domain === "math" ? "Math" : "Reading & Writing"}
        </Badge>
        <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {section.title}
        </h1>
        <p className="mb-4 max-w-xl text-[rgba(0,0,0,0.55)]">
          {section.description}
        </p>
        <div className="mb-2 flex gap-4 text-sm">
          <span>
            <b>{section.lessons.length}</b> уроков
          </span>
          <span>
            <b>{done}</b> завершено
          </span>
        </div>
        <Progress value={pct} className="max-w-md" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {section.lessons.map((lesson, idx) => {
          const completed = progress[lesson.id]?.completed;
          const bm = bookmarks.includes(lesson.id);
          return (
            <Card
              key={lesson.id}
              hover
              className={cn("relative p-5", completed && "border-[#0f7b3a]/25")}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-sm font-semibold">
                  {completed ? (
                    <Check className="h-4 w-4 text-[#0f7b3a]" />
                  ) : (
                    idx + 1
                  )}
                </span>
                <div className="flex items-center gap-2">
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(lesson.id);
                    }}
                    className="rounded-lg p-1.5 hover:bg-black/[0.04]"
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      className={cn(
                        "h-4 w-4",
                        bm && "fill-[#0075de] text-[#0075de]"
                      )}
                    />
                  </button>
                </div>
              </div>
              <Link href={`/learn/${section.id}/${lesson.id}`}>
                <h3 className="mb-1 font-semibold hover:text-[#0075de]">
                  {lesson.title}
                </h3>
                <p className="text-xs text-[rgba(0,0,0,0.45)]">
                  {lesson.exercises.length} упражнений
                </p>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
