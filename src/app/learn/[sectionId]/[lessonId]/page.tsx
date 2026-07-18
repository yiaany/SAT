"use client";

import { useParams } from "next/navigation";
import { getLesson } from "@/data/curriculum";
import { LessonView } from "@/components/lesson/lesson-view";
import Link from "next/link";

export default function LessonPage() {
  const params = useParams();
  const found = getLesson(String(params.lessonId));

  if (!found || found.section.id !== String(params.sectionId)) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="mb-4">Урок не найден</p>
        <Link href="/learn" className="text-[#0075de]">
          ← К обучению
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <LessonView section={found.section} lesson={found.lesson} />
    </div>
  );
}
