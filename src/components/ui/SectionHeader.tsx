import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
  titleAs: TitleTag = "h2",
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignStyles[align],
        className
      )}
    >
      {badge && (
        <Badge variant="brand" className="mb-3">
          {badge}
        </Badge>
      )}
      <TitleTag className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
        {title}
      </TitleTag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
