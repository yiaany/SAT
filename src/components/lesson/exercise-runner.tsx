"use client";

import { useState } from "react";
import type { Exercise } from "@/data/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";
import { Check, X } from "lucide-react";

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(ex: Exercise, value: string | number | null) {
  if (value === null || value === "") return false;
  if (ex.type === "mc" || ex.type === "choose") {
    return Number(value) === Number(ex.answer);
  }
  const ua = normalize(String(value));
  const ea = normalize(String(ex.answer));
  return ua === ea || ua.includes(ea) || ea.includes(ua);
}

export function ExerciseItem({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  const [value, setValue] = useState<string | number | null>(null);
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(false);
  const recordCorrect = useProgress((s) => s.recordCorrect);

  const typeLabel =
    exercise.type === "mc"
      ? "Выбор"
      : exercise.type === "choose"
        ? "Лучший вариант"
        : exercise.type === "fill"
          ? "Вставь"
          : "Найди ошибку";

  function check() {
    const correct = isCorrect(exercise, value);
    setOk(correct);
    setChecked(true);
    if (correct) recordCorrect(1);
  }

  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-medium text-[rgba(0,0,0,0.4)]">
          #{index + 1}
        </span>
        <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-xs font-medium text-[rgba(0,0,0,0.55)]">
          {typeLabel}
        </span>
      </div>
      <p
        className="mb-4 text-[15px] leading-relaxed text-[rgba(0,0,0,0.88)]"
        dangerouslySetInnerHTML={{ __html: exercise.q }}
      />

      {(exercise.type === "mc" || exercise.type === "choose") &&
        exercise.opts && (
          <div className="mb-4 flex flex-col gap-2">
            {exercise.opts.map((opt, oi) => {
              const selected = value === oi;
              const show =
                checked &&
                (oi === Number(exercise.answer) || selected);
              return (
                <label
                  key={oi}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    selected && !checked && "border-[#0075de] bg-[#e6f3fe]",
                    !selected && !checked && "border-black/[0.08] hover:bg-black/[0.02]",
                    checked &&
                      oi === Number(exercise.answer) &&
                      "border-[#0f7b3a] bg-[#e8f7ee]",
                    checked &&
                      selected &&
                      oi !== Number(exercise.answer) &&
                      "border-[#c0392b] bg-[#fdecea]"
                  )}
                >
                  <input
                    type="radio"
                    className="mt-0.5"
                    name={exercise.id}
                    disabled={checked}
                    checked={selected}
                    onChange={() => setValue(oi)}
                  />
                  <span className="flex-1">{opt}</span>
                  {show && oi === Number(exercise.answer) && (
                    <Check className="h-4 w-4 shrink-0 text-[#0f7b3a]" />
                  )}
                  {show &&
                    selected &&
                    oi !== Number(exercise.answer) && (
                      <X className="h-4 w-4 shrink-0 text-[#c0392b]" />
                    )}
                </label>
              );
            })}
          </div>
        )}

      {(exercise.type === "fill" || exercise.type === "spot") && (
        <input
          className="mb-4 w-full rounded-lg border border-black/10 bg-[#f6f5f4] px-3 py-2.5 text-sm outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
          placeholder={
            exercise.type === "spot"
              ? "Исправленный вариант..."
              : "Ваш ответ..."
          }
          disabled={checked}
          value={value === null ? "" : String(value)}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={check} disabled={checked || value === null}>
          Проверить
        </Button>
        {checked && (
          <span
            className={cn(
              "text-sm font-medium",
              ok ? "text-[#0f7b3a]" : "text-[#c0392b]"
            )}
          >
            {ok ? "Верно!" : "Неверно"}
          </span>
        )}
      </div>

      {checked && (
        <div className="mt-3 rounded-lg bg-[#f6f5f4] px-3 py-2.5 text-sm text-[rgba(0,0,0,0.7)]">
          <b className="text-[rgba(0,0,0,0.85)]">Объяснение:</b> {exercise.exp}
          {!ok && (exercise.type === "mc" || exercise.type === "choose") && exercise.opts && (
            <div className="mt-1">
              Правильный ответ:{" "}
              <b>{exercise.opts[Number(exercise.answer)]}</b>
            </div>
          )}
          {!ok &&
            (exercise.type === "fill" || exercise.type === "spot") && (
              <div className="mt-1">
                Ожидалось: <b>{String(exercise.answer)}</b>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export function QuizPanel({ exercises }: { exercises: Exercise[] }) {
  const qs = exercises.slice(0, Math.min(4, exercises.length));
  const [answers, setAnswers] = useState<Record<string, string | number | null>>(
    {}
  );
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const { recordCorrect, recordPerfectQuiz, addXp } = useProgress();

  function submit() {
    let s = 0;
    qs.forEach((q) => {
      if (isCorrect(q, answers[q.id] ?? null)) s += 1;
    });
    setScore(s);
    setDone(true);
    if (s > 0) recordCorrect(s);
    if (s === qs.length && qs.length > 0) recordPerfectQuiz();
    else addXp(s * 8);
  }

  return (
    <div className="space-y-4">
      {qs.map((q, i) => (
        <div
          key={q.id}
          className="rounded-xl border border-black/[0.08] p-4 sm:p-5"
        >
          <p className="mb-3 text-sm font-medium text-[rgba(0,0,0,0.45)]">
            Вопрос {i + 1}
          </p>
          <p
            className="mb-3 text-[15px]"
            dangerouslySetInnerHTML={{ __html: q.q }}
          />
          {(q.type === "mc" || q.type === "choose") && q.opts ? (
            <div className="flex flex-col gap-2">
              {q.opts.map((opt, oi) => (
                <label
                  key={oi}
                  className={cn(
                    "flex cursor-pointer gap-2 rounded-lg border px-3 py-2 text-sm",
                    answers[q.id] === oi
                      ? "border-[#0075de] bg-[#e6f3fe]"
                      : "border-black/[0.08]",
                    done &&
                      oi === Number(q.answer) &&
                      "border-[#0f7b3a] bg-[#e8f7ee]",
                    done &&
                      answers[q.id] === oi &&
                      oi !== Number(q.answer) &&
                      "border-[#c0392b] bg-[#fdecea]"
                  )}
                >
                  <input
                    type="radio"
                    name={`quiz-${q.id}`}
                    disabled={done}
                    checked={answers[q.id] === oi}
                    onChange={() =>
                      setAnswers((a) => ({ ...a, [q.id]: oi }))
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <input
              className="w-full rounded-lg border border-black/10 bg-[#f6f5f4] px-3 py-2 text-sm outline-none focus:border-[#0075de]"
              disabled={done}
              placeholder="Ответ..."
              value={answers[q.id] == null ? "" : String(answers[q.id])}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
              }
            />
          )}
          {done && (
            <p className="mt-2 text-sm text-[rgba(0,0,0,0.6)]">
              {q.exp}
            </p>
          )}
        </div>
      ))}
      {!done ? (
        <Button onClick={submit}>Проверить квиз</Button>
      ) : (
        <div className="rounded-xl bg-[#e6f3fe] px-4 py-3 text-sm font-medium text-[#005bab]">
          Результат: {score}/{qs.length}
          {score === qs.length && " · Идеально! +25 XP"}
        </div>
      )}
    </div>
  );
}
