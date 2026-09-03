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
    default: "bg-stone-100/80 text-stone-700 border-stone-200/90 font-medium",
    brand: "bg-orange-50 text-orange-700 border-orange-200 font-semibold",
    success: "bg-emerald-50/80 text-emerald-800 border-emerald-200/80 font-semibold",
    warning: "bg-amber-50/80 text-amber-900 border-amber-200/80 font-semibold",
    demo: "bg-orange-50/80 text-orange-800 border-orange-200/80 font-semibold",
    outline: "bg-white text-stone-700 border-stone-200 hover:border-orange-300",
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
