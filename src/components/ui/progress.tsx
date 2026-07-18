import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-[#0075de] transition-all duration-500 ease-out",
          barClassName
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
