import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60",
        className
      )}
    >
      {name}
    </span>
  );
}
