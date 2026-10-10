import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "success" | "warning" | "demo" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-stone-100/80 dark:bg-slate-800/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-slate-700 font-medium",
    brand: "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60 font-semibold",
    success: "bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60 font-semibold",
    warning: "bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60 font-semibold",
    demo: "bg-orange-50/80 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60 font-semibold",
    outline: "bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium tracking-wide uppercase font-mono",
    md: "text-xs px-3 py-1 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border transition-colors shadow-2xs",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
