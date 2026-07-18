export type ExerciseType = "mc" | "fill" | "spot" | "choose";

export type Exercise = {
  id: string;
  type: ExerciseType;
  q: string;
  opts?: string[];
  answer: number | string;
  exp: string;
};

export type Lesson = {
  id: string;
  title: string;
  theory: string;
  examples: string[];
  exercises: Exercise[];
  difficulty?: "easy" | "medium" | "hard";
};

export type Section = {
  id: string;
  domain: "rw" | "math";
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  lessons: Lesson[];
};

export type Resource = {
  title: string;
  description: string;
  href: string;
  tag: string;
};
