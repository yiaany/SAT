export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  check: (stats: Stats) => boolean;
};

export type Stats = {
  lessonsCompleted: number;
  totalCorrect: number;
  streak: number;
  sessions: number;
  mathLessons: number;
  rwLessons: number;
  perfectQuizzes: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_step",
    title: "Первый шаг",
    description: "Заверши первый урок",
    icon: "🌱",
    xp: 50,
    check: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: "week_streak",
    title: "Неделя огня",
    description: "7 дней подряд",
    icon: "🔥",
    xp: 150,
    check: (s) => s.streak >= 7,
  },
  {
    id: "ten_lessons",
    title: "Десятка",
    description: "10 уроков пройдено",
    icon: "📚",
    xp: 100,
    check: (s) => s.lessonsCompleted >= 10,
  },
  {
    id: "math_starter",
    title: "Math Starter",
    description: "5 уроков Math",
    icon: "∑",
    xp: 80,
    check: (s) => s.mathLessons >= 5,
  },
  {
    id: "rw_starter",
    title: "R&W Starter",
    description: "5 уроков Reading & Writing",
    icon: "✍️",
    xp: 80,
    check: (s) => s.rwLessons >= 5,
  },
  {
    id: "sharpshooter",
    title: "Снайпер",
    description: "50 верных ответов",
    icon: "🎯",
    xp: 120,
    check: (s) => s.totalCorrect >= 50,
  },
  {
    id: "perfect_quiz",
    title: "Идеал",
    description: "3 идеальных квиза",
    icon: "💎",
    xp: 100,
    check: (s) => s.perfectQuizzes >= 3,
  },
  {
    id: "marathon",
    title: "Марафонец",
    description: "20 учебных сессий",
    icon: "🏃",
    xp: 150,
    check: (s) => s.sessions >= 20,
  },
];
