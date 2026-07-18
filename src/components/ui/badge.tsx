import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "brand" | "success" | "warn" | "peach";
}) {
  const tones = {
    default: "bg-black/[0.05] text-[rgba(0,0,0,0.7)]",
    brand: "bg-[#e6f3fe] text-[#005bab]",
    success: "bg-[#e8f7ee] text-[#0f7b3a]",
    warn: "bg-[#fff7ed] text-[#b45309]",
    peach: "bg-[#ffdec4] text-[rgba(0,0,0,0.8)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
