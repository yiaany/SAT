import type { Lesson, Section } from "./types";
import { MATH_SECTIONS } from "./math";
import englishJson from "./english.json";

export const RW_SECTIONS = englishJson as Section[];
export const ALL_SECTIONS: Section[] = [...RW_SECTIONS, ...MATH_SECTIONS];

export function getSection(id: string) {
  return ALL_SECTIONS.find((s) => s.id === id);
}

export function getLesson(lessonId: string): {
  section: Section;
  lesson: Lesson;
} | null {
  for (const section of ALL_SECTIONS) {
    const lesson = section.lessons.find((l) => l.id === lessonId);
    if (lesson) return { section, lesson };
  }
  return null;
}

export function getAllLessons() {
  return ALL_SECTIONS.flatMap((s) =>
    s.lessons.map((l) => ({ section: s, lesson: l }))
  );
}

export function countByDomain() {
  const rw = RW_SECTIONS.reduce((a, s) => a + s.lessons.length, 0);
  const math = MATH_SECTIONS.reduce((a, s) => a + s.lessons.length, 0);
  return { rw, math, total: rw + math };
}
