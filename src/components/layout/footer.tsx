import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#f6f5f4]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0075de] text-xs font-bold text-white">
              S
            </span>
            <span className="font-semibold">SAT Prep</span>
          </div>
          <p className="max-w-xs text-sm text-[rgba(0,0,0,0.55)]">
            Digital SAT · Reading & Writing + Math. Теория, практика, прогресс и
            официальные ресурсы College Board.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[rgba(0,0,0,0.85)]">Платформа</span>
            <Link href="/learn" className="text-[rgba(0,0,0,0.55)] hover:text-black">
              Обучение
            </Link>
            <Link
              href="/practice"
              className="text-[rgba(0,0,0,0.55)] hover:text-black"
            >
              Практика
            </Link>
            <Link
              href="/dashboard"
              className="text-[rgba(0,0,0,0.55)] hover:text-black"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-[rgba(0,0,0,0.85)]">Official</span>
            <a
              href="https://bluebook.collegeboard.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(0,0,0,0.55)] hover:text-black"
            >
              Bluebook
            </a>
            <a
              href="https://www.khanacademy.org/digital-sat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(0,0,0,0.55)] hover:text-black"
            >
              Khan Academy
            </a>
            <Link
              href="/resources"
              className="text-[rgba(0,0,0,0.55)] hover:text-black"
            >
              Все ресурсы
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-black/[0.06] py-4 text-center text-xs text-[rgba(0,0,0,0.4)]">
        Не аффилирован с College Board. SAT® — trademark of College Board.
      </div>
    </footer>
  );
}
