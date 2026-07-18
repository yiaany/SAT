import { OFFICIAL_RESOURCES, STUDY_PLAN } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Ресурсы
      </h1>
      <p className="mb-10 max-w-xl text-[rgba(0,0,0,0.55)]">
        Официальные материалы College Board, Bluebook и Khan Academy для Digital
        SAT.
      </p>

      <div className="mb-14 grid gap-3">
        {OFFICIAL_RESOURCES.map((r) => (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-xl border border-black/[0.08] bg-white p-5 transition hover:border-black/15 hover:shadow-md"
          >
            <div>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold group-hover:text-[#0075de]">
                  {r.title}
                </span>
                <Badge tone="brand">{r.tag}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-[rgba(0,0,0,0.55)]">
                {r.description}
              </p>
            </div>
            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-black/30 group-hover:text-[#0075de]" />
          </a>
        ))}
      </div>

      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        12-недельный план
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STUDY_PLAN.map((w) => (
          <Card key={w.week} className="p-5">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0075de]">
              Week {w.week}
            </div>
            <h3 className="mb-3 font-semibold">{w.title}</h3>
            <ul className="space-y-1.5 text-sm text-[rgba(0,0,0,0.6)]">
              {w.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/25" />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="mt-10 border-[#0075de]/20 bg-[#e6f3fe]/50 p-6">
        <h3 className="mb-2 font-semibold">Совет по Bluebook</h3>
        <p className="text-sm leading-relaxed text-[rgba(0,0,0,0.65)]">
          Скачай Bluebook заранее, пройди full-length adaptive test в условиях,
          близких к экзамену (тайминг, без телефона). После теста разбери
          ошибки в My Practice / Question Bank и вернись в наши уроки по слабым
          skill-ам.
        </p>
      </Card>
    </div>
  );
}
