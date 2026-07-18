"use client";

import Link from "next/link";
import { ALL_SECTIONS } from "@/data/curriculum";
import { useProgress } from "@/store/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calculator } from "lucide-react";

export default function LearnPage() {
  const progress = useProgress((s) => s.progress);
  const rw = ALL_SECTIONS.filter((s) => s.domain === "rw");
  const math = ALL_SECTIONS.filter((s) => s.domain === "math");

  function SectionGrid({
    title,
    icon: Icon,
    sections,
  }: {
    title: string;
    icon: typeof BookOpen;
    sections: typeof ALL_SECTIONS;
  }) {
    return (
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#0075de]" />
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((sec, idx) => {
            const done = sec.lessons.filter((l) => progress[l.id]?.completed)
              .length;
            const pct = Math.round((done / sec.lessons.length) * 100);
            return (
              <Link key={sec.id} href={`/learn/${sec.id}`}>
                <Card hover className="h-full overflow-hidden p-0">
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: sec.color }}
                  />
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[rgba(0,0,0,0.4)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <Badge>
                        {done}/{sec.lessons.length}
                      </Badge>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">{sec.title}</h3>
                    <p className="mb-4 text-sm text-[rgba(0,0,0,0.55)]">
                      {sec.description}
                    </p>
                    <Progress value={pct} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Обучение
      </h1>
      <p className="mb-10 text-[rgba(0,0,0,0.55)]">
        Полная программа Digital SAT: Reading & Writing и Math
      </p>
      <SectionGrid title="Reading & Writing" icon={BookOpen} sections={rw} />
      <SectionGrid title="Math" icon={Calculator} sections={math} />
    </div>
  );
}
