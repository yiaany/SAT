import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0075de] text-white hover:bg-[#0066c2] border border-transparent shadow-sm",
  secondary:
    "bg-[#e6f3fe] text-[#005bab] hover:bg-[#d6ebfc] border border-transparent",
  ghost: "bg-transparent text-[rgba(0,0,0,0.75)] hover:bg-black/[0.04]",
  outline:
    "bg-white text-[rgba(0,0,0,0.85)] border border-black/10 hover:bg-black/[0.03]",
  danger: "bg-[#fdecea] text-[#c0392b] hover:bg-[#f9d9d6] border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-9 px-3.5 text-sm rounded-lg gap-2",
  lg: "h-11 px-5 text-[15px] rounded-lg gap-2 font-medium",
  icon: "h-9 w-9 rounded-lg p-0 justify-center",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
  }
>(function Button(
  { className, variant = "primary", size = "md", disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]/40",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
