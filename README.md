# SAT Prep — Digital SAT Platform

Полноценная React/Next.js платформа подготовки к **Digital SAT**: Reading & Writing + Math, прогресс, геймификация, официальные ресурсы College Board / Bluebook.

Дизайн — чистый Notion-style (белый фон, `#0075de`, peach accent, Inter).

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Zustand** — локальный прогресс / профиль / XP / стрики
- **Prisma + SQLite** — схема для auth/profiles (готово к подключению)
- **lucide-react**

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Структура

```
src/
  app/                 # страницы: landing, dashboard, learn, practice, resources, profile
  components/          # UI + layout + lesson runner
  data/                # curriculum (english.json + math.ts), resources
  lib/                 # utils, auth, db, achievements
  store/               # zustand progress store
prisma/                # schema User, LessonProgress, achievements...
```

## Фичи

- **R&W** — 4 секции / 32 урока (контент из sat-english-prep)
- **Math** — Algebra, Advanced Math, PSDA, Geometry & Trig
- Уроки: теория · примеры · задания · квиз
- 15-мин practice drill с таймером
- XP, уровни, стрики, ачивки, прогноз балла
- Профиль + закладки (localStorage)
- Official links: Bluebook, Khan Academy, Question Bank, practice tests

## Prisma (опционально)

```bash
npx prisma migrate dev --name init
```

Схема пользователей и прогресса уже в `prisma/schema.prisma`. Сейчас UI работает на клиентском store без обязательной БД.

## GitHub

```bash
git remote add origin https://github.com/yiaany/SAT.git
git push -u origin main
```
