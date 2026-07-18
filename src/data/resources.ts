import type { Resource } from "./types";

/** Official College Board / Bluebook prep links */
export const OFFICIAL_RESOURCES: Resource[] = [
  {
    title: "Bluebook™ App",
    description:
      "Официальное приложение Digital SAT: full-length practice tests в формате реального экзамена.",
    href: "https://bluebook.collegeboard.org/",
    tag: "Official",
  },
  {
    title: "Official SAT Practice Tests",
    description:
      "Бесплатные full-length practice tests от College Board (PDF + digital).",
    href: "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests",
    tag: "Practice",
  },
  {
    title: "Khan Academy Official SAT Prep",
    description:
      "Бесплатная персонализированная подготовка в партнёрстве с College Board.",
    href: "https://www.khanacademy.org/digital-sat",
    tag: "Free",
  },
  {
    title: "SAT Suite Question Bank",
    description:
      "Официальный банк вопросов с фильтрами по домену, skill и сложности.",
    href: "https://satsuite.collegeboard.org/sat/practice-preparation/question-bank",
    tag: "Questions",
  },
  {
    title: "Digital SAT Test Structure",
    description:
      "Структура экзамена: Reading & Writing + Math, adaptive modules, тайминг.",
    href: "https://satsuite.collegeboard.org/sat/whats-on-the-test",
    tag: "Guide",
  },
  {
    title: "SAT Score Structure",
    description:
      "Как считается балл 400–1600, секции 200–800, percentile.",
    href: "https://satsuite.collegeboard.org/sat/scores/understanding-scores",
    tag: "Scores",
  },
  {
    title: "Student Question Bank (My Practice)",
    description:
      "Практика после тестов в Bluebook — разбор ошибок в личном кабинете.",
    href: "https://mypractice.collegeboard.org/",
    tag: "Review",
  },
  {
    title: "SAT Registration",
    description: "Регистрация на экзамен, даты, fees, accommodations.",
    href: "https://satsuite.collegeboard.org/sat/registration",
    tag: "Admin",
  },
];

export const STUDY_PLAN = [
  {
    week: "1–2",
    title: "Диагностика",
    items: [
      "Full Bluebook practice test #1",
      "Определи слабые domains",
      "Цель по баллу + расписание",
    ],
  },
  {
    week: "3–4",
    title: "Math Foundations",
    items: ["Algebra linear", "Systems & inequalities", "Daily 20 drill questions"],
  },
  {
    week: "5–6",
    title: "Reading & Writing",
    items: [
      "Standard English Conventions",
      "Craft & Structure",
      "Timed R&W modules",
    ],
  },
  {
    week: "7–8",
    title: "Advanced Math + Data",
    items: ["Quadratics & functions", "PSDA percents/stats", "Desmos fluency"],
  },
  {
    week: "9–10",
    title: "Mocks & Review",
    items: [
      "2 full adaptive mocks",
      "Error log review",
      "Weak skill drills only",
    ],
  },
  {
    week: "11–12",
    title: "Final Push",
    items: [
      "Bluebook official test #2–4",
      "Sleep & timing strategy",
      "Light review, no cram",
    ],
  },
];
