import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { countByDomain } from "@/data/curriculum";
import { OFFICIAL_RESOURCES, STUDY_PLAN } from "@/data/resources";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  ChartLine,
  Flame,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const counts = countByDomain();

const features = [
  {
    icon: BookOpen,
    title: "Reading & Writing",
    desc: `${counts.rw} уроков: Conventions, Craft, Information, Expression — с теорией и упражнениями.`,
    color: "#0075de",
  },
  {
    icon: Calculator,
    title: "Math",
    desc: `${counts.math} уроков: Algebra, Advanced Math, Data Analysis, Geometry & Trig.`,
    color: "#7c3aed",
  },
  {
    icon: Target,
    title: "Практика и квизы",
    desc: "MCQ, fill-in, spot-the-error. Мгновенный фидбек и XP за каждый верный ответ.",
    color: "#059669",
  },
  {
    icon: Flame,
    title: "Геймификация",
    desc: "Стрики, уровни, ачивки, прогноз балла. Прогресс сохраняется локально.",
    color: "#ea580c",
  },
  {
    icon: ChartLine,
    title: "Аналитика",
    desc: "Dashboard с прогрессом по секциям, закладками и планом на 12 недель.",
    color: "#0891b2",
  },
  {
    icon: Brain,
    title: "Official path",
    desc: "Bluebook, Khan Academy, Question Bank — всё под рукой в разделе Ресурсы.",
    color: "#c026d3",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — Notion-inspired */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#e6f3fe_0%,_transparent_55%)]" />
        <div className="relative mx-auto max-w-[900px] text-center">
          <div className="mb-6 flex justify-center gap-[-8px]">
            {["📘", "∑", "🎯", "🔥", "✍️", "📊"].map((e, i) => (
              <span
                key={i}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white text-xl shadow-sm"
                style={{
                  marginLeft: i ? -8 : 0,
                  transform: `rotate(${(i - 2.5) * 6}deg)`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          <Badge tone="peach" className="mb-5 px-3 py-1 text-sm">
            Digital SAT · 2026
          </Badge>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[rgba(0,0,0,0.95)] sm:text-6xl md:text-[72px] md:leading-[1.02] md:tracking-[-0.045em]">
            Твой путь к{" "}
            <span className="inline-flex items-baseline rounded-full bg-[#ffdec4] px-4 py-1 font-medium tracking-[-0.03em]">
              1500+
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-[rgba(0,0,0,0.55)] sm:text-xl">
            Math + Reading & Writing. Теория, практика, стрики и официальные
            материалы College Board / Bluebook — в одном месте.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="min-w-[160px]">
                Начать бесплатно
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="secondary" className="min-w-[160px]">
                Смотреть программу
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-sm text-[rgba(0,0,0,0.4)]">
            {counts.total} уроков · R&W + Math · Прогресс и XP
          </p>
        </div>

        {/* Product preview card */}
        <div className="relative mx-auto mt-14 max-w-[960px]">
          <Card className="notion-shadow-lg overflow-hidden border-black/10 p-0">
            <div className="flex items-center gap-2 border-b border-black/[0.06] bg-[#f6f5f4] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[rgba(0,0,0,0.4)]">
                dashboard · SAT Prep
              </span>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
              <div className="rounded-xl bg-[#e6f3fe] p-4">
                <div className="mb-1 text-xs font-medium text-[#005bab]">
                  Прогноз балла
                </div>
                <div className="text-3xl font-semibold tracking-tight">1340</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/70">
                  <div className="h-full w-[72%] rounded-full bg-[#0075de]" />
                </div>
              </div>
              <div className="rounded-xl bg-[#fff7ed] p-4">
                <div className="mb-1 flex items-center gap-1 text-xs font-medium text-[#b45309]">
                  <Flame className="h-3.5 w-3.5" /> Стрик
                </div>
                <div className="text-3xl font-semibold tracking-tight">7 дней</div>
                <div className="mt-2 text-xs text-[rgba(0,0,0,0.45)]">
                  Не сжигай серию
                </div>
              </div>
              <div className="rounded-xl bg-[#f3e8ff] p-4">
                <div className="mb-1 flex items-center gap-1 text-xs font-medium text-[#6b21a8]">
                  <Sparkles className="h-3.5 w-3.5" /> XP
                </div>
                <div className="text-3xl font-semibold tracking-tight">2 480</div>
                <div className="mt-2 text-xs text-[rgba(0,0,0,0.45)]">
                  Level 12
                </div>
              </div>
              <div className="sm:col-span-2 rounded-xl border border-black/[0.06] bg-[#f6f5f4] p-4">
                <div className="mb-2 text-xs font-medium text-[rgba(0,0,0,0.45)]">
                  Сегодня
                </div>
                <div className="font-medium">Algebra → Systems of Equations</div>
                <div className="mt-1 text-sm text-[rgba(0,0,0,0.5)]">
                  4 упражнения · medium
                </div>
              </div>
              <div className="rounded-xl border border-black/[0.06] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium">
                  <Trophy className="h-3.5 w-3.5 text-[#0075de]" />
                  Ачивка
                </div>
                <div className="text-sm font-medium">Неделя огня 🔥</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f6f5f4] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-3 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.1] sm:tracking-[-0.03em]">
            Всё для 1400+ в одном месте.
          </h2>
          <p className="mb-12 max-w-xl text-[rgba(0,0,0,0.55)]">
            Структура как у топ-платформ подготовки, интерфейс — чистый Notion-style.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                hover
                className="bg-white p-5"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${f.color}18`, color: f.color }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[rgba(0,0,0,0.55)]">
                  {f.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Study plan */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-3 text-4xl font-semibold tracking-tight sm:text-5xl sm:tracking-[-0.03em]">
            План на 12 недель
          </h2>
          <p className="mb-10 text-[rgba(0,0,0,0.55)]">
            От диагностики до финальных Bluebook mocks
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STUDY_PLAN.map((w) => (
              <Card key={w.week} className="p-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0075de]">
                  Неделя {w.week}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{w.title}</h3>
                <ul className="space-y-1.5 text-sm text-[rgba(0,0,0,0.6)]">
                  {w.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Official */}
      <section className="border-t border-black/[0.06] bg-[#f6f5f4] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-3 text-4xl font-semibold tracking-tight sm:tracking-[-0.03em]">
            Official College Board
          </h2>
          <p className="mb-10 max-w-xl text-[rgba(0,0,0,0.55)]">
            Ссылки на Bluebook, practice tests, Khan Academy и Question Bank
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {OFFICIAL_RESOURCES.slice(0, 4).map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-xl border border-black/[0.08] bg-white p-5 transition hover:border-black/15 hover:shadow-md"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-base font-semibold group-hover:text-[#0075de]">
                      {r.title}
                    </span>
                    <Badge>{r.tag}</Badge>
                  </div>
                  <p className="text-sm text-[rgba(0,0,0,0.55)]">
                    {r.description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-black/30 transition group-hover:translate-x-0.5 group-hover:text-[#0075de]" />
              </a>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/resources">
              <Button variant="outline">
                Все ресурсы
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center sm:px-6">
        <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl sm:tracking-[-0.03em]">
          Готов начать?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-[rgba(0,0,0,0.55)]">
          Открой dashboard, выбери секцию и забери первые XP сегодня.
        </p>
        <Link href="/dashboard">
          <Button size="lg">
            Открыть Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </>
  );
}
