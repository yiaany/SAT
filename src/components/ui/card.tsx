import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/[0.08] bg-white",
        hover && "transition-all duration-200 hover:border-black/15 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
