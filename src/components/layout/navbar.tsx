"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/store/progress";
import { levelFromXp } from "@/lib/utils";
import {
  BookOpen,
  ChevronDown,
  Flame,
  LayoutDashboard,
  Library,
  Menu,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Обучение", icon: BookOpen },
  { href: "/practice", label: "Практика", icon: Target },
  { href: "/resources", label: "Ресурсы", icon: Library },
];

export function Navbar() {
  const pathname = usePathname();
  const { xp, streak, name, avatar } = useProgress();
  const { level } = levelFromXp(xp);
  const [open, setOpen] = useState(false);
  const isLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0075de] text-sm font-bold text-white">
              S
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              SAT Prep
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-black/[0.05] text-[rgba(0,0,0,0.9)]"
                      : "text-[rgba(0,0,0,0.6)] hover:bg-black/[0.04] hover:text-[rgba(0,0,0,0.9)]"
                  )}
                >
                  {l.label}
                  {l.href === "/learn" && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isLanding && (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2.5 py-1 text-xs font-semibold text-[#b45309]">
                  <Flame className="h-3.5 w-3.5" />
                  {streak}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f3fe] px-2.5 py-1 text-xs font-semibold text-[#005bab]">
                  <Zap className="h-3.5 w-3.5" />
                  {xp} XP · L{level}
                </span>
              </div>
              <Link
                href="/profile"
                className="hidden items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-black/[0.04] sm:flex"
              >
                <span className="text-lg leading-none">{avatar}</span>
                <span className="max-w-[100px] truncate text-[rgba(0,0,0,0.75)]">
                  {name}
                </span>
              </Link>
            </>
          )}

          {isLanding ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">Начать бесплатно</Button>
              </Link>
            </div>
          ) : (
            <Link href="/practice" className="hidden sm:block">
              <Button size="sm">Практика</Button>
            </Link>
          )}

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/[0.04] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/[0.06] bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-black/[0.04]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-black/[0.04]"
            >
              Профиль
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
